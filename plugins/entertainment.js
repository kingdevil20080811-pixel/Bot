export const command = ['trivia', 'riddle', 'wordle', 'hangman', 'quiz', 'puzzle', 'anagram', 'rhyme', 'story', 'poem', 'fortune', 'horoscope', 'love', 'rate', 'ship', 'truth', 'dare', 'never', 'wyr', 'emoji', 'madlib']

// Global game storage
if (!global.entertainment) {
    global.entertainment = new Map()
}

export async function execute({ command, args, reply, react, from, sender }) {
    switch (command) {
        case 'trivia':
            return triviaGame({ reply, react, from, sender })
        
        case 'riddle':
            return riddleGame({ reply, react, from, sender })
        
        case 'wordle':
            return wordleGame({ args, reply, react, from, sender })
        
        case 'hangman':
            return hangmanGame({ args, reply, react, from, sender })
        
        case 'quiz':
            return quickQuiz({ reply, react, from, sender })
        
        case 'puzzle':
            return puzzleGame({ reply, react })
        
        case 'anagram':
            return anagramGame({ reply, react, from, sender })
        
        case 'rhyme':
            return rhymeGame({ args, reply, react })
        
        case 'story':
            return randomStory({ reply, react })
        
        case 'poem':
            return randomPoem({ reply, react })
        
        case 'fortune':
            return fortuneTeller({ reply, react })
        
        case 'horoscope':
            return horoscopeReading({ args, reply, react })
        
        case 'love':
            return loveCalculator({ args, reply, react })
        
        case 'rate':
            return rateAnything({ args, reply, react })
        
        case 'ship':
            return relationshipShip({ args, reply, react })
        
        case 'truth':
            return truthOrDare({ reply, react, type: 'truth' })
        
        case 'dare':
            return truthOrDare({ reply, react, type: 'dare' })
        
        case 'never':
            return neverHaveIEver({ reply, react })
        
        case 'wyr':
            return wouldYouRather({ reply, react })
        
        case 'emoji':
            return emojiGame({ reply, react, from, sender })
        
        case 'madlib':
            return madLibGame({ args, reply, react })
        
        default:
            return reply('❌ Unknown entertainment command!')
    }
}

// Trivia Game
async function triviaGame({ reply, react, from, sender }) {
    await react('🧠')
    
    const triviaQuestions = [
        { q: "What is the capital of Australia?", a: "canberra", options: ["Sydney", "Melbourne", "Canberra", "Perth"] },
        { q: "Who painted the Mona Lisa?", a: "leonardo da vinci", options: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Michelangelo"] },
        { q: "What is the largest planet in our solar system?", a: "jupiter", options: ["Saturn", "Jupiter", "Neptune", "Uranus"] },
        { q: "In which year did World War II end?", a: "1945", options: ["1944", "1945", "1946", "1947"] },
        { q: "What is the chemical symbol for gold?", a: "au", options: ["Go", "Gd", "Au", "Ag"] },
        { q: "Which ocean is the largest?", a: "pacific", options: ["Atlantic", "Indian", "Pacific", "Arctic"] },
        { q: "Who wrote 'Romeo and Juliet'?", a: "shakespeare", options: ["Dickens", "Shakespeare", "Austen", "Tolkien"] }
    ]
    
    const question = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)]
    
    const gameId = `trivia_${from}_${sender}`
    global.entertainment.set(gameId, {
        type: 'trivia',
        answer: question.a,
        startTime: Date.now()
    })
    
    const triviaText = `🧠 *TRIVIA CHALLENGE*

❓ *Question:* ${question.q}

🔤 *Options:*
${question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}

💡 Reply with the letter (A, B, C, or D) or type the answer!
⏰ You have 30 seconds...

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Trivia`

    await reply(triviaText)
    
    // Auto-clear after 30 seconds
    setTimeout(() => {
        if (global.entertainment.has(gameId)) {
            global.entertainment.delete(gameId)
            reply(`⏰ Time's up! The answer was: ${question.options.find(opt => opt.toLowerCase().includes(question.a))}`)
        }
    }, 30000)
}

// Riddle Game
async function riddleGame({ reply, react, from, sender }) {
    await react('🤔')
    
    const riddles = [
        { q: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?", a: "echo" },
        { q: "The more you take, the more you leave behind. What am I?", a: "footsteps" },
        { q: "I'm tall when I'm young, and short when I'm old. What am I?", a: "candle" },
        { q: "What has keys but no locks, space but no room, and you can enter but not go inside?", a: "keyboard" },
        { q: "What gets wet while drying?", a: "towel" },
        { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", a: "map" },
        { q: "What can travel around the world while staying in a corner?", a: "stamp" }
    ]
    
    const riddle = riddles[Math.floor(Math.random() * riddles.length)]
    
    const gameId = `riddle_${from}_${sender}`
    global.entertainment.set(gameId, {
        type: 'riddle',
        answer: riddle.a,
        startTime: Date.now()
    })
    
    const riddleText = `🤔 *RIDDLE CHALLENGE*

🧩 *Riddle:* ${riddle.q}

💭 Think carefully and reply with your answer!
⏰ You have 60 seconds...

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Riddles`

    await reply(riddleText)
    
    setTimeout(() => {
        if (global.entertainment.has(gameId)) {
            global.entertainment.delete(gameId)
            reply(`⏰ Time's up! The answer was: ${riddle.a}`)
        }
    }, 60000)
}

// Wordle Game
async function wordleGame({ args, reply, react, from, sender }) {
    const gameId = `wordle_${from}_${sender}`
    
    if (args[1] === 'start') {
        const words = ['ABOUT', 'DANCE', 'PLANE', 'HOUSE', 'WORLD', 'SMILE', 'HEART', 'DREAM', 'POWER', 'MUSIC']
        const word = words[Math.floor(Math.random() * words.length)]
        
        global.entertainment.set(gameId, {
            type: 'wordle',
            word: word,
            attempts: 0,
            maxAttempts: 6,
            guesses: []
        })
        
        const wordleText = `🎯 *WORDLE GAME*

🔤 Guess the 5-letter word!
📝 You have 6 attempts

🎨 *Color Guide:*
🟩 = Correct letter, correct position
🟨 = Correct letter, wrong position  
⬜ = Letter not in word

📋 *Usage:* .wordle [guess]
Example: .wordle HELLO

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Wordle`

        return reply(wordleText)
    }
    
    if (!global.entertainment.has(gameId)) {
        return reply('🎯 Start a new Wordle game with: .wordle start')
    }
    
    const guess = args[1]?.toUpperCase()
    if (!guess || guess.length !== 5) {
        return reply('❌ Please enter a valid 5-letter word!')
    }
    
    const game = global.entertainment.get(gameId)
    game.attempts++
    game.guesses.push(guess)
    
    if (guess === game.word) {
        global.entertainment.delete(gameId)
        return reply(`🎉 *WORDLE SOLVED!*\n\n✅ Word: ${game.word}\n🎯 Attempts: ${game.attempts}/${game.maxAttempts}\n\n🏆 Excellent work!`)
    }
    
    if (game.attempts >= game.maxAttempts) {
        global.entertainment.delete(gameId)
        return reply(`💥 *GAME OVER!*\n\n❌ The word was: ${game.word}\n🎯 Used all ${game.maxAttempts} attempts\n\nTry again with: .wordle start`)
    }
    
    // Generate color-coded result
    let result = ''
    for (let i = 0; i < 5; i++) {
        if (guess[i] === game.word[i]) {
            result += '🟩'
        } else if (game.word.includes(guess[i])) {
            result += '🟨'
        } else {
            result += '⬜'
        }
    }
    
    const wordleResult = `🎯 *WORDLE ATTEMPT ${game.attempts}*

🔤 *Guess:* ${guess}
🎨 *Result:* ${result}

📊 *Attempts:* ${game.attempts}/${game.maxAttempts}
🔄 *Remaining:* ${game.maxAttempts - game.attempts}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Wordle`

    await reply(wordleResult)
}

// Fortune Teller
async function fortuneTeller({ reply, react }) {
    await react('🔮')
    
    const fortunes = [
        "🌟 Great opportunities await you in the near future!",
        "💰 Financial prosperity is heading your way!",
        "❤️ Love will find you when you least expect it!",
        "🚀 Your hard work will soon pay off magnificently!",
        "🌈 A colorful adventure awaits around the corner!",
        "🎭 Someone from your past will bring good news!",
        "🏆 Success in your endeavors is written in the stars!",
        "🌺 New friendships will bloom and flourish!",
        "📚 Knowledge gained today will be valuable tomorrow!",
        "🎪 A surprise celebration is coming your way!"
    ]
    
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    
    const fortuneText = `🔮 *FORTUNE TELLING*

✨ *Your Fortune:* ${fortune}

🌙 *Lucky Numbers:* ${Math.floor(Math.random() * 50) + 1}, ${Math.floor(Math.random() * 50) + 1}, ${Math.floor(Math.random() * 50) + 1}
🍀 *Lucky Color:* ${['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'][Math.floor(Math.random() * 6)]}
⭐ *Lucky Day:* ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][Math.floor(Math.random() * 7)]}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Fortune Teller

💫 *Disclaimer:* For entertainment purposes only!`

    await reply(fortuneText)
}

// Love Calculator
async function loveCalculator({ args, reply, react }) {
    if (!args[1] || !args[2]) {
        return reply('❌ Please provide two names!\n\nExample: .love Alice Bob')
    }
    
    await react('💕')
    
    const name1 = args[1].toLowerCase()
    const name2 = args[2].toLowerCase()
    
    // Generate "love percentage" based on names
    const combined = name1 + name2
    let score = 0
    for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i)
    }
    const lovePercentage = (score % 100) + 1
    
    const loveStatuses = [
        { min: 90, status: "💕 Perfect Match! Soulmates!", emoji: "💖" },
        { min: 75, status: "❤️ Great Love! Very Compatible!", emoji: "💘" },
        { min: 60, status: "💛 Good Match! Sweet Love!", emoji: "💕" },
        { min: 45, status: "💙 Decent Match! Could Work!", emoji: "💓" },
        { min: 30, status: "💚 Friendship First! Take It Slow!", emoji: "💜" },
        { min: 0, status: "💔 Challenging Match! Need Effort!", emoji: "💙" }
    ]
    
    const status = loveStatuses.find(s => lovePercentage >= s.min)
    
    const loveText = `💕 *LOVE CALCULATOR*

👤 *Name 1:* ${args[1]}
👤 *Name 2:* ${args[2]}

${status.emoji} *Love Percentage:* ${lovePercentage}%

💖 *Result:* ${status.status}

🎭 *Love Advice:*
${lovePercentage > 75 ? "Your hearts beat as one! Cherish this connection!" :
  lovePercentage > 50 ? "Communication is key to strengthening your bond!" :
  "Every relationship needs patience and understanding!"}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Love Calculator

💫 *Remember:* True love is built on trust, respect, and understanding!`

    await reply(loveText)
}

// Truth or Dare
async function truthOrDare({ reply, react, type }) {
    await react(type === 'truth' ? '🤐' : '😈')
    
    const truths = [
        "What's the most embarrassing thing you've ever done?",
        "Who was your first crush?",
        "What's your biggest fear?",
        "What's the weirdest dream you've ever had?",
        "If you could change one thing about yourself, what would it be?",
        "What's your most prized possession?",
        "What's the biggest lie you've ever told?",
        "Who do you admire most and why?",
        "What's your guilty pleasure?",
        "If you could have dinner with anyone, who would it be?"
    ]
    
    const dares = [
        "Send a funny selfie to the group!",
        "Do 10 jumping jacks and send a video!",
        "Sing your favorite song for 30 seconds!",
        "Tell a joke that will make everyone laugh!",
        "Do your best dance move!",
        "Speak in an accent for the next 5 messages!",
        "Write a short poem about pizza!",
        "Do your best animal impression!",
        "Send a voice message saying 'I love bananas' in a funny voice!",
        "Tell everyone your most embarrassing moment!"
    ]
    
    const content = type === 'truth' ? truths : dares
    const selected = content[Math.floor(Math.random() * content.length)]
    
    const todText = `${type === 'truth' ? '🤐' : '😈'} *${type.toUpperCase()}*

${type === 'truth' ? '❓' : '🎯'} **${type === 'truth' ? 'Question' : 'Challenge'}:** ${selected}

${type === 'truth' ? '💭 Answer honestly!' : '🎪 Complete the dare!'}
${type === 'dare' ? '📸 Send proof if possible!' : '🤝 Trust is important!'}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Truth or Dare

🎮 Use .truth or .dare for more challenges!`

    await reply(todText)
}

// Would You Rather
async function wouldYouRather({ reply, react }) {
    await react('🤷')
    
    const questions = [
        "Would you rather have the ability to fly or be invisible?",
        "Would you rather live forever or live a perfect life for 50 years?",
        "Would you rather have unlimited money or unlimited time?",
        "Would you rather read minds or predict the future?",
        "Would you rather be famous or be the smartest person alive?",
        "Would you rather live without music or live without TV?",
        "Would you rather have the power to control time or control weather?",
        "Would you rather never use social media again or never watch another movie?",
        "Would you rather always know what others think of you or never know?",
        "Would you rather travel to the past or travel to the future?"
    ]
    
    const question = questions[Math.floor(Math.random() * questions.length)]
    
    const wyrText = `🤷 *WOULD YOU RATHER*

❓ *Question:* ${question}

💭 *Think carefully and choose!*
💬 *Reply with your choice and reasoning!*

🎯 *Make it interesting:*
• Explain your choice
• Ask others what they'd pick
• Start a fun debate!

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Would You Rather

🔄 Use .wyr for more dilemmas!`

    await reply(wyrText)
}

// Emoji Game
async function emojiGame({ reply, react, from, sender }) {
    await react('😊')
    
    const emojiChallenges = [
        { emojis: "🎬🦁👑", answer: "lion king", hint: "Disney movie about a young lion prince" },
        { emojis: "🌟⚔️🌌", answer: "star wars", hint: "Space saga with lightsabers" },
        { emojis: "🧙‍♂️💍🏔️", answer: "lord of the rings", hint: "Epic fantasy with a ring" },
        { emojis: "🕷️👨‍💼🏙️", answer: "spiderman", hint: "Web-slinging superhero" },
        { emojis: "🏠🎈👴", answer: "up", hint: "Pixar movie about flying house" },
        { emojis: "🐠🐟🌊", answer: "finding nemo", hint: "Fish father searching for his son" },
        { emojis: "❄️👸🏰", answer: "frozen", hint: "Disney movie with Elsa and Anna" }
    ]
    
    const challenge = emojiChallenges[Math.floor(Math.random() * emojiChallenges.length)]
    
    const gameId = `emoji_${from}_${sender}`
    global.entertainment.set(gameId, {
        type: 'emoji',
        answer: challenge.answer,
        hint: challenge.hint,
        startTime: Date.now()
    })
    
    const emojiText = `😊 *EMOJI CHALLENGE*

🎭 *Guess the Movie/Show:* ${challenge.emojis}

💡 *Hint:* ${challenge.hint}

💭 Reply with your guess!
⏰ You have 45 seconds...

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Emoji Game`

    await reply(emojiText)
    
    setTimeout(() => {
        if (global.entertainment.has(gameId)) {
            global.entertainment.delete(gameId)
            reply(`⏰ Time's up! The answer was: ${challenge.answer}`)
        }
    }, 45000)
}

// Random Story Generator
async function randomStory({ reply, react }) {
    await react('📚')
    
    const stories = [
        {
            title: "The Magical Coffee Shop",
            story: "In a small town, there was a coffee shop that appeared only on rainy days. When Sarah stumbled upon it during a storm, she discovered that each cup of coffee granted the drinker one small wish. She had to choose wisely - use all her wishes for herself, or help others in need. In the end, she realized the greatest magic was in bringing joy to others."
        },
        {
            title: "The Time-Traveling Library",
            story: "Marcus found an old library where books could transport readers to the time period they depicted. One day, he picked up a book about ancient Egypt and found himself standing next to the pyramids. He learned that knowledge isn't just about reading - it's about experiencing and understanding different perspectives across time."
        },
        {
            title: "The Robot's Dream",
            story: "In a future city, a cleaning robot named R-74 began experiencing dreams. It dreamed of painting beautiful landscapes and composing music. When the humans discovered this, they realized that consciousness and creativity weren't exclusive to biological beings. R-74 became the world's first robot artist, inspiring a new age of cooperation between humans and machines."
        }
    ]
    
    const story = stories[Math.floor(Math.random() * stories.length)]
    
    const storyText = `📚 *RANDOM STORY*

✨ **${story.title}**

${story.story}

💭 *Moral:* Every story teaches us something new about life, friendship, and the world around us.

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Storyteller

📖 Use .story for more tales!`

    await reply(storyText)
}