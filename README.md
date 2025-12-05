# 🔥 Malshan MD - Ultimate WhatsApp Bot

<div align="center">

![Malshan MD Logo](https://i.ibb.co/qW3kz8n/malshan-md-logo.png)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Baileys](https://img.shields.io/badge/Baileys-6.7.5-blue.svg)](https://github.com/WhiskeySockets/Baileys)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/malshan/malshan-md.svg)](https://github.com/malshan/malshan-md/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/malshan/malshan-md.svg)](https://github.com/malshan/malshan-md/network)

**The Most Advanced Multi-Device WhatsApp Bot with 200+ Features**

[📱 Deploy Now](#-deployment) • [🎮 Features](#-features) • [📚 Commands](#-commands) • [🆘 Support](#-support)

</div>

---

## 🌟 About Malshan MD

Malshan MD is a powerful, feature-rich WhatsApp bot built with Node.js and the Baileys library. It offers advanced automation, entertainment, utility tools, and group management features. With its modular plugin system, you can easily customize and extend the bot's functionality.

### ✨ Key Highlights

- 🔥 **200+ Commands** - Comprehensive command set
- 📱 **Multi-Device Support** - Works on all your devices
- 🎵 **Media Downloads** - YouTube, Spotify, and more
- 🎮 **Games & Entertainment** - Built-in games and fun features
- 👥 **Group Management** - Advanced admin tools
- 🤖 **AI Integration** - ChatGPT and other AI services
- 🛠️ **Developer Friendly** - Easy to customize and extend
- ⚡ **Lightning Fast** - Optimized performance
- 🔐 **Secure** - Built with security in mind

---

## 🚀 Features

### 📱 Core Features
- ✅ Multi-device WhatsApp support
- ✅ QR code authentication
- ✅ Auto-read messages
- ✅ Custom prefix support
- ✅ Anti-spam protection
- ✅ Welcome/goodbye messages
- ✅ Broadcast messaging
- ✅ Owner-only commands

### 🎵 Media & Downloads
- 🎶 YouTube music downloader
- 🎬 YouTube video downloader
- 📷 Image downloads
- 🎤 Audio converter
- 📱 TikTok downloader
- 🎧 Spotify support
- 📱 Instagram downloader

### 🖼️ Sticker Tools
- 🎨 Image to sticker converter
- 🎬 Video to GIF sticker
- 🖼️ Sticker to image converter
- 🎭 Sticker info stealer
- ✨ Animated sticker support

### 🎮 Games & Entertainment
- 🎯 Tic-tac-toe
- 🧮 Math quiz
- 🎲 Dice games
- 🎰 Slot machine
- 🔢 Number guessing
- 🃏 Card games
- 🎪 Truth or dare

### 👥 Group Management
- 🏷️ Tag all members
- 👤 Add/remove members
- 👑 Promote/demote admins
- 🔒 Group settings control
- 🚫 Anti-link protection
- ⚠️ Warning system
- 📊 Group statistics

### 🤖 AI & Smart Features
- 💬 ChatGPT integration
- 🌐 Language translation
- 📖 Dictionary definitions
- 🧠 Smart responses
- 📝 Text generation
- 🎨 AI image generation

### 🛠️ Utility Tools
- 🌤️ Weather information
- 📰 Latest news
- 📱 QR code generator
- 🔗 URL shortener
- 🧮 Calculator
- ⏰ Time & date
- 💱 Currency converter

---

## 📚 Commands

### 🎯 General Commands
```
.menu          - Show all commands
.info          - Bot information
.ping          - Check bot speed
.owner         - Contact owner
.alive         - Check if bot is online
.uptime        - Bot runtime
```

### 🎵 Media Commands
```
.play [song]   - Download music
.video [name]  - Download video
.ytmp3 [url]   - YouTube to MP3
.ytmp4 [url]   - YouTube to MP4
.spotify [url] - Spotify downloader
```

### 🖼️ Sticker Commands
```
.sticker       - Create sticker
.steal         - Steal sticker info
.toimg         - Sticker to image
.togif         - Sticker to GIF
.smeme [text]  - Sticker meme
```

### 🎮 Game Commands
```
.tictactoe     - Start tic-tac-toe
.math          - Math quiz
.guess         - Number guessing
.slots         - Slot machine
.dice          - Roll dice
```

### 👥 Group Commands
```
.tagall        - Tag all members
.kick [@user]  - Remove member
.add [number]  - Add member
.promote       - Make admin
.demote        - Remove admin
.group [open/close] - Group settings
```

### 🤖 AI Commands
```
.ai [question] - Ask AI
.chatgpt [msg] - ChatGPT chat
.translate [lang] [text] - Translate
.define [word] - Dictionary
```

### 🛠️ Tool Commands
```
.weather [city] - Weather info
.news          - Latest news
.qr [text]     - Generate QR code
.short [url]   - Shorten URL
.calc [math]   - Calculator
```

### 👨‍💻 Owner Commands
```
.broadcast [msg] - Broadcast message
.block [number]  - Block user
.unblock [number] - Unblock user
.setprefix [prefix] - Change prefix
.restart         - Restart bot
```

---

## 🚀 Deployment

### 📋 Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- WhatsApp account
- Stable internet connection

### 🔧 Installation

#### 1. Clone Repository
```bash
git clone https://github.com/malshan/malshan-md.git
cd malshan-md
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Bot
Edit `config.js` with your settings:
```javascript
export default {
    ownerNumber: '94701234567', // Your phone number
    prefix: '.', // Command prefix
    // Add your API keys here
}
```

#### 4. Start Bot
```bash
npm start
```

#### 5. Scan QR Code
- Open WhatsApp on your phone
- Go to Linked Devices
- Scan the QR code from terminal

### ☁️ Cloud Deployment

#### Deploy to Heroku
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/malshan/malshan-md)

#### Deploy to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/malshan-md)

#### Deploy to Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/malshan/malshan-md)

---

## 🔧 Configuration

### Environment Variables
```env
# Required
OWNER_NUMBER=94701234567
PREFIX=.

# Optional API Keys
OPENAI_KEY=your_openai_key
WEATHER_KEY=your_weather_key
NEWS_KEY=your_news_key

# Database
MONGODB_URI=your_mongodb_uri
```

### Bot Settings
- **Auto Read**: Automatically mark messages as read
- **Auto Typing**: Show typing indicator
- **Auto React**: React to certain messages
- **Welcome Messages**: Greet new group members
- **Anti-Spam**: Prevent spam messages
- **Anti-Link**: Remove unwanted links

---

## 🔌 Plugin Development

### Creating a Plugin
```javascript
// plugins/example.js
export const command = ['example', 'test']

export async function execute({ args, reply, react }) {
    await react('✅')
    await reply('Hello from plugin!')
}
```

### Plugin Structure
- `command`: Array of command names
- `execute`: Main function to handle command
- Context includes: `sock`, `msg`, `args`, `reply`, `react`, etc.

### Loading Plugins
Plugins are automatically loaded from the `/plugins` directory on startup.

---

## 📊 Statistics

- **Total Commands**: 200+
- **Plugin System**: Modular architecture
- **Multi-Device**: ✅ Supported
- **Group Management**: ✅ Advanced
- **Media Support**: ✅ Full
- **AI Integration**: ✅ ChatGPT
- **Games**: 10+ Built-in games
- **Languages**: Multi-language support

---

## 🆘 Support

### 📞 Get Help
- **GitHub Issues**: [Report bugs](https://github.com/malshan/malshan-md/issues)
- **WhatsApp Support**: [Join Group](https://chat.whatsapp.com/support)
- **Telegram**: [Support Channel](https://t.me/malshan_md)
- **Email**: malshan@example.com

### 🤝 Contributing
We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting pull requests.

### 💝 Donations
Support the project development:
- **PayPal**: [Donate](https://paypal.me/malshan)
- **Buy Me a Coffee**: [Support](https://buymeacoffee.com/malshan)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=malshan/malshan-md&type=Date)](https://star-history.com/#malshan/malshan-md&Date)

---

## 🏆 Acknowledgments

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [OpenAI](https://openai.com) - AI Integration
- [FFmpeg](https://ffmpeg.org) - Media processing
- All contributors and users

---

<div align="center">

### 🔥 Made with ❤️ by Malshan

[![GitHub](https://img.shields.io/badge/GitHub-Malshan-black.svg)](https://github.com/malshan)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-green.svg)](https://wa.me/94701234567)
[![Telegram](https://img.shields.io/badge/Telegram-Support-blue.svg)](https://t.me/malshan_md)

**⭐ Star this repo if you like it!**

</div>