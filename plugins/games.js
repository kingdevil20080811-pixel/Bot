export const command = ['tictactoe', 'ttt', 'math', 'guess', 'slots', 'dice']

export async function execute({ command, args, reply, react, from, sender }) {
    switch (command) {
        case 'tictactoe':
        case 'ttt':
            return startTicTacToe({ args, reply, from, sender })
        
        case 'math':
            return mathQuiz({ reply, react, from, sender })
        
        case 'guess':
            return numberGuess({ args, reply, from, sender })
        
        case 'slots':
            return slotMachine({ reply, react })
        
        case 'dice':
            return rollDice({ reply, react })
        
        default:
            return reply('❌ Unknown game command!')
    }
}

// Tic Tac Toe Game
async function startTicTacToe({ args, reply, from, sender }) {
    if (!global.game) global.game = new Map()
    
    const gameId = from
    
    if (global.game.has(gameId)) {
        return reply('🎮 A game is already in progress in this chat!')
    }
    
    const board = [
        ['1️⃣', '2️⃣', '3️⃣'],
        ['4️⃣', '5️⃣', '6️⃣'],
        ['7️⃣', '8️⃣', '9️⃣']
    ]
    
    global.game.set(gameId, {
        type: 'tictactoe',
        board: board,
        currentPlayer: 'X',
        players: { X: sender, O: null },
        moves: 0
    })
    
    const gameText = `🎮 *TIC TAC TOE STARTED*

${displayBoard(board)}

❌ *Player X:* @${sender.split('@')[0]}
⭕ *Player O:* Waiting for opponent...

To join as Player O, type: .ttt join
To make a move, type: .ttt [number]

🎯 First to get 3 in a row wins!`

    await reply(gameText)
}

// Math Quiz Game
async function mathQuiz({ reply, react, from, sender }) {
    await react('🧮')
    
    const operations = ['+', '-', '*']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    
    let num1, num2, answer
    
    if (operation === '*') {
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        answer = num1 * num2
    } else {
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        if (operation === '-' && num1 < num2) {
            [num1, num2] = [num2, num1] // Ensure positive result
        }
        answer = operation === '+' ? num1 + num2 : num1 - num2
    }
    
    const mathText = `🧮 *MATH QUIZ*

❓ *Question:* ${num1} ${operation} ${num2} = ?

💡 Reply with your answer!
⏰ You have 30 seconds...`

    await reply(mathText)
    
    // Store the answer for validation
    if (!global.game) global.game = new Map()
    global.game.set(`math_${from}_${sender}`, {
        type: 'math',
        answer: answer,
        startTime: Date.now()
    })
    
    // Auto-clear after 30 seconds
    setTimeout(() => {
        if (global.game.has(`math_${from}_${sender}`)) {
            global.game.delete(`math_${from}_${sender}`)
            reply('⏰ Time\'s up! The answer was: ' + answer)
        }
    }, 30000)
}

// Number Guessing Game
async function numberGuess({ args, reply, from, sender }) {
    if (!global.game) global.game = new Map()
    
    const gameId = `guess_${from}_${sender}`
    
    if (args[1] === 'start') {
        const randomNumber = Math.floor(Math.random() * 100) + 1
        
        global.game.set(gameId, {
            type: 'guess',
            number: randomNumber,
            attempts: 0,
            maxAttempts: 7
        })
        
        return reply(`🎯 *NUMBER GUESSING GAME*

I'm thinking of a number between 1 and 100!
You have 7 attempts to guess it.

Use: .guess [number]
Example: .guess 50

🎮 Good luck!`)
    }
    
    if (!global.game.has(gameId)) {
        return reply('🎯 Start a new game first with: .guess start')
    }
    
    const guess = parseInt(args[1])
    if (isNaN(guess) || guess < 1 || guess > 100) {
        return reply('❌ Please enter a valid number between 1 and 100!')
    }
    
    const game = global.game.get(gameId)
    game.attempts++
    
    if (guess === game.number) {
        global.game.delete(gameId)
        return reply(`🎉 *CONGRATULATIONS!*

✅ You guessed it right!
🎯 Number: ${game.number}
🔢 Attempts: ${game.attempts}/${game.maxAttempts}

🏆 Excellent work!`)
    }
    
    if (game.attempts >= game.maxAttempts) {
        global.game.delete(gameId)
        return reply(`💥 *GAME OVER!*

❌ You've used all ${game.maxAttempts} attempts!
🎯 The number was: ${game.number}

Try again with: .guess start`)
    }
    
    const hint = guess < game.number ? '📈 Too low!' : '📉 Too high!'
    const remaining = game.maxAttempts - game.attempts
    
    return reply(`${hint}

🔢 Attempts left: ${remaining}
🎯 Keep trying!`)
}

// Slot Machine
async function slotMachine({ reply, react }) {
    await react('🎰')
    
    const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '💎', '⭐', '🔔']
    const slot1 = emojis[Math.floor(Math.random() * emojis.length)]
    const slot2 = emojis[Math.floor(Math.random() * emojis.length)]
    const slot3 = emojis[Math.floor(Math.random() * emojis.length)]
    
    let result = '🎰 *SLOT MACHINE* 🎰\n\n'
    result += `┌─────────────┐\n`
    result += `│  ${slot1} │ ${slot2} │ ${slot3}  │\n`
    result += `└─────────────┘\n\n`
    
    if (slot1 === slot2 && slot2 === slot3) {
        result += '🎉 *JACKPOT!* 🎉\n'
        result += '💰 You won BIG! 💰'
        await react('🎉')
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        result += '✨ *NICE!* ✨\n'
        result += '🎁 Small win! 🎁'
        await react('✨')
    } else {
        result += '😅 *Better luck next time!* 😅\n'
        result += '🔄 Try again!'
        await react('😅')
    }
    
    await reply(result)
}

// Dice Roll
async function rollDice({ reply, react }) {
    await react('🎲')
    
    const dice1 = Math.floor(Math.random() * 6) + 1
    const dice2 = Math.floor(Math.random() * 6) + 1
    const total = dice1 + dice2
    
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    
    let result = '🎲 *DICE ROLL* 🎲\n\n'
    result += `${diceEmojis[dice1 - 1]} ${diceEmojis[dice2 - 1]}\n\n`
    result += `🔢 *Total:* ${total}\n\n`
    
    if (total === 12) {
        result += '🎉 *PERFECT ROLL!* 🎉'
        await react('🎉')
    } else if (total >= 10) {
        result += '✨ *Great roll!* ✨'
        await react('✨')
    } else if (total <= 4) {
        result += '😅 *Unlucky!* 😅'
        await react('😅')
    } else {
        result += '👍 *Nice roll!* 👍'
        await react('👍')
    }
    
    await reply(result)
}

// Helper function to display Tic Tac Toe board
function displayBoard(board) {
    return board.map(row => row.join(' ')).join('\n')
}