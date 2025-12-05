import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8000

// Set up static files and view engine
app.use(express.static('public'))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    const uptime = Date.now() - global.botStartTime
    const status = global.sock?.ws?.readyState === 1 ? 'Online' : 'Offline'
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Malshan MD - Bot Status</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                padding: 2rem;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 600px;
                width: 90%;
            }
            .logo {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .title {
                color: #333;
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                font-weight: 700;
            }
            .subtitle {
                color: #666;
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
            .status {
                display: inline-block;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-weight: 600;
                margin: 0.5rem;
            }
            .online { background: #4CAF50; color: white; }
            .offline { background: #f44336; color: white; }
            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
            }
            .stat {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 10px;
                border-left: 4px solid #667eea;
            }
            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #333;
            }
            .stat-label {
                color: #666;
                font-size: 0.9rem;
                margin-top: 0.25rem;
            }
            .features {
                text-align: left;
                margin: 2rem 0;
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
            }
            .feature-list {
                list-style: none;
                columns: 2;
                column-gap: 2rem;
            }
            .feature-list li {
                padding: 0.25rem 0;
                color: #333;
            }
            .feature-list li:before {
                content: '✅ ';
                margin-right: 0.5rem;
            }
            .footer {
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 0.9rem;
            }
            @media (max-width: 768px) {
                .feature-list { columns: 1; }
                .title { font-size: 2rem; }
                .container { padding: 1.5rem; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🔥</div>
            <h1 class="title">Malshan MD</h1>
            <p class="subtitle">Ultimate WhatsApp Bot</p>
            
            <div class="status ${status.toLowerCase()}">
                📱 Status: ${status}
            </div>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-value">${formatUptime(uptime)}</div>
                    <div class="stat-label">Uptime</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${global.commands?.size || 0}</div>
                    <div class="stat-label">Commands</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${global.plugins?.size || 0}</div>
                    <div class="stat-label">Plugins</div>
                </div>
                <div class="stat">
                    <div class="stat-value">4.0.0</div>
                    <div class="stat-label">Version</div>
                </div>
            </div>
            
            <div class="features">
                <h3 style="color: #333; margin-bottom: 1rem;">🌟 Features</h3>
                <ul class="feature-list">
                    <li>Multi-Device Support</li>
                    <li>Music & Video Downloads</li>
                    <li>AI Chat Integration</li>
                    <li>Sticker Tools</li>
                    <li>Group Management</li>
                    <li>Games & Entertainment</li>
                    <li>Weather & News</li>
                    <li>Image Processing</li>
                    <li>Auto Moderation</li>
                    <li>Custom Plugins</li>
                    <li>Admin Tools</li>
                    <li>Fun Commands</li>
                </ul>
            </div>
            
            <div class="footer">
                <p>🤖 Created by <strong>Malshan</strong></p>
                <p>📱 Powered by Baileys WhatsApp API</p>
            </div>
        </div>
    </body>
    </html>
    `
    
    res.send(html)
})

// API endpoint for status
app.get('/api/status', (req, res) => {
    const uptime = Date.now() - global.botStartTime
    const status = global.sock?.ws?.readyState === 1 ? 'online' : 'offline'
    
    res.json({
        bot: 'Malshan MD',
        version: '4.0.0',
        status: status,
        uptime: uptime,
        commands: global.commands?.size || 0,
        plugins: global.plugins?.size || 0,
        timestamp: new Date().toISOString()
    })
})

// QR Code endpoint
app.get('/qr', (req, res) => {
    if (global.qrCode) {
        res.json({ qr: global.qrCode })
    } else {
        res.json({ message: 'Bot is already connected or QR not available' })
    }
})

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ${hours % 24}h`
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    if (minutes > 0) return `${minutes}m`
    return `${seconds}s`
}

// Start web server only if not running as main module
if (process.env.WEB_INTERFACE === 'true') {
    app.listen(PORT, () => {
        console.log(`🌐 Web interface running on http://localhost:${PORT}`)
    })
}

export default app