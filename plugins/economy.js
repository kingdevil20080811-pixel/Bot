export const command = ['balance', 'daily', 'work', 'rob', 'bank', 'transfer', 'shop', 'buy', 'inventory', 'gamble', 'lottery', 'leaderboard']

// Simple in-memory database (you can replace with real database)
if (!global.economy) {
    global.economy = new Map()
}

export async function execute({ command, args, reply, react, sender, from, isGroup }) {
    const userId = sender
    
    // Initialize user if not exists
    if (!global.economy.has(userId)) {
        global.economy.set(userId, {
            coins: 1000,
            bank: 0,
            lastDaily: 0,
            lastWork: 0,
            items: [],
            level: 1,
            xp: 0
        })
    }
    
    const user = global.economy.get(userId)
    
    switch (command) {
        case 'balance':
            return checkBalance({ user, reply, react, sender })
        
        case 'daily':
            return dailyReward({ user, reply, react, userId })
        
        case 'work':
            return workCommand({ user, reply, react, userId })
        
        case 'rob':
            return robUser({ args, reply, react, userId, isGroup })
        
        case 'bank':
            return bankCommand({ args, user, reply, react, userId })
        
        case 'transfer':
            return transferMoney({ args, reply, react, userId })
        
        case 'shop':
            return showShop({ reply, react })
        
        case 'buy':
            return buyItem({ args, user, reply, react, userId })
        
        case 'inventory':
            return showInventory({ user, reply, react })
        
        case 'gamble':
            return gambleCoins({ args, user, reply, react, userId })
        
        case 'lottery':
            return playLottery({ user, reply, react, userId })
        
        case 'leaderboard':
            return showLeaderboard({ reply, react })
        
        default:
            return reply('❌ Unknown economy command!')
    }
}

// Check Balance
async function checkBalance({ user, reply, react, sender }) {
    await react('💰')
    
    const totalWealth = user.coins + user.bank
    const nextLevelXp = user.level * 1000
    
    const balanceText = `💰 *ECONOMY STATUS*

👤 *User:* @${sender.split('@')[0]}
💵 *Wallet:* ${user.coins.toLocaleString()} coins
🏦 *Bank:* ${user.bank.toLocaleString()} coins
💎 *Total Wealth:* ${totalWealth.toLocaleString()} coins

📊 *Level:* ${user.level}
⭐ *XP:* ${user.xp}/${nextLevelXp}
🎒 *Items:* ${user.items.length}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Economy`

    await reply(balanceText)
}

// Daily Reward
async function dailyReward({ user, reply, react, userId }) {
    const now = Date.now()
    const cooldown = 24 * 60 * 60 * 1000 // 24 hours
    
    if (now - user.lastDaily < cooldown) {
        const remaining = cooldown - (now - user.lastDaily)
        const hours = Math.floor(remaining / (60 * 60 * 1000))
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
        
        return reply(`⏰ Daily reward already claimed!\n\nNext reward in: ${hours}h ${minutes}m`)
    }
    
    await react('🎁')
    
    const baseReward = 500
    const bonusReward = Math.floor(Math.random() * 500) + 100
    const totalReward = baseReward + bonusReward
    
    user.coins += totalReward
    user.lastDaily = now
    user.xp += 50
    
    // Level up check
    const nextLevelXp = user.level * 1000
    if (user.xp >= nextLevelXp) {
        user.level++
        user.xp = 0
        
        const levelUpText = `🎁 *DAILY REWARD*

💰 Received: ${totalReward.toLocaleString()} coins
💵 New Balance: ${user.coins.toLocaleString()} coins

🎉 *LEVEL UP!*
📊 New Level: ${user.level}
🎁 Level Bonus: 1000 coins

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Economy`
        
        user.coins += 1000
        await reply(levelUpText)
    } else {
        const dailyText = `🎁 *DAILY REWARD*

💰 Received: ${totalReward.toLocaleString()} coins
💵 New Balance: ${user.coins.toLocaleString()} coins
⭐ XP Gained: +50

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Economy`
        
        await reply(dailyText)
    }
    
    global.economy.set(userId, user)
}

// Work Command
async function workCommand({ user, reply, react, userId }) {
    const now = Date.now()
    const cooldown = 60 * 60 * 1000 // 1 hour
    
    if (now - user.lastWork < cooldown) {
        const remaining = cooldown - (now - user.lastWork)
        const minutes = Math.floor(remaining / (60 * 1000))
        
        return reply(`⏰ You're tired! Rest for ${minutes} more minutes.`)
    }
    
    await react('💼')
    
    const jobs = [
        { name: 'Programming', min: 800, max: 1500, emoji: '💻' },
        { name: 'Teaching', min: 600, max: 1200, emoji: '📚' },
        { name: 'Driving', min: 400, max: 800, emoji: '🚗' },
        { name: 'Cooking', min: 300, max: 700, emoji: '👨‍🍳' },
        { name: 'Cleaning', min: 200, max: 500, emoji: '🧹' },
        { name: 'Delivery', min: 350, max: 650, emoji: '📦' }
    ]
    
    const job = jobs[Math.floor(Math.random() * jobs.length)]
    const earned = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min
    
    user.coins += earned
    user.lastWork = now
    user.xp += 25
    
    const workText = `💼 *WORK COMPLETE*

${job.emoji} *Job:* ${job.name}
💰 *Earned:* ${earned.toLocaleString()} coins
💵 *New Balance:* ${user.coins.toLocaleString()} coins
⭐ *XP Gained:* +25

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Economy`

    global.economy.set(userId, user)
    await reply(workText)
}

// Bank Command
async function bankCommand({ args, user, reply, react, userId }) {
    if (!args[1]) {
        const bankText = `🏦 *BANK STATUS*

💵 *Wallet:* ${user.coins.toLocaleString()} coins
🏦 *Bank:* ${user.bank.toLocaleString()} coins
💎 *Total:* ${(user.coins + user.bank).toLocaleString()} coins

📝 *Commands:*
• .bank deposit [amount] - Deposit money
• .bank withdraw [amount] - Withdraw money
• .bank all - Deposit all money

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Bank`

        return reply(bankText)
    }
    
    const action = args[1].toLowerCase()
    const amount = args[2] === 'all' ? user.coins : parseInt(args[2])
    
    if (action === 'deposit') {
        if (!amount || amount <= 0 || amount > user.coins) {
            return reply('❌ Invalid amount to deposit!')
        }
        
        user.coins -= amount
        user.bank += amount
        
        await reply(`🏦 Deposited ${amount.toLocaleString()} coins to bank!\n\n💵 Wallet: ${user.coins.toLocaleString()}\n🏦 Bank: ${user.bank.toLocaleString()}`)
        
    } else if (action === 'withdraw') {
        if (!amount || amount <= 0 || amount > user.bank) {
            return reply('❌ Invalid amount to withdraw!')
        }
        
        user.bank -= amount
        user.coins += amount
        
        await reply(`🏦 Withdrew ${amount.toLocaleString()} coins from bank!\n\n💵 Wallet: ${user.coins.toLocaleString()}\n🏦 Bank: ${user.bank.toLocaleString()}`)
    }
    
    global.economy.set(userId, user)
}

// Gambling
async function gambleCoins({ args, user, reply, react, userId }) {
    const amount = parseInt(args[1])
    
    if (!amount || amount <= 0 || amount > user.coins) {
        return reply('❌ Invalid amount to gamble!')
    }
    
    if (amount < 100) {
        return reply('❌ Minimum bet is 100 coins!')
    }
    
    await react('🎰')
    
    const chance = Math.random()
    let result, multiplier
    
    if (chance < 0.01) { // 1% chance - Jackpot
        result = 'JACKPOT'
        multiplier = 10
    } else if (chance < 0.1) { // 9% chance - Big Win
        result = 'BIG WIN'
        multiplier = 3
    } else if (chance < 0.4) { // 30% chance - Small Win
        result = 'WIN'
        multiplier = 1.5
    } else { // 60% chance - Loss
        result = 'LOSS'
        multiplier = 0
    }
    
    const winAmount = Math.floor(amount * multiplier)
    const netGain = winAmount - amount
    
    user.coins -= amount
    user.coins += winAmount
    
    const gambleText = `🎰 *GAMBLING RESULT*

🎲 *Result:* ${result}
💰 *Bet:* ${amount.toLocaleString()} coins
${netGain > 0 ? '💸 *Won:* ' + netGain.toLocaleString() + ' coins' : '💔 *Lost:* ' + amount.toLocaleString() + ' coins'}
💵 *New Balance:* ${user.coins.toLocaleString()} coins

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Casino`

    global.economy.set(userId, user)
    await reply(gambleText)
}

// Shop System
async function showShop({ reply, react }) {
    await react('🛒')
    
    const shopText = `🛒 *ECONOMY SHOP*

🎁 *Items for Sale:*

1️⃣ *Laptop* - 50,000 coins
   💻 Increases work earnings by 20%

2️⃣ *Phone* - 25,000 coins
   📱 Reduces work cooldown by 15 minutes

3️⃣ *Car* - 100,000 coins
   🚗 Enables delivery job (high earnings)

4️⃣ *Lucky Charm* - 75,000 coins
   🍀 Increases gambling win chances

5️⃣ *Bank Card* - 30,000 coins
   💳 Increases bank interest rate

📝 *Usage:* .buy [item number]
Example: .buy 1

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Shop`

    await reply(shopText)
}

// Buy Items
async function buyItem({ args, user, reply, react, userId }) {
    const itemId = parseInt(args[1])
    
    const items = {
        1: { name: 'Laptop', price: 50000, effect: 'work_boost' },
        2: { name: 'Phone', price: 25000, effect: 'work_cooldown' },
        3: { name: 'Car', price: 100000, effect: 'delivery_job' },
        4: { name: 'Lucky Charm', price: 75000, effect: 'gambling_boost' },
        5: { name: 'Bank Card', price: 30000, effect: 'bank_interest' }
    }
    
    const item = items[itemId]
    
    if (!item) {
        return reply('❌ Invalid item! Use .shop to see available items.')
    }
    
    if (user.coins < item.price) {
        return reply(`❌ Not enough coins! You need ${item.price.toLocaleString()} coins.`)
    }
    
    if (user.items.includes(item.name)) {
        return reply('❌ You already own this item!')
    }
    
    user.coins -= item.price
    user.items.push(item.name)
    
    const buyText = `🛒 *PURCHASE SUCCESSFUL*

✅ *Bought:* ${item.name}
💰 *Cost:* ${item.price.toLocaleString()} coins
💵 *Remaining:* ${user.coins.toLocaleString()} coins

🎁 Item added to your inventory!

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Shop`

    global.economy.set(userId, user)
    await reply(buyText)
}

// Show Inventory
async function showInventory({ user, reply, react }) {
    await react('🎒')
    
    const inventoryText = `🎒 *YOUR INVENTORY*

${user.items.length === 0 ? '📦 Your inventory is empty!' : 
user.items.map((item, index) => `${index + 1}. ${item}`).join('\n')}

💰 *Total Items:* ${user.items.length}
💎 *Level:* ${user.level}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Inventory`

    await reply(inventoryText)
}

// Leaderboard
async function showLeaderboard({ reply, react }) {
    await react('🏆')
    
    const users = Array.from(global.economy.entries())
        .map(([id, data]) => ({ id, ...data, total: data.coins + data.bank }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10)
    
    let leaderboardText = `🏆 *ECONOMY LEADERBOARD*\n\n`
    
    users.forEach((user, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}️⃣`
        const phone = user.id.split('@')[0]
        leaderboardText += `${medal} @${phone}\n💰 ${user.total.toLocaleString()} coins (Level ${user.level})\n\n`
    })
    
    leaderboardText += `━━━━━━━━━━━━━━━━━━━━━━━━━\n🤖 Malshan MD Economy`
    
    await reply(leaderboardText)
}