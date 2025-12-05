import ytdl from 'ytdl-core'
import yts from 'yt-search'
import fs from 'fs'
import path from 'path'

export const command = ['video', 'ytmp4', 'ytvideo', 'youtube']

export async function execute({ args, reply, react, sock, from }) {
    if (!args[1]) {
        return reply('❌ Please provide a video name or URL!\n\nExample: .video Despacito')
    }
    
    await react('🎬')
    await reply('🔍 Searching for your video...')
    
    try {
        const query = args.slice(1).join(' ')
        let videoUrl = query
        
        // If not a YouTube URL, search for it
        if (!ytdl.validateURL(query)) {
            const search = await yts(query)
            
            if (!search.videos.length) {
                return reply('❌ No videos found for your query!')
            }
            
            const video = search.videos[0]
            videoUrl = video.url
            
            const info = `🎬 *VIDEO FOUND*

📝 *Title:* ${video.title}
👤 *Channel:* ${video.author.name}
⏱️ *Duration:* ${video.timestamp}
👁️ *Views:* ${video.views.toLocaleString()}
📅 *Uploaded:* ${video.ago}

⬇️ Downloading video...`

            await reply(info)
            
            // Check duration (max 10 minutes for free tier)
            if (video.seconds > 600) {
                return reply('❌ Video is too long! Maximum duration is 10 minutes for downloads.')
            }
        }
        
        // Get video info
        const videoInfo = await ytdl.getInfo(videoUrl)
        const title = videoInfo.videoDetails.title
        
        // Choose format (720p or lower for faster download)
        const format = ytdl.chooseFormat(videoInfo.formats, {
            quality: 'highestvideo',
            filter: 'videoandaudio'
        })
        
        if (!format) {
            return reply('❌ No suitable video format found!')
        }
        
        // Create temp directory
        if (!fs.existsSync('temp')) {
            fs.mkdirSync('temp')
        }
        
        const filename = `${Date.now()}.mp4`
        const filepath = path.join(process.cwd(), 'temp', filename)
        
        // Download video
        const videoStream = ytdl(videoUrl, {
            format: format,
            quality: 'highestvideo'
        })
        
        const writeStream = fs.createWriteStream(filepath)
        videoStream.pipe(writeStream)
        
        let downloadedBytes = 0
        const totalBytes = parseInt(format.contentLength) || 0
        
        videoStream.on('progress', (chunkLength, downloaded, total) => {
            downloadedBytes += chunkLength
            const percent = Math.floor((downloaded / total) * 100)
            
            // Update progress every 25%
            if (percent % 25 === 0 && percent > 0) {
                console.log(`Download progress: ${percent}%`)
            }
        })
        
        writeStream.on('finish', async () => {
            try {
                const fileSize = fs.statSync(filepath).size
                const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2)
                
                // Check file size (WhatsApp limit is ~16MB for videos)
                if (fileSize > 15 * 1024 * 1024) {
                    fs.unlinkSync(filepath)
                    return reply('❌ Video file is too large for WhatsApp! Try a shorter video.')
                }
                
                await sock.sendMessage(from, {
                    video: fs.readFileSync(filepath),
                    mimetype: 'video/mp4',
                    fileName: `${title}.mp4`,
                    caption: `🎬 *${title}*\n\n📁 Size: ${fileSizeMB} MB\n🤖 Downloaded by Malshan MD`,
                    contextInfo: {
                        externalAdReply: {
                            title: title,
                            body: 'Downloaded by Malshan MD',
                            thumbnail: Buffer.from(await fetch(videoInfo.videoDetails.thumbnails[0].url).then(r => r.arrayBuffer())),
                            mediaType: 2,
                            mediaUrl: videoUrl,
                            sourceUrl: videoUrl
                        }
                    }
                })
                
                // Clean up
                fs.unlinkSync(filepath)
                await react('✅')
                
            } catch (error) {
                console.error('Error sending video:', error)
                await reply('❌ Failed to send video file!')
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
            }
        })
        
        writeStream.on('error', async (error) => {
            console.error('Error downloading video:', error)
            await reply('❌ Failed to download video!')
            if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
        })
        
        // Timeout after 5 minutes
        setTimeout(() => {
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath)
                reply('⏰ Download timeout! Please try a shorter video.')
            }
        }, 5 * 60 * 1000)
        
    } catch (error) {
        console.error('Video download error:', error)
        await reply('❌ An error occurred while downloading the video!')
    }
}