export default {
    // Bot Configuration
    botName: 'Malshan MD',
    botVersion: '5.0.0',
    prefix: '.',
    ownerNumber: '94761480834', // Change this to your number
    ownerName: 'Malshan MD Owner',
    developerName: 'Dineth Nethsara',
    githubUsername: 'hexlorddev',
    
    // Features
    autoRead: true,
    autoTyping: false,
    autoRecording: false,
    autoReact: true,
    
    // Group Settings
    welcomeMessage: true,
    goodbyeMessage: true,
    antiLink: false,
    antiSpam: true,
    
    // API Keys (Add your own)
    openaiKey: process.env.OPENAI_KEY || '',
    weatherKey: process.env.WEATHER_KEY || '',
    newsKey: process.env.NEWS_KEY || '',
    
    // Database
    mongodb: process.env.MONGODB_URI || '',
    
    // Limits
    maxDownloadSize: 100, // MB
    maxStickerSize: 2, // MB
    
    // Messages
    messages: {
        botInfo: `🔥 *MALSHAN MD BOT* 🔥

📱 *Multi-Device WhatsApp Bot*
🚀 *Version:* 4.0.0
👨‍💻 *Developer:* Malshan
⚡ *Features:* 200+ Commands

🌟 *Special Features:*
• Media Converter & Downloader
• Group Management Tools
• Games & Entertainment
• AI Chat Integration
• Sticker Maker
• Music & Video Downloads
• Weather & News Updates
• And Much More!

Use ${process.env.PREFIX || '.'}menu to see all commands`,

        ownerOnly: '❌ This command is only for the bot owner!',
        groupOnly: '❌ This command can only be used in groups!',
        adminOnly: '❌ This command is only for group admins!',
        botAdminOnly: '❌ Bot needs to be admin to use this command!',
        wait: '⏳ Please wait...',
        error: '❌ An error occurred!',
        success: '✅ Success!',
        
        menu: `╭━━━━━━━━━━━━━━━━━━━━━━━━━╮
│  🔥 *MALSHAN MD MENU* 🔥  │
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

👨‍💻 *Owner:* Malshan
🚀 *Version:* 4.0.0
⏰ *Runtime:* {{uptime}}

╭─「 📱 *GENERAL* 」
│ • menu - Show this menu
│ • info - Bot information
│ • owner - Owner contact
│ • ping - Check bot speed
│ • alive - Check if bot is alive
│ • uptime - Bot runtime
╰────────────────

╭─「 🎵 *MEDIA* 」
│ • play - Download music
│ • video - Download video
│ • song - Search songs
│ • ytmp3 - YouTube to MP3
│ • ytmp4 - YouTube to MP4
│ • spotify - Spotify downloader
╰────────────────

╭─「 🖼️ *STICKERS* 」
│ • sticker - Create sticker
│ • steal - Steal sticker info
│ • toimg - Sticker to image
│ • togif - Sticker to GIF
│ • smeme - Sticker meme
╰────────────────

╭─「 🎮 *GAMES* 」
│ • tictactoe - Tic Tac Toe
│ • math - Math quiz
│ • guess - Number guessing
│ • slots - Slot machine
│ • dice - Roll dice
╰────────────────

╭─「 👥 *GROUP* 」
│ • tagall - Tag all members
│ • kick - Remove member
│ • add - Add member
│ • promote - Make admin
│ • demote - Remove admin
│ • group - Group settings
╰────────────────

╭─「 🤖 *AI* 」
│ • ai - Chat with AI
│ • chatgpt - GPT chat
│ • translate - Translate text
│ • define - Dictionary
╰────────────────

╭─「 🔧 *TOOLS* 」
│ • weather - Weather info
│ • news - Latest news
│ • qr - Generate QR code
│ • short - Shorten URL
│ • calc - Calculator
╰────────────────

╭─「 📞 *CONTACT* 」
│ • owner - Contact owner
│ • support - Support group
│ • github - Source code
╰────────────────

🌟 Total Commands: 50+
⚡ Bot Status: Online`
    },
    
    // Social Links
    social: {
        github: 'https://github.com/hexlorddev/malshan-md',
        support: 'https://chat.whatsapp.com/malshan-md-support',
        qrLogo: 'https://i.ibb.co/QXrKQ2G/malshan-md-qr-logo.png',
        channel: 'https://whatsapp.com/channel/malshan-md'
    }
}