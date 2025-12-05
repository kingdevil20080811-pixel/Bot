export const command = ['info', 'botinfo', 'about']

export async function execute({ reply, sock, from }) {
    const uptime = formatUptime(Date.now() - global.botStartTime)
    const totalCommands = global.commands.size
    const totalPlugins = global.plugins.size
    
    const infoText = `╭━━━━━━━━━━━━━━━━━━━━━━━━━╮
│  🔥 *MALSHAN MD INFO* 🔥   │
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

🤖 *Bot Name:* ${global.config.botName}
📱 *Version:* ${global.config.botVersion}
👨‍💻 *Developer:* ${global.config.ownerName}
⏱️ *Runtime:* ${uptime}

📊 *Statistics:*
• Commands: ${totalCommands}
• Plugins: ${totalPlugins}
• Prefix: ${global.config.prefix}

🌟 *Features:*
• Multi-Device Support
• Media Downloader
• AI Integration
• Group Management
• Games & Entertainment
• Sticker Tools
• Weather & News
• And Much More!

🔗 *Links:*
• GitHub: ${global.config.social.github}
• Support: ${global.config.social.support}

💝 *Thank you for using Malshan MD!*`

    try {
        await sock.sendMessage(from, {
            text: infoText
        })
    } catch (error) {
        await reply(infoText)
    }
}

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
}