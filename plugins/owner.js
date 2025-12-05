export const command = ['owner', 'creator', 'broadcast', 'block', 'unblock', 'setprefix', 'restart']

export async function execute({ command, args, reply, sock, from, sender }) {
    switch (command) {
        case 'owner':
        case 'creator':
            return showOwner({ reply, sock, from })
        
        case 'broadcast':
            return broadcast({ args, reply, sock, sender })
        
        case 'block':
            return blockUser({ args, reply, sock, sender })
        
        case 'unblock':
            return unblockUser({ args, reply, sock, sender })
        
        case 'setprefix':
            return setPrefix({ args, reply, sender })
        
        case 'restart':
            return restartBot({ reply, sender })
        
        default:
            return reply('❌ Unknown owner command!')
    }
}

// Show Owner Contact
async function showOwner({ reply, sock, from }) {
    const ownerText = `👨‍💻 *BOT OWNER INFORMATION*

🏷️ *Name:* ${global.config.ownerName}
📱 *Number:* ${global.config.ownerNumber}
🤖 *Bot:* ${global.config.botName} v${global.config.botVersion}

📞 *Contact Owner:*
• For support and queries
• Bug reports
• Feature requests
• Business inquiries

🔗 *Links:*
• GitHub: ${global.config.social.github}
• Support Group: ${global.config.social.support}

💝 *Thank you for using Malshan MD!*

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Created with ❤️ by Malshan`

    try {
        // Send owner contact
        await sock.sendMessage(from, {
            contacts: {
                displayName: global.config.ownerName,
                contacts: [{
                    vcard: `BEGIN:VCARD
VERSION:3.0
FN:${global.config.ownerName}
ORG:Malshan MD Bot Developer
TEL;type=MAIN;waid=${global.config.ownerNumber}:${global.config.ownerNumber}
END:VCARD`
                }]
            }
        })
        
        await reply(ownerText)
        
    } catch (error) {
        await reply(ownerText)
    }
}

// Broadcast Message (Owner Only)
async function broadcast({ args, reply, sock, sender }) {
    if (sender !== global.config.ownerNumber + '@s.whatsapp.net') {
        return reply('❌ This command is only for the bot owner!')
    }
    
    if (!args[1]) {
        return reply('❌ Please provide a message to broadcast!\n\nExample: .broadcast Hello everyone!')
    }
    
    const message = args.slice(1).join(' ')
    const broadcastText = `📢 *BROADCAST MESSAGE*

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 From: ${global.config.botName}
👨‍💻 By: ${global.config.ownerName}`

    try {
        // Get all chats
        const chats = Object.keys(sock.store.chats || {})
        let successCount = 0
        let failCount = 0
        
        await reply(`📡 Broadcasting to ${chats.length} chats...`)
        
        for (const chatId of chats) {
            try {
                await sock.sendMessage(chatId, { text: broadcastText })
                successCount++
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (error) {
                failCount++
                console.error(`Broadcast failed for ${chatId}:`, error.message)
            }
        }
        
        await reply(`✅ Broadcast completed!
📊 Success: ${successCount}
❌ Failed: ${failCount}`)
        
    } catch (error) {
        console.error('Broadcast error:', error)
        await reply('❌ Failed to broadcast message!')
    }
}

// Block User (Owner Only)
async function blockUser({ args, reply, sock, sender }) {
    if (sender !== global.config.ownerNumber + '@s.whatsapp.net') {
        return reply('❌ This command is only for the bot owner!')
    }
    
    if (!args[1]) {
        return reply('❌ Please provide a number to block!\n\nExample: .block 1234567890')
    }
    
    const number = args[1].replace(/[^0-9]/g, '')
    if (!number) {
        return reply('❌ Please provide a valid phone number!')
    }
    
    try {
        const jid = number + '@s.whatsapp.net'
        await sock.updateBlockStatus(jid, 'block')
        
        await reply(`✅ Successfully blocked: ${number}`)
        
    } catch (error) {
        console.error('Block error:', error)
        await reply('❌ Failed to block user!')
    }
}

// Unblock User (Owner Only)
async function unblockUser({ args, reply, sock, sender }) {
    if (sender !== global.config.ownerNumber + '@s.whatsapp.net') {
        return reply('❌ This command is only for the bot owner!')
    }
    
    if (!args[1]) {
        return reply('❌ Please provide a number to unblock!\n\nExample: .unblock 1234567890')
    }
    
    const number = args[1].replace(/[^0-9]/g, '')
    if (!number) {
        return reply('❌ Please provide a valid phone number!')
    }
    
    try {
        const jid = number + '@s.whatsapp.net'
        await sock.updateBlockStatus(jid, 'unblock')
        
        await reply(`✅ Successfully unblocked: ${number}`)
        
    } catch (error) {
        console.error('Unblock error:', error)
        await reply('❌ Failed to unblock user!')
    }
}

// Set Prefix (Owner Only)
async function setPrefix({ args, reply, sender }) {
    if (sender !== global.config.ownerNumber + '@s.whatsapp.net') {
        return reply('❌ This command is only for the bot owner!')
    }
    
    if (!args[1]) {
        return reply(`❌ Please provide a new prefix!

Current prefix: ${global.config.prefix}
Example: .setprefix !`)
    }
    
    const newPrefix = args[1]
    if (newPrefix.length > 3) {
        return reply('❌ Prefix should be 1-3 characters only!')
    }
    
    // Update prefix
    global.config.prefix = newPrefix
    
    // You might want to save this to a config file
    const prefixText = `✅ *PREFIX UPDATED*

🔄 *Old Prefix:* ${args[0]}
✨ *New Prefix:* ${newPrefix}

💡 All commands now use: ${newPrefix}command
Example: ${newPrefix}menu, ${newPrefix}play, ${newPrefix}info

⚠️ *Note:* Restart recommended for full effect.`

    await reply(prefixText)
}

// Restart Bot (Owner Only)
async function restartBot({ reply, sender }) {
    if (sender !== global.config.ownerNumber + '@s.whatsapp.net') {
        return reply('❌ This command is only for the bot owner!')
    }
    
    await reply(`🔄 *RESTARTING BOT...*

⏳ Please wait while the bot restarts...
🔃 This may take 10-30 seconds.

✅ Bot will be back online shortly!`)
    
    // Small delay before restart
    setTimeout(() => {
        process.exit(0)
    }, 2000)
}