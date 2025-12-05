# 🚀 Malshan MD Deployment Guide

This guide will help you deploy Malshan MD WhatsApp Bot on various platforms.

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- WhatsApp account
- Stable internet connection

## 🔧 Local Deployment

### 1. Clone and Setup
```bash
git clone https://github.com/malshan/malshan-md.git
cd malshan-md
npm install --legacy-peer-deps
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

### 3. Start Bot
```bash
# Using npm
npm start

# Using start script
./start.sh

# Using PM2 (recommended for production)
npm install -g pm2
pm2 start index.js --name "malshan-md"
```

## ☁️ Cloud Deployment

### 🟣 Heroku Deployment

1. **Create Heroku App**
```bash
heroku create your-bot-name
```

2. **Set Environment Variables**
```bash
heroku config:set OWNER_NUMBER=94701234567
heroku config:set PREFIX=.
heroku config:set OPENAI_KEY=your_key_here
```

3. **Deploy**
```bash
git push heroku main
```

4. **Scale Dynos**
```bash
heroku ps:scale worker=1
```

### 🚄 Railway Deployment

1. **Connect GitHub Repository**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub account
   - Import the repository

2. **Set Environment Variables**
   - Add all required variables from `.env.example`

3. **Deploy**
   - Railway will automatically deploy your bot

### 🎨 Render Deployment

1. **Create Web Service**
   - Go to [Render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository

2. **Configuration**
   - Build Command: `npm install --legacy-peer-deps`
   - Start Command: `npm start`

3. **Environment Variables**
   - Add all required variables

### 🐳 Docker Deployment

1. **Build Image**
```bash
docker build -t malshan-md .
```

2. **Run Container**
```bash
docker run -d \
  --name malshan-md-bot \
  -e OWNER_NUMBER=94701234567 \
  -e PREFIX=. \
  -v $(pwd)/session:/app/session \
  malshan-md
```

3. **Using Docker Compose**
```bash
docker-compose up -d
```

### ☁️ VPS Deployment

1. **Setup Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

2. **Deploy Bot**
```bash
# Clone repository
git clone https://github.com/malshan/malshan-md.git
cd malshan-md

# Install dependencies
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env
nano .env

# Start with PM2
pm2 start index.js --name "malshan-md"
pm2 save
pm2 startup
```

## 🌐 Platform-Specific Configurations

### Heroku Configuration

Create `Procfile`:
```
worker: npm start
```

Add `heroku-postbuild` script to `package.json`:
```json
{
  "scripts": {
    "heroku-postbuild": "npm install --legacy-peer-deps"
  }
}
```

### Railway Configuration

Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Render Configuration

Create `render.yaml`:
```yaml
services:
  - type: web
    name: malshan-md
    env: node
    buildCommand: npm install --legacy-peer-deps
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

## 🔐 Environment Variables

### Required Variables
```env
OWNER_NUMBER=94701234567    # Your WhatsApp number
PREFIX=.                   # Command prefix
```

### Optional Variables
```env
# API Keys
OPENAI_KEY=your_openai_key
WEATHER_KEY=your_weather_key
NEWS_KEY=your_news_key

# Bot Features
AUTO_READ=true
AUTO_REACT=true
WELCOME_MESSAGE=true

# Database
MONGODB_URI=your_mongodb_uri
```

## 🔄 Keeping Bot Online

### Using PM2 (Recommended)
```bash
# Start
pm2 start index.js --name "malshan-md"

# Monitor
pm2 monit

# Restart
pm2 restart malshan-md

# Stop
pm2 stop malshan-md

# Logs
pm2 logs malshan-md
```

### Using Screen (Alternative)
```bash
# Start screen session
screen -S malshan-md

# Run bot
npm start

# Detach: Ctrl+A, then D
# Reattach: screen -r malshan-md
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
```bash
# Kill process using port
sudo lsof -ti:8000 | xargs kill -9
```

2. **Permission Denied**
```bash
# Fix permissions
chmod +x start.sh
chmod +x index.js
```

3. **Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

4. **Session Issues**
```bash
# Clear session
rm -rf session/*
# Scan QR code again
```

### Performance Optimization

1. **Memory Management**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

2. **Process Management**
```bash
# PM2 with cluster mode
pm2 start index.js --name "malshan-md" -i max
```

## 📊 Monitoring

### Health Checks
```bash
# Check if bot is running
pm2 status

# Check logs
pm2 logs malshan-md --lines 100

# Monitor resources
pm2 monit
```

### Log Management
```bash
# Rotate logs
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 🔄 Auto-Restart

### Systemd Service (Linux)
Create `/etc/systemd/system/malshan-md.service`:
```ini
[Unit]
Description=Malshan MD WhatsApp Bot
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/malshan-md
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable malshan-md
sudo systemctl start malshan-md
```

## 🆘 Support

If you encounter any issues during deployment:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review the logs for error messages
3. Join our [support group](https://chat.whatsapp.com/support)
4. Create an issue on [GitHub](https://github.com/malshan/malshan-md/issues)

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)

---

**Happy Deploying! 🚀**