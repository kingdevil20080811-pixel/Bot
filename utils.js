import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Utility functions for the bot

export function formatTime(ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function isUrl(string) {
    try {
        new URL(string)
        return true
    } catch {
        return false
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function isOwner(jid) {
    const ownerJid = global.config.ownerNumber + '@s.whatsapp.net'
    return jid === ownerJid
}

export function isAdmin(participants, jid) {
    const participant = participants.find(p => p.id === jid)
    return participant && (participant.admin === 'admin' || participant.admin === 'superadmin')
}

export function cleanText(text) {
    return text.replace(/[^\w\s]/gi, '').trim()
}

export function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function parseCommand(text, prefix = '.') {
    if (!text.startsWith(prefix)) return null
    
    const args = text.slice(prefix.length).trim().split(' ')
    const command = args[0].toLowerCase()
    
    return {
        command,
        args,
        prefix,
        fullText: text
    }
}

export function logCommand(command, sender, from, isGroup) {
    const timestamp = new Date().toISOString()
    const chatType = isGroup ? 'Group' : 'Private'
    const logText = `[${timestamp}] ${chatType} - ${sender} used: ${command} in ${from}`
    
    console.log(logText)
    
    // Optionally save to file
    const logFile = path.join(__dirname, 'logs', 'commands.log')
    if (!fs.existsSync(path.dirname(logFile))) {
        fs.mkdirSync(path.dirname(logFile), { recursive: true })
    }
    
    fs.appendFileSync(logFile, logText + '\n')
}

export function validatePhoneNumber(number) {
    // Remove all non-numeric characters
    const cleaned = number.replace(/\D/g, '')
    
    // Check if it's a valid length (typically 10-15 digits)
    if (cleaned.length < 10 || cleaned.length > 15) {
        return false
    }
    
    return cleaned
}

export function createTempDir() {
    const tempDir = path.join(__dirname, 'temp')
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true })
    }
    return tempDir
}

export function cleanupTempFiles() {
    const tempDir = path.join(__dirname, 'temp')
    if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir)
        for (const file of files) {
            const filePath = path.join(tempDir, file)
            const stats = fs.statSync(filePath)
            
            // Delete files older than 1 hour
            if (Date.now() - stats.mtime.getTime() > 60 * 60 * 1000) {
                fs.unlinkSync(filePath)
            }
        }
    }
}

export function antiSpam(userId, limit = 5, window = 60000) {
    if (!global.antispam) global.antispam = new Map()
    
    const now = Date.now()
    const userSpam = global.antispam.get(userId) || { count: 0, resetTime: now + window }
    
    if (now > userSpam.resetTime) {
        userSpam.count = 1
        userSpam.resetTime = now + window
    } else {
        userSpam.count++
    }
    
    global.antispam.set(userId, userSpam)
    
    return userSpam.count > limit
}

export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

export function sanitizeFilename(filename) {
    return filename.replace(/[^\w\s.-]/gi, '').trim()
}

export const reactions = {
    loading: '⏳',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    music: '🎵',
    video: '🎬',
    image: '🖼️',
    game: '🎮',
    tool: '🔧',
    ai: '🤖',
    heart: '❤️',
    fire: '🔥',
    star: '⭐',
    thumbsup: '👍'
}

export const emojis = {
    crown: '👑',
    robot: '🤖',
    fire: '🔥',
    star: '⭐',
    heart: '❤️',
    check: '✅',
    cross: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    music: '🎵',
    video: '🎬',
    image: '🖼️',
    game: '🎮',
    tool: '🔧',
    lock: '🔐',
    unlock: '🔓',
    admin: '👨‍💼',
    user: '👤',
    group: '👥',
    channel: '📢',
    link: '🔗',
    download: '⬇️',
    upload: '⬆️',
    folder: '📁',
    file: '📄',
    search: '🔍',
    loading: '⏳',
    time: '⏰',
    calendar: '📅',
    location: '📍',
    phone: '📱',
    computer: '💻',
    internet: '🌐',
    wifi: '📶',
    battery: '🔋',
    plugin: '🔌',
    settings: '⚙️',
    stats: '📊',
    chart: '📈',
    money: '💰',
    gift: '🎁',
    party: '🎉',
    celebrate: '🎊',
    medal: '🏅',
    trophy: '🏆'
}