import ytdl from 'ytdl-core'
import yts from 'yt-search'
import fs from 'fs'
import path from 'path'

export const command = ['play', 'song', 'music', 'ytmp3']

export async function execute({ args, reply, react, sock, from }) {
    if (!args[1]) {
        return reply('❌ Please provide a song name!\n\nExample: .play Despacito')
    }
    
    await react('🎵')
    await reply('🔍 Searching for your song...')
    
    try {
        const query = args.slice(1).join(' ')
        const search = await yts(query)
        
        if (!search.videos.length) {
            return reply('❌ No songs found for your query!')
        }
        
        const video = search.videos[0]
        const info = `🎵 *SONG FOUND*

📝 *Title:* ${video.title}
👤 *Artist:* ${video.author.name}
⏱️ *Duration:* ${video.timestamp}
👁️ *Views:* ${video.views.toLocaleString()}
📅 *Uploaded:* ${video.ago}

⬇️ Downloading audio...`

        await reply(info)
        
        // Check if video is too long (max 10 minutes)
        if (video.seconds > 600) {
            return reply('❌ Song is too long! Maximum duration is 10 minutes.')
        }
        
        // Download audio
        const audioStream = ytdl(video.url, {
            filter: 'audioonly',
            quality: 'highestaudio'
        })
        
        const filename = `${Date.now()}.mp3`
        const filepath = path.join(process.cwd(), 'temp', filename)
        
        // Ensure temp directory exists
        if (!fs.existsSync('temp')) {
            fs.mkdirSync('temp')
        }
        
        const writeStream = fs.createWriteStream(filepath)
        audioStream.pipe(writeStream)
        
        writeStream.on('finish', async () => {
            try {
                await sock.sendMessage(from, {
                    audio: fs.readFileSync(filepath),
                    mimetype: 'audio/mpeg',
                    fileName: `${video.title}.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: video.title,
                            body: `By ${video.author.name}`,
                            thumbnail: Buffer.from(await fetch(video.thumbnail).then(r => r.arrayBuffer())),
                            mediaType: 2,
                            mediaUrl: video.url,
                            sourceUrl: video.url
                        }
                    }
                })
                
                // Clean up
                fs.unlinkSync(filepath)
                await react('✅')
                
            } catch (error) {
                console.error('Error sending audio:', error)
                await reply('❌ Failed to send audio file!')
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
            }
        })
        
        writeStream.on('error', async (error) => {
            console.error('Error downloading audio:', error)
            await reply('❌ Failed to download audio!')
            if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
        })
        
    } catch (error) {
        console.error('Music download error:', error)
        await reply('❌ An error occurred while searching for the song!')
    }
}