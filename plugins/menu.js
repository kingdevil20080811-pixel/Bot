export const command = ['menu', 'help', 'commands']

export async function execute({ reply, sock, from }) {
    const uptime = formatUptime(Date.now() - global.botStartTime)
    
    const menuText = global.config.messages.menu.replace('{{uptime}}', uptime)
    
    const menuImage = 'https://i.ibb.co/QXrKQ2G/malshan-md-qr-logo.png' // QR Logo for Malshan MD
    
    try {
        await sock.sendMessage(from, {
            image: { url: menuImage },
            caption: menuText
        })
    } catch (error) {
        await reply(menuText)
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