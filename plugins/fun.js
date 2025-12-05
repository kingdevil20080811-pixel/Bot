export const command = ['joke', 'quote', 'fact', 'pickup', 'meme', 'roast', 'compliment', '8ball', 'choose', 'reverse']

export async function execute({ command, args, reply, react }) {
    switch (command) {
        case 'joke':
            return sendJoke({ reply, react })
        
        case 'quote':
            return sendQuote({ reply, react })
        
        case 'fact':
            return sendFact({ reply, react })
        
        case 'pickup':
            return sendPickupLine({ reply, react })
        
        case 'meme':
            return sendMeme({ reply, react })
        
        case 'roast':
            return sendRoast({ reply, react })
        
        case 'compliment':
            return sendCompliment({ reply, react })
        
        case '8ball':
            return magic8Ball({ args, reply, react })
        
        case 'choose':
            return chooseOption({ args, reply, react })
        
        case 'reverse':
            return reverseText({ args, reply })
        
        default:
            return reply('❌ Unknown fun command!')
    }
}

// Random Jokes
async function sendJoke({ reply, react }) {
    await react('😂')
    
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 😄",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
        "Why don't eggs tell jokes? They'd crack each other up! 🥚",
        "What do you call a fake noodle? An impasta! 🍝",
        "Why did the math book look so sad? Because it had too many problems! 📚",
        "What do you call a bear with no teeth? A gummy bear! 🐻",
        "Why don't skeletons fight each other? They don't have the guts! 💀",
        "What's orange and sounds like a parrot? A carrot! 🥕",
        "Why did the bicycle fall over? It was two-tired! 🚲",
        "What do you call a sleeping bull? A bulldozer! 🐂"
    ]
    
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    
    const jokeText = `😂 *RANDOM JOKE*

${randomJoke}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Fun`

    await reply(jokeText)
}

// Inspirational Quotes
async function sendQuote({ reply, react }) {
    await react('💫')
    
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs 💼",
        "Life is what happens to you while you're busy making other plans. - John Lennon 🎵",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt ✨",
        "It is during our darkest moments that we must focus to see the light. - Aristotle 💡",
        "The only impossible journey is the one you never begin. - Tony Robbins 🚀",
        "In the middle of difficulty lies opportunity. - Albert Einstein 🧠",
        "Believe you can and you're halfway there. - Theodore Roosevelt 🌟",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill 💪",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt 🌅",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson ⏰"
    ]
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    
    const quoteText = `💫 *INSPIRATIONAL QUOTE*

${randomQuote}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Motivation`

    await reply(quoteText)
}

// Random Facts
async function sendFact({ reply, react }) {
    await react('🧠')
    
    const facts = [
        "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old! 🍯",
        "A group of flamingos is called a 'flamboyance'! 🦩",
        "Octopuses have three hearts and blue blood! 🐙",
        "Bananas are berries, but strawberries aren't! 🍌",
        "A shrimp's heart is in its head! 🦐",
        "There are more trees on Earth than stars in the Milky Way galaxy! 🌳",
        "A day on Venus is longer than its year! 🪐",
        "The human brain uses about 20% of the body's total energy! 🧠",
        "Dolphins have names for each other! 🐬",
        "A single strand of spaghetti is called a 'spaghetto'! 🍝"
    ]
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)]
    
    const factText = `🧠 *RANDOM FACT*

${randomFact}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Knowledge`

    await reply(factText)
}

// Pickup Lines
async function sendPickupLine({ reply, react }) {
    await react('😏')
    
    const pickupLines = [
        "Are you a magician? Because whenever I look at you, everyone else disappears! ✨",
        "Do you have a map? I keep getting lost in your eyes! 🗺️",
        "Are you WiFi? Because I'm feeling a connection! 📶",
        "Is your name Google? Because you have everything I've been searching for! 🔍",
        "Are you a parking ticket? Because you've got 'FINE' written all over you! 🅿️",
        "Do you believe in love at first sight, or should I walk by again? 👀",
        "Are you a camera? Because every time I look at you, I smile! 📸",
        "Is your dad a boxer? Because you're a knockout! 🥊",
        "Are you made of copper and tellurium? Because you're Cu-Te! ⚗️",
        "Do you have a Band-Aid? Because I just scraped my knee falling for you! 🩹"
    ]
    
    const randomLine = pickupLines[Math.floor(Math.random() * pickupLines.length)]
    
    const lineText = `😏 *PICKUP LINE*

${randomLine}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Romance`

    await reply(lineText)
}

// Meme Text
async function sendMeme({ reply, react }) {
    await react('😆')
    
    const memes = [
        "When you finally understand a joke 5 minutes after everyone stopped laughing 🤡",
        "Me trying to be productive: *opens 47 tabs* 💻",
        "When someone says 'just be yourself' but you don't know who that is 🤷‍♂️",
        "Me: I'll go to bed early tonight. Also me at 3 AM: 👁️👄👁️",
        "When you're about to fall asleep and your brain decides to remember something embarrassing from 2015 🧠",
        "When you say 'I'm fine' but you're actually dead inside 💀",
        "Me pretending to be busy when my boss walks by 👨‍💼",
        "When you accidentally open the front camera 📱💀",
        "Me trying to adult: *nervous laughter* 😅",
        "When you're home alone and hear a noise: 'Well, this is how I die' 🙃"
    ]
    
    const randomMeme = memes[Math.floor(Math.random() * memes.length)]
    
    const memeText = `😆 *MEME OF THE DAY*

${randomMeme}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Memes`

    await reply(memeText)
}

// Friendly Roasts
async function sendRoast({ reply, react }) {
    await react('🔥')
    
    const roasts = [
        "You're like a software update. Whenever I see you, I think 'not now' 💻",
        "I'd roast you, but my mom said I'm not allowed to burn trash 🗑️",
        "You bring everyone so much joy... when you leave the room 🚪",
        "I'm not saying you're stupid, but you have bad luck thinking 🧠",
        "You're not completely useless... you can always serve as a bad example 📚",
        "If I wanted to kill myself, I'd climb your ego and jump to your IQ 🪜",
        "You're the human equivalent of a participation trophy 🏆",
        "I'd explain it to you, but I don't have any crayons 🖍️",
        "You're like Monday mornings - nobody likes you 📅",
        "You have the perfect face for radio 📻"
    ]
    
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)]
    
    const roastText = `🔥 *FRIENDLY ROAST*

${randomRoast}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Roasts (Just for fun! 😄)`

    await reply(roastText)
}

// Compliments
async function sendCompliment({ reply, react }) {
    await react('🌟')
    
    const compliments = [
        "You light up the room just by being in it! ✨",
        "Your smile is contagious and brightens everyone's day! 😊",
        "You have an amazing sense of humor! 😄",
        "You're incredibly thoughtful and kind! 💝",
        "Your creativity is inspiring! 🎨",
        "You make everything better just by being you! 🌟",
        "You have such a positive energy! ⚡",
        "You're stronger than you know! 💪",
        "Your intelligence is impressive! 🧠",
        "You're absolutely wonderful! 🌈"
    ]
    
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)]
    
    const complimentText = `🌟 *DAILY COMPLIMENT*

${randomCompliment}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Positivity`

    await reply(complimentText)
}

// Magic 8 Ball
async function magic8Ball({ args, reply, react }) {
    if (!args[1]) {
        return reply('❌ Ask the magic 8-ball a question!\n\nExample: .8ball Will I be successful?')
    }
    
    await react('🎱')
    
    const responses = [
        "It is certain ✅",
        "Without a doubt ✅",
        "Yes definitely ✅",
        "You may rely on it ✅",
        "As I see it, yes ✅",
        "Most likely ✅",
        "Outlook good ✅",
        "Yes ✅",
        "Signs point to yes ✅",
        "Reply hazy, try again 🔄",
        "Ask again later 🔄",
        "Better not tell you now 🔄",
        "Cannot predict now 🔄",
        "Concentrate and ask again 🔄",
        "Don't count on it ❌",
        "My reply is no ❌",
        "My sources say no ❌",
        "Outlook not so good ❌",
        "Very doubtful ❌"
    ]
    
    const question = args.slice(1).join(' ')
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    const ballText = `🎱 *MAGIC 8-BALL*

❓ *Question:* ${question}

🔮 *Answer:* ${randomResponse}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Magic`

    await reply(ballText)
}

// Choose Between Options
async function chooseOption({ args, reply, react }) {
    if (args.length < 3) {
        return reply('❌ Provide options separated by "or"!\n\nExample: .choose pizza or burger or sushi')
    }
    
    await react('🤔')
    
    const options = args.slice(1).join(' ').split(/\s+or\s+/i)
    
    if (options.length < 2) {
        return reply('❌ I need at least 2 options to choose from!')
    }
    
    const chosen = options[Math.floor(Math.random() * options.length)]
    
    const choiceText = `🤔 *DECISION MAKER*

🎯 *Options:* ${options.join(', ')}

✨ *I choose:* **${chosen}**

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Decisions`

    await reply(choiceText)
}

// Reverse Text
async function reverseText({ args, reply }) {
    if (!args[1]) {
        return reply('❌ Provide text to reverse!\n\nExample: .reverse Hello World')
    }
    
    const text = args.slice(1).join(' ')
    const reversed = text.split('').reverse().join('')
    
    const reverseText = `🔄 *TEXT REVERSER*

📝 *Original:* ${text}
🔀 *Reversed:* ${reversed}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Tools`

    await reply(reverseText)
}