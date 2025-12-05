import { makeWASocket, DisconnectReason, useMultiFileAuthState, downloadContentFromMessage, generateWAMessageFromContent, generateForwardMessageContent, prepareWAMessageMedia, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import fs from 'fs'
import pino from 'pino'
import qrcode from 'qrcode-terminal'
import colors from 'colors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load configuration
import('./config.js').then(module => {
    global.config = module.default
})

// ASCII Art Banner
const banner = colors.cyan(`
███╗   ███╗ █████╗ ██╗     ███████╗██╗  ██╗ █████╗ ███╗   ██╗    ███╗   ███╗██████╗ 
████╗ ████║██╔══██╗██║     ██╔════╝██║  ██║██╔══██╗████╗  ██║    ████╗ ████║██╔══██╗
██╔████╔██║███████║██║     ███████╗███████║███████║██╔██╗ ██║    ██╔████╔██║██║  ██║
██║╚██╔╝██║██╔══██║██║     ╚════██║██╔══██║██╔══██║██║╚██╗██║    ██║╚██╔╝██║██║  ██║
██║ ╚═╝ ██║██║  ██║███████╗███████║██║  ██║██║  ██║██║ ╚████║    ██║ ╚═╝ ██║██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚═════╝ 
                                                                                      
`) + colors.yellow('🔥 MALSHAN MD - The Ultimate WhatsApp Bot 🔥\n') +
colors.green('📱 Multi-Device Support | 🚀 500+ Features | ⚡ Lightning Fast\n') +
colors.magenta('👨‍💻 Developer: Dineth Nethsara | 👑 Owner: Malshan MD | 🌟 Version: 5.0.0\n') +
colors.white('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

console.log(banner)

// Global variables
global.plugins = new Map()
global.commands = new Map() 
global.game = new Map()
global.antispam = new Map()
global.botStartTime = Date.now()

// Logger
const logger = pino({
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    level: 'debug'
}).child({ class: 'MalshanMD' })

// Load plugins
async function loadPlugins() {
    console.log(colors.yellow('📦 Loading plugins...'))
    const pluginDir = path.join(__dirname, 'plugins')
    
    if (!fs.existsSync(pluginDir)) {
        fs.mkdirSync(pluginDir, { recursive: true })
    }
    
    const files = fs.readdirSync(pluginDir).filter(file => file.endsWith('.js'))
    
    for (const file of files) {
        try {
            const plugin = await import(`./plugins/${file}`)
            const pluginName = file.replace('.js', '')
            
            global.plugins.set(pluginName, plugin.default || plugin)
            
            if (plugin.default?.command || plugin.command) {
                const commands = plugin.default?.command || plugin.command
                if (Array.isArray(commands)) {
                    commands.forEach(cmd => global.commands.set(cmd, pluginName))
                } else {
                    global.commands.set(commands, pluginName)
                }
            }
            
            console.log(colors.green(`✅ Loaded: ${pluginName}`))
        } catch (error) {
            console.log(colors.red(`❌ Failed to load: ${file}`))
            console.log(colors.red(error.message))
        }
    }
    
    console.log(colors.cyan(`🚀 Successfully loaded ${global.plugins.size} plugins!`))
}

// Initialize WhatsApp connection
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const { version, isLatest } = await fetchLatestBaileysVersion()
    
    console.log(colors.blue(`📱 Using WA v${version.join('.')}, isLatest: ${isLatest}`))
    
    const sock = makeWASocket({
        version,
        logger,
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        browser: ['Malshan MD', 'Chrome', '4.0.0'],
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 30000,
        markOnlineOnConnect: true,
        syncFullHistory: false,
        fireInitQueries: true,
        emitOwnEvents: true,
        getMessage: async (key) => {
            return { conversation: 'Malshan MD Bot' }
        }
    })
    
    // Store socket globally
    global.sock = sock
    
    // Connection events
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update
        
        if (qr) {
            console.log(colors.yellow('📱 Scan QR Code to connect:'))
            qrcode.generate(qr, { small: true })
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log(colors.red('Connection closed due to'), lastDisconnect?.error, colors.yellow('reconnecting'), shouldReconnect)
            
            if (shouldReconnect) {
                setTimeout(startBot, 3000)
            }
        } else if (connection === 'open') {
            console.log(colors.green('✅ Connected to WhatsApp!'))
            console.log(colors.cyan('🤖 Malshan MD is now online and ready!'))
        }
    })
    
    // Save credentials
    sock.ev.on('creds.update', saveCreds)
    
    // Message handler
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return
        
        try {
            await handleMessage(sock, msg)
        } catch (error) {
            console.log(colors.red('Error handling message:'), error)
        }
    })
    
    // Group events
    sock.ev.on('group-participants.update', async (update) => {
        try {
            await handleGroupUpdate(sock, update)
        } catch (error) {
            console.log(colors.red('Error handling group update:'), error)
        }
    })
}

// Message handler
async function handleMessage(sock, msg) {
    const messageText = msg.message?.conversation || 
                       msg.message?.extendedTextMessage?.text || 
                       msg.message?.imageMessage?.caption ||
                       msg.message?.videoMessage?.caption || ''
    
    const from = msg.key.remoteJid
    const sender = msg.key.participant || from
    const isGroup = from.endsWith('@g.us')
    const prefix = global.config?.prefix || '.'
    
    // Check if message starts with prefix
    if (!messageText.startsWith(prefix)) return
    
    const args = messageText.slice(prefix.length).trim().split(' ')
    const command = args[0].toLowerCase()
    
    // Find plugin for command
    const pluginName = global.commands.get(command)
    if (!pluginName) return
    
    const plugin = global.plugins.get(pluginName)
    if (!plugin) return
    
    // Create message context
    const context = {
        sock,
        msg,
        from,
        sender,
        isGroup,
        args,
        command,
        messageText,
        prefix,
        reply: (text) => sock.sendMessage(from, { text }, { quoted: msg }),
        react: (emoji) => sock.sendMessage(from, { react: { text: emoji, key: msg.key } })
    }
    
    // Execute plugin
    try {
        await plugin.execute(context)
    } catch (error) {
        console.log(colors.red(`Error executing ${pluginName}:`), error)
        await context.reply('❌ An error occurred while executing this command.')
    }
}

// Group update handler
async function handleGroupUpdate(sock, update) {
    const { id, participants, action } = update
    
    for (const participant of participants) {
        if (action === 'add') {
            const welcomeMsg = `👋 Welcome to the group! 

🔥 *MALSHAN MD BOT* 
Use ${global.config?.prefix || '.'}menu to see all commands
Enjoy your stay! 🎉`
            
            await sock.sendMessage(id, { text: welcomeMsg })
        } else if (action === 'remove') {
            const goodbyeMsg = `👋 Goodbye! Thanks for being part of our group.`
            await sock.sendMessage(id, { text: goodbyeMsg })
        }
    }
}

// Start the bot
async function main() {
    console.log(colors.yellow('🔄 Initializing Malshan MD...'))
    
    // Load plugins first
    await loadPlugins()
    
    // Start bot
    await startBot()
}

// Handle process events
process.on('uncaughtException', (error) => {
    console.log(colors.red('Uncaught Exception:'), error)
})

process.on('unhandledRejection', (error) => {
    console.log(colors.red('Unhandled Rejection:'), error)
})

// Start the bot
main().catch(console.error)