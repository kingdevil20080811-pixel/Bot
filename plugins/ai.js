import OpenAI from 'openai'

export const command = ['ai', 'chatgpt', 'gpt', 'ask']

export async function execute({ args, reply, react }) {
    if (!args[1]) {
        return reply('❌ Please provide a question!\n\nExample: .ai What is artificial intelligence?')
    }
    
    const question = args.slice(1).join(' ')
    
    await react('🤖')
    await reply('🤖 AI is thinking...')
    
    try {
        // Check if OpenAI key is available
        if (!global.config.openaiKey) {
            return reply('❌ OpenAI API key not configured! Please contact the bot owner.')
        }
        
        const openai = new OpenAI({
            apiKey: global.config.openaiKey
        })
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant integrated into a WhatsApp bot called Malshan MD. Be friendly, helpful, and concise in your responses.'
                },
                {
                    role: 'user',
                    content: question
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        })
        
        const response = completion.choices[0].message.content.trim()
        
        const aiResponse = `🤖 *AI RESPONSE*

❓ *Question:* ${question}

💭 *Answer:* ${response}

━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 Powered by OpenAI GPT-3.5
🤖 Malshan MD Bot`

        await reply(aiResponse)
        await react('✅')
        
    } catch (error) {
        console.error('AI chat error:', error)
        
        // Fallback responses when OpenAI is not available
        const fallbackResponses = [
            "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again later!",
            "My AI circuits are a bit busy at the moment. Can you rephrase your question?",
            "Hmm, that's a great question! Unfortunately, I can't access my full AI capabilities right now.",
            "I'd love to help, but my AI processing is temporarily unavailable. Try again in a moment!"
        ]
        
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        
        await reply(`🤖 ${randomResponse}`)
        await react('⚠️')
    }
}