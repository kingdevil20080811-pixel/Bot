import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

export const command = ['sticker', 's', 'stiker']

export async function execute({ msg, reply, react, sock, from }) {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
    
    if (!quoted && !msg.message?.imageMessage && !msg.message?.videoMessage) {
        return reply('❌ Please reply to an image or video to create a sticker!\n\nYou can also send an image/video with caption .sticker')
    }
    
    await react('⏳')
    await reply('🔄 Creating sticker...')
    
    try {
        let mediaMessage
        
        // Check if replying to media
        if (quoted?.imageMessage) {
            mediaMessage = quoted.imageMessage
        } else if (quoted?.videoMessage) {
            mediaMessage = quoted.videoMessage
        } else if (msg.message?.imageMessage) {
            mediaMessage = msg.message.imageMessage
        } else if (msg.message?.videoMessage) {
            mediaMessage = msg.message.videoMessage
        }
        
        if (!mediaMessage) {
            return reply('❌ Please provide a valid image or video!')
        }
        
        // Check file size (max 2MB)
        const fileSize = mediaMessage.fileLength
        if (fileSize > 2 * 1024 * 1024) {
            return reply('❌ File too large! Maximum size is 2MB.')
        }
        
        // Download media
        const stream = await downloadContentFromMessage(mediaMessage, mediaMessage.mimetype?.startsWith('video') ? 'video' : 'image')
        
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        
        // Create sticker
        const sticker = new Sticker(buffer, {
            pack: 'Malshan MD',
            author: 'Created by Malshan MD Bot',
            type: StickerTypes.FULL,
            categories: ['🤖', '🔥'],
            id: Date.now().toString(),
            quality: 50,
            background: 'transparent'
        })
        
        const stickerBuffer = await sticker.toBuffer()
        
        await sock.sendMessage(from, {
            sticker: stickerBuffer
        })
        
        await react('✅')
        
    } catch (error) {
        console.error('Sticker creation error:', error)
        await reply('❌ Failed to create sticker! Make sure the media is valid.')
        await react('❌')
    }
}