export const command = ['tagall', 'tag', 'all', 'everyone']

export async function execute({ msg, reply, sock, from, isGroup, sender }) {
    if (!isGroup) {
        return reply('❌ This command can only be used in groups!')
    }
    
    try {
        // Get group metadata
        const groupMetadata = await sock.groupMetadata(from)
        const participants = groupMetadata.participants
        
        // Check if user is admin
        const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net'
        const senderInfo = participants.find(p => p.id === sender)
        const botInfo = participants.find(p => p.id === botNumber)
        
        if (!senderInfo || (senderInfo.admin !== 'admin' && senderInfo.admin !== 'superadmin' && sender !== global.config.ownerNumber)) {
            return reply('❌ Only group admins can use this command!')
        }
        
        // Create tag message
        let tagMessage = '📢 *GROUP ANNOUNCEMENT*\n\n'
        tagMessage += `👥 *Group:* ${groupMetadata.subject}\n`
        tagMessage += `👤 *Tagged by:* @${sender.split('@')[0]}\n`
        tagMessage += `📊 *Total Members:* ${participants.length}\n\n`
        tagMessage += '━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
        
        // Add custom message if provided
        const customMessage = msg.message?.extendedTextMessage?.text?.split(' ').slice(1).join(' ')
        if (customMessage) {
            tagMessage += `💬 *Message:* ${customMessage}\n\n`
        }
        
        tagMessage += '👥 *Members:*\n'
        
        // Add all participants
        const mentions = []
        participants.forEach((participant, index) => {
            const number = participant.id.split('@')[0]
            tagMessage += `${index + 1}. @${number}\n`
            mentions.push(participant.id)
        })
        
        tagMessage += '\n━━━━━━━━━━━━━━━━━━━━━━━━━'
        tagMessage += '\n🤖 *Malshan MD Bot*'
        
        await sock.sendMessage(from, {
            text: tagMessage,
            mentions: mentions
        })
        
    } catch (error) {
        console.error('Tag all error:', error)
        await reply('❌ Failed to tag all members!')
    }
}

// Additional group commands can be added here
export const groupCommands = {
    kick: async ({ args, reply, sock, from, isGroup, sender }) => {
        if (!isGroup) return reply('❌ This command can only be used in groups!')
        
        // Implementation for kick command
        // Similar structure with admin checks
    },
    
    add: async ({ args, reply, sock, from, isGroup, sender }) => {
        if (!isGroup) return reply('❌ This command can only be used in groups!')
        
        // Implementation for add command
    },
    
    promote: async ({ args, reply, sock, from, isGroup, sender }) => {
        if (!isGroup) return reply('❌ This command can only be used in groups!')
        
        // Implementation for promote command
    },
    
    demote: async ({ args, reply, sock, from, isGroup, sender }) => {
        if (!isGroup) return reply('❌ This command can only be used in groups!')
        
        // Implementation for demote command
    }
}