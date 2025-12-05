export const command = ['learn', 'study', 'teach', 'science', 'math', 'history', 'geography', 'language', 'coding', 'physics', 'chemistry', 'biology', 'literature', 'art', 'music', 'philosophy', 'psychology', 'economics', 'space', 'nature']

export async function execute({ command, args, reply, react }) {
    switch (command) {
        case 'learn':
            return learningMenu({ reply, react })
        
        case 'study':
            return studyTips({ reply, react })
        
        case 'teach':
            return teachingMode({ args, reply, react })
        
        case 'science':
            return scienceFacts({ reply, react })
        
        case 'math':
            return mathLesson({ args, reply, react })
        
        case 'history':
            return historyFacts({ reply, react })
        
        case 'geography':
            return geographyFacts({ reply, react })
        
        case 'language':
            return languageLearning({ args, reply, react })
        
        case 'coding':
            return codingLessons({ args, reply, react })
        
        case 'physics':
            return physicsLessons({ reply, react })
        
        case 'chemistry':
            return chemistryFacts({ reply, react })
        
        case 'biology':
            return biologyFacts({ reply, react })
        
        case 'literature':
            return literatureFacts({ reply, react })
        
        case 'art':
            return artHistory({ reply, react })
        
        case 'music':
            return musicTheory({ reply, react })
        
        case 'philosophy':
            return philosophyQuotes({ reply, react })
        
        case 'psychology':
            return psychologyFacts({ reply, react })
        
        case 'economics':
            return economicsBasics({ reply, react })
        
        case 'space':
            return spaceFacts({ reply, react })
        
        case 'nature':
            return natureFacts({ reply, react })
        
        default:
            return reply('❌ Unknown educational command!')
    }
}

// Learning Menu
async function learningMenu({ reply, react }) {
    await react('📚')
    
    const menuText = `📚 *EDUCATION CENTER*

🎓 *Available Subjects:*

🔬 *Sciences:*
• .science - Science facts
• .physics - Physics lessons  
• .chemistry - Chemistry facts
• .biology - Biology facts
• .space - Space & astronomy

📊 *Mathematics:*
• .math - Math lessons
• .math algebra - Algebra basics
• .math geometry - Geometry
• .math calculus - Calculus intro

🌍 *Social Studies:*
• .history - Historical facts
• .geography - World geography
• .economics - Economics basics
• .psychology - Psychology facts

🎨 *Arts & Literature:*
• .art - Art history
• .music - Music theory
• .literature - Literary facts
• .philosophy - Philosophy quotes

💻 *Technology:*
• .coding - Programming lessons
• .coding python - Python basics
• .coding web - Web development

🗣️ *Languages:*
• .language - Language learning
• .language spanish - Spanish lessons
• .language french - French basics

📖 *Study Tools:*
• .study - Study tips
• .teach [topic] - Teaching mode

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Education

🎯 *Interactive learning for everyone!*`

    await reply(menuText)
}

// Math Lessons
async function mathLesson({ args, reply, react }) {
    await react('🧮')
    
    if (!args[1]) {
        const mathMenu = `🧮 *MATHEMATICS CENTER*

📊 *Available Topics:*

🔢 *Basic Math:*
• .math addition - Addition rules
• .math multiplication - Times tables
• .math fractions - Working with fractions
• .math percentages - Percentage calculations

📐 *Geometry:*
• .math geometry - Shapes and angles
• .math area - Area calculations
• .math volume - Volume formulas
• .math triangle - Triangle properties

📈 *Algebra:*
• .math algebra - Basic algebra
• .math equations - Solving equations
• .math variables - Working with variables
• .math graphs - Graphing functions

🎯 *Advanced:*
• .math calculus - Calculus basics
• .math statistics - Statistics intro
• .math probability - Probability theory

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Mathematics

💡 Choose a topic to start learning!`

        return reply(mathMenu)
    }
    
    const topic = args[1].toLowerCase()
    
    const lessons = {
        algebra: {
            title: "Algebra Basics",
            content: `📈 *ALGEBRA FUNDAMENTALS*

🔤 *What is Algebra?*
Algebra uses letters and symbols to represent numbers and express mathematical relationships.

📝 *Basic Rules:*
• Variables: x, y, z represent unknown numbers
• Constants: Regular numbers (1, 2, 3...)
• Operations: +, -, ×, ÷ work the same way

🎯 *Simple Example:*
If x + 5 = 12, what is x?
Solution: x = 12 - 5 = 7

💡 *Key Concepts:*
• Like terms: 3x + 2x = 5x
• Distributive: 3(x + 2) = 3x + 6
• Balance: What you do to one side, do to the other

🔢 *Practice Problems:*
1. Solve: x + 8 = 15
2. Solve: 2x = 14
3. Solve: 3x + 5 = 20

*Answers: 1) x=7, 2) x=7, 3) x=5*`
        },
        geometry: {
            title: "Geometry Basics",
            content: `📐 *GEOMETRY FUNDAMENTALS*

🔺 *Basic Shapes:*
• Triangle: 3 sides, angles add to 180°
• Square: 4 equal sides, 4 right angles
• Circle: All points equal distance from center
• Rectangle: 4 sides, opposite sides equal

📏 *Measurements:*
• Perimeter: Distance around a shape
• Area: Space inside a shape
• Volume: Space inside a 3D object

🎯 *Formulas:*
• Rectangle Area: length × width
• Triangle Area: ½ × base × height
• Circle Area: π × radius²
• Circle Circumference: 2 × π × radius

💡 *Angles:*
• Right angle: 90°
• Acute angle: less than 90°
• Obtuse angle: more than 90°
• Straight line: 180°

📊 *Pythagorean Theorem:*
a² + b² = c² (for right triangles)`
        },
        calculus: {
            title: "Calculus Introduction",
            content: `📈 *CALCULUS BASICS*

🎯 *What is Calculus?*
The study of change and motion, using derivatives and integrals.

📊 *Two Main Concepts:*

1️⃣ *Derivatives:* Rate of change
• How fast something is changing
• Slope of a curve at any point
• Used in physics for velocity, acceleration

2️⃣ *Integrals:* Area under curves
• Total accumulation over time
• Area between curves and axes
• Used for finding distances, volumes

💡 *Real-World Applications:*
• Physics: motion, forces, energy
• Economics: optimization, growth rates
• Engineering: design, optimization
• Medicine: drug concentration, growth

🔢 *Simple Example:*
If position = t², then velocity = 2t
(derivative shows rate of change)

📚 *Prerequisites:*
• Strong algebra skills
• Understanding of functions
• Basic trigonometry knowledge`
        }
    }
    
    const lesson = lessons[topic]
    if (!lesson) {
        return reply('❌ Topic not found! Use .math to see available topics.')
    }
    
    const mathText = `🧮 *${lesson.title.toUpperCase()}*

${lesson.content}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Mathematics

📚 Keep practicing to master these concepts!`

    await reply(mathText)
}

// Science Facts
async function scienceFacts({ reply, react }) {
    await react('🔬')
    
    const facts = [
        {
            category: "Physics",
            fact: "Light travels at 299,792,458 meters per second in a vacuum - the fastest speed possible in the universe!",
            explanation: "This speed limit is fundamental to Einstein's theory of relativity and affects everything from GPS satellites to particle accelerators."
        },
        {
            category: "Chemistry", 
            fact: "Diamond and graphite are both made of pure carbon, but their different structures give them completely opposite properties!",
            explanation: "Diamond's carbon atoms form a rigid 3D network making it incredibly hard, while graphite's layered structure makes it soft and slippery."
        },
        {
            category: "Biology",
            fact: "Your brain uses about 20% of your body's total energy despite being only 2% of your body weight!",
            explanation: "This massive energy consumption powers billions of neurons making trillions of connections every second."
        },
        {
            category: "Astronomy",
            fact: "A teaspoon of neutron star material would weigh about 6 billion tons on Earth!",
            explanation: "Neutron stars are so dense that their gravity is 200 billion times stronger than Earth's gravity."
        },
        {
            category: "Earth Science",
            fact: "The Earth's magnetic field flips its polarity every 200,000 to 300,000 years on average!",
            explanation: "During the flip, the magnetic field weakens significantly, potentially affecting technology and exposing us to more cosmic radiation."
        }
    ]
    
    const fact = facts[Math.floor(Math.random() * facts.length)]
    
    const scienceText = `🔬 *SCIENCE FACT*

🎯 *Category:* ${fact.category}

💡 *Amazing Fact:*
${fact.fact}

🧠 *Why This Matters:*
${fact.explanation}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Science Education

🌟 Science helps us understand our amazing universe!`

    await reply(scienceText)
}

// Coding Lessons
async function codingLessons({ args, reply, react }) {
    await react('💻')
    
    if (!args[1]) {
        const codingMenu = `💻 *PROGRAMMING CENTER*

🚀 *Programming Languages:*

🐍 *Python:*
• .coding python - Python basics
• .coding python variables - Variables & data types
• .coding python functions - Functions
• .coding python loops - Loops & conditions

🌐 *Web Development:*
• .coding html - HTML basics
• .coding css - CSS styling
• .coding javascript - JavaScript intro
• .coding web - Web development overview

⚙️ *Other Languages:*
• .coding java - Java basics
• .coding cpp - C++ fundamentals
• .coding sql - Database queries

📚 *Concepts:*
• .coding algorithms - Algorithm basics
• .coding datastructures - Data structures
• .coding oop - Object-oriented programming

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Programming

🎯 Start your coding journey today!`

        return reply(codingMenu)
    }
    
    const topic = args[1].toLowerCase()
    const subtopic = args[2]?.toLowerCase()
    
    if (topic === 'python') {
        if (!subtopic) {
            const pythonText = `🐍 *PYTHON PROGRAMMING*

✨ *Why Python?*
• Easy to learn and read
• Powerful and versatile
• Great for beginners
• Used in AI, web dev, data science

🔤 *Basic Syntax:*
\`\`\`python
# This is a comment
print("Hello, World!")

# Variables
name = "Alice"
age = 25
height = 5.6

# Simple function
def greet(name):
    return f"Hello, {name}!"

# Using the function
message = greet("Bob")
print(message)
\`\`\`

📝 *Key Concepts:*
• Indentation matters (use spaces/tabs consistently)
• Variables don't need type declaration
• Functions use 'def' keyword
• Strings can use single or double quotes

🎯 *Try This:*
Create a simple calculator that adds two numbers!

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Python Course`

            return reply(pythonText)
        }
        
        if (subtopic === 'variables') {
            const variablesText = `🐍 *PYTHON VARIABLES*

📊 *Data Types:*

🔢 *Numbers:*
\`\`\`python
# Integers
age = 25
score = 100

# Floats (decimals)
price = 19.99
temperature = 98.6
\`\`\`

🔤 *Strings:*
\`\`\`python
name = "Alice"
message = 'Hello World'
long_text = """This is a
multi-line string"""
\`\`\`

✅ *Booleans:*
\`\`\`python
is_student = True
is_adult = False
\`\`\`

📋 *Lists:*
\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True]
\`\`\`

🗂️ *Dictionaries:*
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
\`\`\`

💡 *Pro Tips:*
• Variable names should be descriptive
• Use snake_case for variable names
• Variables are case-sensitive

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Python Variables`

            return reply(variablesText)
        }
    }
    
    if (topic === 'html') {
        const htmlText = `🌐 *HTML BASICS*

📝 *What is HTML?*
HyperText Markup Language - the structure of web pages

🏗️ *Basic Structure:*
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome!</h1>
    <p>This is a paragraph.</p>
    <a href="https://example.com">Click here</a>
</body>
</html>
\`\`\`

🏷️ *Common Tags:*
• \`<h1>\` to \`<h6>\` - Headings
• \`<p>\` - Paragraphs
• \`<a>\` - Links
• \`<img>\` - Images
• \`<div>\` - Containers
• \`<span>\` - Inline elements

🎨 *Attributes:*
• \`id="unique-name"\` - Unique identifier
• \`class="style-name"\` - CSS styling
• \`src="image.jpg"\` - Image source
• \`href="link.html"\` - Link destination

💡 *Best Practices:*
• Always close your tags
• Use semantic HTML
• Keep code organized and indented
• Validate your HTML

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Web Development`

        return reply(htmlText)
    }
    
    const generalText = `💻 *PROGRAMMING BASICS*

🎯 *What is Programming?*
Writing instructions for computers to solve problems and automate tasks.

🧠 *Core Concepts:*

1️⃣ *Variables:* Store data
2️⃣ *Functions:* Reusable code blocks  
3️⃣ *Loops:* Repeat actions
4️⃣ *Conditions:* Make decisions
5️⃣ *Data Structures:* Organize information

🌟 *Popular Languages:*
• Python - Easy to learn, great for beginners
• JavaScript - Web development
• Java - Enterprise applications
• C++ - System programming
• Swift - iOS app development

💡 *Programming Logic:*
1. Understand the problem
2. Break it into smaller steps
3. Write code to solve each step
4. Test and debug
5. Optimize and improve

🚀 *Getting Started:*
• Choose a language (Python recommended)
• Practice with small projects
• Build something you're interested in
• Join coding communities

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Programming

🎓 Every expert was once a beginner!`

    await reply(generalText)
}

// Study Tips
async function studyTips({ reply, react }) {
    await react('📖')
    
    const tips = [
        {
            title: "The Pomodoro Technique",
            tip: "Study for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.",
            benefit: "Maintains focus and prevents mental fatigue."
        },
        {
            title: "Active Recall",
            tip: "Test yourself regularly instead of just re-reading notes. Use flashcards, practice problems, or explain concepts out loud.",
            benefit: "Strengthens memory and identifies knowledge gaps."
        },
        {
            title: "Spaced Repetition",
            tip: "Review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks, 1 month).",
            benefit: "Moves information from short-term to long-term memory."
        },
        {
            title: "The Feynman Technique",
            tip: "Explain complex concepts in simple terms as if teaching a child. If you can't explain it simply, you don't understand it well enough.",
            benefit: "Deepens understanding and reveals knowledge gaps."
        },
        {
            title: "Create a Study Environment",
            tip: "Designate a specific, organized, and distraction-free space for studying. Keep it consistent.",
            benefit: "Trains your brain to focus when in that environment."
        }
    ]
    
    const tip = tips[Math.floor(Math.random() * tips.length)]
    
    const studyText = `📖 *STUDY TIP*

💡 **${tip.title}**

📝 *How to do it:*
${tip.tip}

🎯 *Why it works:*
${tip.benefit}

🌟 *Additional Study Tips:*
• Get enough sleep (7-9 hours)
• Stay hydrated and eat brain-healthy foods
• Exercise regularly to improve cognitive function
• Use multiple senses when learning
• Form study groups for difficult subjects
• Practice mindfulness to reduce stress

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Study Coach

📚 Effective studying is about quality, not just quantity!`

    await reply(studyText)
}

// Language Learning
async function languageLearning({ args, reply, react }) {
    await react('🗣️')
    
    if (!args[1]) {
        const langMenu = `🗣️ *LANGUAGE LEARNING CENTER*

🌍 *Available Languages:*

🇪🇸 *Spanish:*
• .language spanish - Basic Spanish
• .language spanish greetings - Common greetings
• .language spanish numbers - Numbers 1-100

🇫🇷 *French:*
• .language french - Basic French
• .language french phrases - Useful phrases

🇩🇪 *German:*
• .language german - Basic German

🇯🇵 *Japanese:*
• .language japanese - Basic Japanese
• .language japanese hiragana - Hiragana alphabet

🇨🇳 *Chinese:*
• .language chinese - Basic Mandarin

📚 *Learning Tips:*
• .language tips - Language learning strategies
• .language practice - Practice methods

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Language School

🌟 Habla, parlez, sprechen... speak the world!`

        return reply(langMenu)
    }
    
    const language = args[1].toLowerCase()
    
    if (language === 'spanish') {
        const spanishText = `🇪🇸 *BASIC SPANISH*

👋 *Greetings:*
• Hola - Hello
• Buenos días - Good morning
• Buenas tardes - Good afternoon
• Buenas noches - Good evening/night
• Adiós - Goodbye
• Hasta luego - See you later

🗣️ *Basic Phrases:*
• ¿Cómo estás? - How are you?
• Muy bien - Very well
• Por favor - Please
• Gracias - Thank you
• De nada - You're welcome
• Lo siento - I'm sorry
• No hablo español - I don't speak Spanish

🔢 *Numbers 1-10:*
• Uno, dos, tres, cuatro, cinco
• Seis, siete, ocho, nueve, diez

👥 *Family:*
• Familia - Family
• Madre/Mamá - Mother/Mom
• Padre/Papá - Father/Dad
• Hermano/a - Brother/Sister
• Hijo/a - Son/Daughter

💡 *Grammar Tip:*
Spanish nouns have gender (masculine/feminine) and adjectives must agree!

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Spanish Course

¡Buena suerte! (Good luck!)`

        return reply(spanishText)
    }
    
    const generalText = `🗣️ *LANGUAGE LEARNING GUIDE*

🎯 *Why Learn Languages?*
• Improved cognitive function
• Better job opportunities
• Cultural understanding
• Travel experiences
• Personal growth

📚 *Effective Learning Methods:*

1️⃣ *Immersion:*
• Watch movies with subtitles
• Listen to music in target language
• Change device language settings

2️⃣ *Daily Practice:*
• 15-30 minutes daily consistency
• Use language learning apps
• Practice speaking aloud

3️⃣ *Active Learning:*
• Find conversation partners
• Join language exchange groups
• Practice writing in the language

4️⃣ *Grammar & Vocabulary:*
• Learn common phrases first
• Focus on high-frequency words
• Understand basic grammar patterns

🌟 *Pro Tips:*
• Don't fear making mistakes
• Start with languages similar to yours
• Set realistic goals
• Celebrate small victories
• Use spaced repetition for vocabulary

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Language Learning

🌍 Every language opens a new world!`

    await reply(generalText)
}