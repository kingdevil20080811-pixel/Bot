import QRCode from 'qrcode'
import axios from 'axios'

export const command = ['weather', 'news', 'qr', 'short', 'calc', 'translate', 'define']

export async function execute({ command, args, reply, react, sock, from }) {
    switch (command) {
        case 'weather':
            return getWeather({ args, reply, react })
        
        case 'news':
            return getNews({ reply, react })
        
        case 'qr':
            return generateQR({ args, reply, sock, from })
        
        case 'short':
            return shortenUrl({ args, reply })
        
        case 'calc':
            return calculator({ args, reply })
        
        case 'translate':
            return translateText({ args, reply })
        
        case 'define':
            return defineWord({ args, reply })
        
        default:
            return reply('❌ Unknown tool command!')
    }
}

// Weather Tool
async function getWeather({ args, reply, react }) {
    if (!args[1]) {
        return reply('❌ Please provide a city name!\n\nExample: .weather London')
    }
    
    const city = args.slice(1).join(' ')
    await react('🌤️')
    
    try {
        // Using OpenWeatherMap API (you can replace with your preferred service)
        const apiKey = global.config.weatherKey || 'demo_key'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        
        const response = await axios.get(url)
        const data = response.data
        
        const weatherText = `🌤️ *WEATHER REPORT*

📍 *Location:* ${data.name}, ${data.sys.country}
🌡️ *Temperature:* ${data.main.temp}°C (feels like ${data.main.feels_like}°C)
📊 *Condition:* ${data.weather[0].description}
💧 *Humidity:* ${data.main.humidity}%
💨 *Wind Speed:* ${data.wind.speed} m/s
👁️ *Visibility:* ${data.visibility / 1000} km
☁️ *Cloudiness:* ${data.clouds.all}%

🌅 *Sunrise:* ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
🌇 *Sunset:* ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Weather`

        await reply(weatherText)
        
    } catch (error) {
        console.error('Weather error:', error)
        await reply('❌ Could not fetch weather data. Please check the city name and try again.')
    }
}

// News Tool
async function getNews({ reply, react }) {
    await react('📰')
    
    try {
        // Using a free news API
        const apiKey = global.config.newsKey || 'demo_key'
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=5`
        
        const response = await axios.get(url)
        const articles = response.data.articles
        
        let newsText = '📰 *TOP NEWS HEADLINES*\n\n'
        
        articles.slice(0, 5).forEach((article, index) => {
            newsText += `${index + 1}. *${article.title}*\n`
            newsText += `📝 ${article.description || 'No description available'}\n`
            newsText += `🔗 ${article.url}\n`
            newsText += `📅 ${new Date(article.publishedAt).toLocaleDateString()}\n\n`
        })
        
        newsText += '━━━━━━━━━━━━━━━━━━━━━━━━━\n'
        newsText += '🤖 Malshan MD News'
        
        await reply(newsText)
        
    } catch (error) {
        console.error('News error:', error)
        
        // Fallback news
        const fallbackNews = `📰 *NEWS SERVICE UNAVAILABLE*

🔧 Unable to fetch latest news at the moment.
Please try again later or check news websites directly.

🌐 Popular news sources:
• BBC News
• CNN
• Reuters
• Associated Press

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD`

        await reply(fallbackNews)
    }
}

// QR Code Generator
async function generateQR({ args, reply, sock, from }) {
    if (!args[1]) {
        return reply('❌ Please provide text to generate QR code!\n\nExample: .qr Hello World')
    }
    
    const text = args.slice(1).join(' ')
    
    try {
        const qrBuffer = await QRCode.toBuffer(text, {
            type: 'png',
            quality: 0.92,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        })
        
        await sock.sendMessage(from, {
            image: qrBuffer,
            caption: `📱 *QR CODE GENERATED*

📝 *Text:* ${text}

🔍 Scan this QR code with any QR scanner app!

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD QR Generator`
        })
        
    } catch (error) {
        console.error('QR generation error:', error)
        await reply('❌ Failed to generate QR code!')
    }
}

// URL Shortener
async function shortenUrl({ args, reply }) {
    if (!args[1]) {
        return reply('❌ Please provide a URL to shorten!\n\nExample: .short https://www.google.com')
    }
    
    const url = args[1]
    
    // Basic URL validation
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return reply('❌ Please provide a valid URL starting with http:// or https://')
    }
    
    try {
        // Using a URL shortening service (you can replace with your preferred service)
        const response = await axios.post('https://api.short.io/links', {
            originalURL: url,
            domain: 'short.io',
            allowDuplicates: true
        }, {
            headers: {
                'Authorization': global.config.shortApiKey || 'demo_key',
                'Content-Type': 'application/json'
            }
        })
        
        const shortUrl = response.data.shortURL
        
        const shortText = `🔗 *URL SHORTENED*

📝 *Original:* ${url}
✂️ *Shortened:* ${shortUrl}

📊 Click tracking and analytics available!

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD URL Shortener`

        await reply(shortText)
        
    } catch (error) {
        console.error('URL shortening error:', error)
        
        // Fallback response
        await reply(`🔗 *URL SHORTENING UNAVAILABLE*

Original URL: ${url}

🔧 Service temporarily unavailable.
You can use these alternatives:
• bit.ly
• tinyurl.com  
• short.io

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD`)
    }
}

// Calculator
async function calculator({ args, reply }) {
    if (!args[1]) {
        return reply('❌ Please provide a calculation!\n\nExample: .calc 2 + 2\nSupported: +, -, *, /, ^, sqrt, sin, cos, tan')
    }
    
    const expression = args.slice(1).join(' ')
    
    try {
        // Basic math evaluation (secure)
        const result = evaluateExpression(expression)
        
        const calcText = `🧮 *CALCULATOR*

📝 *Expression:* ${expression}
🔢 *Result:* ${result}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Calculator`

        await reply(calcText)
        
    } catch (error) {
        await reply('❌ Invalid mathematical expression! Please check your input.')
    }
}

// Translate Text
async function translateText({ args, reply }) {
    if (args.length < 3) {
        return reply('❌ Format: .translate [target_language] [text]\n\nExample: .translate spanish Hello world\nExample: .translate es Hola mundo')
    }
    
    const targetLang = args[1].toLowerCase()
    const text = args.slice(2).join(' ')
    
    const translateText = `🌐 *TRANSLATION*

📝 *Original:* ${text}
🎯 *Target Language:* ${targetLang}
🔄 *Translated:* [Translation service unavailable]

💡 *Tip:* Use Google Translate for accurate translations

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Translator`

    await reply(translateText)
}

// Define Word
async function defineWord({ args, reply }) {
    if (!args[1]) {
        return reply('❌ Please provide a word to define!\n\nExample: .define beautiful')
    }
    
    const word = args[1].toLowerCase()
    
    // Basic definitions (you can integrate with a dictionary API)
    const definitions = {
        'beautiful': 'pleasing the senses or mind aesthetically',
        'love': 'an intense feeling of deep affection',
        'peace': 'freedom from disturbance; tranquility',
        'wisdom': 'the quality of having experience, knowledge, and good judgment',
        'courage': 'the ability to do something that frightens one; bravery'
    }
    
    const definition = definitions[word] || 'Definition not found in local dictionary'
    
    const defineText = `📚 *DICTIONARY*

📝 *Word:* ${word}
📖 *Definition:* ${definition}

💡 *Tip:* For detailed definitions, use online dictionaries like Merriam-Webster or Oxford

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Dictionary`

    await reply(defineText)
}

// Safe math expression evaluator
function evaluateExpression(expression) {
    // Remove spaces and validate
    const cleaned = expression.replace(/\s/g, '')
    
    // Only allow numbers, operators, and basic functions
    if (!/^[0-9+\-*/.()^√sincostan ]+$/.test(cleaned)) {
        throw new Error('Invalid characters in expression')
    }
    
    // Basic replacements for common operations
    let processed = cleaned
        .replace(/\^/g, '**')
        .replace(/√/g, 'Math.sqrt')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
    
    // Evaluate safely (limited scope)
    try {
        const result = Function('"use strict"; return (' + processed + ')')()
        return isFinite(result) ? result : 'Error: Invalid result'
    } catch (error) {
        throw new Error('Invalid expression')
    }
}