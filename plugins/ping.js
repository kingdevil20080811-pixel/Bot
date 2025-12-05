export const command = ['ping', 'speed', 'latency']

export async function execute({ reply }) {
    const startTime = Date.now()
    
    const initialMessage = await reply('🏓 Pinging...')
    
    const endTime = Date.now()
    const latency = endTime - startTime
    
    const pingText = `🏓 *PONG!*

⚡ *Speed:* ${latency}ms
🤖 *Status:* Online
📡 *Connection:* Stable

${latency < 100 ? '🟢 Lightning Fast!' : 
  latency < 200 ? '🟡 Good Speed' : 
  latency < 500 ? '🟠 Average Speed' : 
  '🔴 Slow Connection'}`

    // Edit the initial message
    try {
        await sock.sendMessage(initialMessage.key.remoteJid, {
            text: pingText,
            edit: initialMessage.key
        })
    } catch (error) {
        await reply(pingText)
    }
}