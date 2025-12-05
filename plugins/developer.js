export const command = ['dev', 'code', 'debug', 'compile', 'format', 'minify', 'lint', 'test', 'deploy', 'git', 'api', 'database', 'regex', 'json', 'xml', 'base64', 'url', 'color', 'uuid', 'timestamp']

export async function execute({ command, args, reply, react }) {
    switch (command) {
        case 'dev':
            return developerCenter({ reply, react })
        
        case 'code':
            return codeAnalyzer({ args, reply, react })
        
        case 'debug':
            return debugHelper({ args, reply, react })
        
        case 'compile':
            return codeCompiler({ args, reply, react })
        
        case 'format':
            return codeFormatter({ args, reply, react })
        
        case 'minify':
            return codeMinifier({ args, reply, react })
        
        case 'lint':
            return codeLinter({ args, reply, react })
        
        case 'test':
            return testRunner({ args, reply, react })
        
        case 'deploy':
            return deploymentGuide({ reply, react })
        
        case 'git':
            return gitHelper({ args, reply, react })
        
        case 'api':
            return apiTester({ args, reply, react })
        
        case 'database':
            return databaseHelper({ args, reply, react })
        
        case 'regex':
            return regexTester({ args, reply, react })
        
        case 'json':
            return jsonValidator({ args, reply, react })
        
        case 'xml':
            return xmlValidator({ args, reply, react })
        
        case 'base64':
            return base64Converter({ args, reply, react })
        
        case 'url':
            return urlEncoder({ args, reply, react })
        
        case 'color':
            return colorConverter({ args, reply, react })
        
        case 'uuid':
            return uuidGenerator({ reply, react })
        
        case 'timestamp':
            return timestampConverter({ args, reply, react })
        
        default:
            return reply('❌ Unknown developer command!')
    }
}

// Developer Center
async function developerCenter({ reply, react }) {
    await react('💻')
    
    const devText = `💻 *DEVELOPER TOOLKIT*

🚀 *Code Development:*
• .code analyze [file] - Code analysis
• .debug [error] - Debug helper
• .format [code] - Format code
• .minify [code] - Minify code
• .lint [code] - Code linting
• .compile [language] [code] - Compile code

🧪 *Testing & Quality:*
• .test [framework] - Test runner
• .deploy - Deployment guide
• .api [method] [url] - API testing

🔧 *Utilities:*
• .regex [pattern] [text] - Regex tester
• .json [data] - JSON validator
• .xml [data] - XML validator
• .base64 [encode/decode] [text] - Base64 converter

🌐 *Web Development:*
• .url [encode/decode] [text] - URL encoding
• .color [hex/rgb] [value] - Color converter
• .uuid - Generate UUID
• .timestamp [date] - Timestamp converter

📊 *Database:*
• .database [query] - SQL helper
• .database design - Database design tips

🔄 *Version Control:*
• .git [command] - Git helper
• .git workflow - Git workflow guide

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Developer Suite

👨‍💻 Built by developers, for developers!`

    await reply(devText)
}

// Code Analyzer
async function codeAnalyzer({ args, reply, react }) {
    if (!args[1]) {
        return reply('❌ Please provide code to analyze!\n\nExample: .code analyze function hello() { return "world"; }')
    }
    
    await react('🔍')
    
    const code = args.slice(2).join(' ')
    const language = args[1].toLowerCase()
    
    // Simple code analysis
    const lines = code.split('\n').length
    const characters = code.length
    const words = code.split(/\s+/).length
    
    // Language-specific analysis
    let analysis = ''
    let suggestions = []
    
    if (language === 'javascript' || language === 'js') {
        const functions = (code.match(/function\s+\w+/g) || []).length
        const variables = (code.match(/(?:var|let|const)\s+\w+/g) || []).length
        const complexity = calculateComplexity(code)
        
        analysis = `🔍 *JAVASCRIPT CODE ANALYSIS*

📊 *Code Metrics:*
• Lines of Code: ${lines}
• Characters: ${characters.toLocaleString()}
• Words: ${words}
• Functions: ${functions}
• Variables: ${variables}
• Complexity Score: ${complexity}/10

💡 *Code Quality:*
${code.includes('console.log') ? '⚠️ Console.log detected - remove in production' : '✅ No console.log found'}
${code.includes('var ') ? '⚠️ Use let/const instead of var' : '✅ Modern variable declarations'}
${code.includes('==') && !code.includes('===') ? '⚠️ Use === instead of ==' : '✅ Strict equality used'}
${functions === 0 ? '⚠️ Consider breaking code into functions' : '✅ Functions detected'}

🚀 *Optimization Suggestions:*
• Use const for variables that don't change
• Add error handling with try/catch
• Consider using arrow functions
• Add JSDoc comments for documentation
• Use meaningful variable names`

        suggestions = [
            'Add type checking with TypeScript',
            'Implement proper error handling',
            'Use async/await for promises',
            'Add unit tests for functions',
            'Consider code splitting for large files'
        ]
    } else if (language === 'python' || language === 'py') {
        const functions = (code.match(/def\s+\w+/g) || []).length
        const classes = (code.match(/class\s+\w+/g) || []).length
        const imports = (code.match(/(?:import|from)\s+\w+/g) || []).length
        
        analysis = `🐍 *PYTHON CODE ANALYSIS*

📊 *Code Metrics:*
• Lines of Code: ${lines}
• Characters: ${characters.toLocaleString()}
• Functions: ${functions}
• Classes: ${classes}
• Imports: ${imports}

💡 *Python Standards:*
${code.includes('    ') ? '✅ Proper indentation (4 spaces)' : '⚠️ Use 4 spaces for indentation'}
${functions > 0 && code.includes('def ') ? '✅ Functions defined' : '⚠️ Consider using functions'}
${code.includes('"""') || code.includes("'''") ? '✅ Docstrings found' : '⚠️ Add docstrings for documentation'}

🚀 *Optimization Suggestions:*
• Follow PEP 8 style guide
• Use type hints for better code clarity
• Add docstrings to all functions
• Consider using list comprehensions
• Use f-strings for string formatting`

        suggestions = [
            'Run pylint or flake8 for style checking',
            'Add type annotations',
            'Write unit tests with pytest',
            'Use virtual environments',
            'Consider using dataclasses for data structures'
        ]
    } else {
        analysis = `🔍 *GENERAL CODE ANALYSIS*

📊 *Basic Metrics:*
• Lines of Code: ${lines}
• Characters: ${characters.toLocaleString()}
• Words: ${words}

💡 *General Tips:*
• Keep functions small and focused
• Use meaningful variable names
• Add comments for complex logic
• Follow language-specific conventions
• Write tests for your code`

        suggestions = [
            'Use version control (Git)',
            'Write clear documentation',
            'Follow coding standards',
            'Implement error handling',
            'Consider code reviews'
        ]
    }
    
    const analyzeText = `${analysis}

🎯 *Recommendations:*
${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Code Analyzer

🔧 Keep improving your code quality!`

    await reply(analyzeText)
}

// Complexity calculation helper
function calculateComplexity(code) {
    let complexity = 1 // Base complexity
    
    // Count control structures
    const patterns = [
        /if\s*\(/g,
        /else\s*if\s*\(/g,
        /for\s*\(/g,
        /while\s*\(/g,
        /switch\s*\(/g,
        /case\s+/g,
        /catch\s*\(/g,
        /\?\s*.*?\s*:/g // Ternary operators
    ]
    
    patterns.forEach(pattern => {
        const matches = code.match(pattern)
        if (matches) complexity += matches.length
    })
    
    return Math.min(complexity, 10)
}

// Git Helper
async function gitHelper({ args, reply, react }) {
    await react('📝')
    
    if (!args[1]) {
        const gitMenu = `📝 *GIT VERSION CONTROL*

🔧 *Basic Commands:*
• .git init - Initialize repository
• .git status - Check status
• .git add - Stage changes
• .git commit - Commit changes
• .git push - Push to remote
• .git pull - Pull from remote

🌟 *Advanced Commands:*
• .git branch - Branch management
• .git merge - Merge branches
• .git rebase - Rebase commits
• .git stash - Stash changes
• .git log - View history
• .git reset - Reset changes

📚 *Workflows:*
• .git workflow - Git workflow guide
• .git flow - Git flow strategy
• .git hooks - Git hooks setup

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Git Helper

🚀 Master version control!`

        return reply(gitMenu)
    }
    
    const command = args[1].toLowerCase()
    
    const gitCommands = {
        init: {
            command: 'git init',
            description: 'Initialize a new Git repository',
            example: `🔧 *GIT INIT*

📝 *Command:* \`git init\`

💡 *What it does:*
Creates a new Git repository in the current directory

🚀 *Usage:*
\`\`\`bash
mkdir my-project
cd my-project
git init
\`\`\`

📂 *What gets created:*
• .git/ directory (hidden)
• Repository metadata
• Version history tracking

🎯 *Next steps:*
1. Add files: \`git add .\`
2. Make first commit: \`git commit -m "Initial commit"\`
3. Add remote: \`git remote add origin <url>\`
4. Push to remote: \`git push -u origin main\``
        },
        status: {
            command: 'git status',
            description: 'Show working tree status',
            example: `📊 *GIT STATUS*

📝 *Command:* \`git status\`

💡 *What it shows:*
• Modified files
• Staged changes
• Untracked files
• Current branch
• Commits ahead/behind

🚀 *Example output:*
\`\`\`
On branch main
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
        modified:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   src/index.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        new-feature.js
\`\`\`

🎯 *Status meanings:*
• Green = Staged for commit
• Red = Modified but not staged
• Red = Untracked files`
        },
        workflow: {
            command: 'Git Workflow Guide',
            description: 'Best practices for Git workflows',
            example: `🔄 *GIT WORKFLOW GUIDE*

🚀 *Feature Branch Workflow:*

1️⃣ **Start with main branch:**
\`\`\`bash
git checkout main
git pull origin main
\`\`\`

2️⃣ **Create feature branch:**
\`\`\`bash
git checkout -b feature/new-feature
\`\`\`

3️⃣ **Make changes and commit:**
\`\`\`bash
git add .
git commit -m "Add new feature"
\`\`\`

4️⃣ **Push feature branch:**
\`\`\`bash
git push origin feature/new-feature
\`\`\`

5️⃣ **Create Pull Request:**
• Open PR on GitHub/GitLab
• Request code review
• Address feedback

6️⃣ **Merge and cleanup:**
\`\`\`bash
git checkout main
git pull origin main
git branch -d feature/new-feature
\`\`\`

💡 *Best Practices:*
• Small, focused commits
• Descriptive commit messages
• Regular pulls from main
• Code reviews before merging
• Delete merged branches`
        }
    }
    
    const gitCommand = gitCommands[command]
    if (!gitCommand) {
        return reply('❌ Git command not found! Use .git to see available commands.')
    }
    
    const gitText = `${gitCommand.example}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Git Helper`

    await reply(gitText)
}

// Regex Tester
async function regexTester({ args, reply, react }) {
    if (args.length < 3) {
        return reply('❌ Please provide pattern and text!\n\nExample: .regex \\d+ "I have 123 apples"')
    }
    
    await react('🔍')
    
    const pattern = args[1]
    const text = args.slice(2).join(' ').replace(/['"]/g, '')
    
    try {
        const regex = new RegExp(pattern, 'gi')
        const matches = text.match(regex) || []
        const isValid = true
        
        // Get match positions
        let matchDetails = []
        let index = 0
        let match
        const globalRegex = new RegExp(pattern, 'gi')
        
        while ((match = globalRegex.exec(text)) !== null) {
            matchDetails.push({
                match: match[0],
                index: match.index,
                length: match[0].length
            })
            
            if (!globalRegex.global) break
        }
        
        const regexText = `🔍 *REGEX TESTER*

📝 *Pattern:* \`${pattern}\`
📄 *Text:* "${text}"

${isValid ? '✅' : '❌'} *Pattern Status:* ${isValid ? 'Valid' : 'Invalid'}
🎯 *Matches Found:* ${matches.length}

${matches.length > 0 ? `📋 *Match Results:*
${matchDetails.map((m, i) => `${i + 1}. "${m.match}" at position ${m.index}`).join('\n')}

🔤 *All Matches:* [${matches.join(', ')}]` : '📭 No matches found'}

💡 *Pattern Explanation:*
• \\d = Any digit (0-9)
• \\w = Any word character (a-z, A-Z, 0-9, _)
• \\s = Any whitespace character
• + = One or more occurrences
• * = Zero or more occurrences
• ? = Zero or one occurrence
• [] = Character class
• () = Capturing group
• | = OR operator

🎯 *Common Patterns:*
• Email: \`^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\`
• Phone: \`^\\+?[1-9]\\d{1,14}$\`
• URL: \`https?://[\\w.-]+\\.[a-zA-Z]{2,}[/\\w.-]*\`
• Date: \`\\d{4}-\\d{2}-\\d{2}\`

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Regex Tester`

        await reply(regexText)
        
    } catch (error) {
        await reply(`❌ Invalid regex pattern: ${error.message}`)
    }
}

// JSON Validator
async function jsonValidator({ args, reply, react }) {
    if (!args[1]) {
        return reply('❌ Please provide JSON to validate!\n\nExample: .json {"name": "John", "age": 30}')
    }
    
    await react('📋')
    
    const jsonString = args.slice(1).join(' ')
    
    try {
        const parsed = JSON.parse(jsonString)
        const formatted = JSON.stringify(parsed, null, 2)
        const size = new Blob([jsonString]).size
        const keys = countJsonKeys(parsed)
        
        const jsonText = `📋 *JSON VALIDATOR*

✅ *Status:* Valid JSON

📊 *Statistics:*
• Size: ${size} bytes
• Total Keys: ${keys}
• Type: ${Array.isArray(parsed) ? 'Array' : typeof parsed}

🎨 *Formatted JSON:*
\`\`\`json
${formatted.length > 1000 ? formatted.substring(0, 1000) + '...' : formatted}
\`\`\`

💡 *JSON Tips:*
• Use double quotes for strings
• No trailing commas
• No comments allowed
• Keys must be strings
• Values: string, number, boolean, null, object, array

🔧 *Tools:*
• .json minify - Minify JSON
• .json format - Format JSON
• .json validate - Validate JSON structure

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD JSON Validator`

        await reply(jsonText)
        
    } catch (error) {
        const errorLine = getJsonErrorLine(jsonString, error.message)
        
        await reply(`❌ *INVALID JSON*

🚨 *Error:* ${error.message}
📍 *Location:* ${errorLine ? `Line ${errorLine}` : 'Unknown'}

🔧 *Common Issues:*
• Missing quotes around strings
• Trailing commas
• Single quotes instead of double quotes
• Unclosed brackets or braces
• Invalid escape sequences

💡 *Fix suggestions:*
• Check for unclosed brackets
• Ensure all strings use double quotes
• Remove trailing commas
• Validate escape sequences`)
    }
}

// Helper function to count JSON keys
function countJsonKeys(obj) {
    if (typeof obj !== 'object' || obj === null) return 0
    if (Array.isArray(obj)) {
        return obj.reduce((sum, item) => sum + countJsonKeys(item), 0)
    }
    return Object.keys(obj).length + Object.values(obj).reduce((sum, value) => sum + countJsonKeys(value), 0)
}

// Helper function to get error line
function getJsonErrorLine(jsonString, errorMessage) {
    const match = errorMessage.match(/position (\d+)/)
    if (match) {
        const position = parseInt(match[1])
        const lines = jsonString.substring(0, position).split('\n')
        return lines.length
    }
    return null
}

// UUID Generator
async function uuidGenerator({ reply, react }) {
    await react('🆔')
    
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0
            const v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }
    
    const uuid1 = generateUUID()
    const uuid2 = generateUUID()
    const uuid3 = generateUUID()
    
    const uuidText = `🆔 *UUID GENERATOR*

✨ *Generated UUIDs:*

🎯 **UUID 1:** \`${uuid1}\`
🎯 **UUID 2:** \`${uuid2}\`
🎯 **UUID 3:** \`${uuid3}\`

💡 *UUID Information:*
• **Version:** 4 (Random)
• **Format:** 8-4-4-4-12 hex digits
• **Total Length:** 36 characters
• **Uniqueness:** ~5.3 x 10³⁶ possible values

🔧 *Common Uses:*
• Database primary keys
• Session identifiers
• File names
• API tokens
• Distributed system IDs

📚 *UUID Versions:*
• **v1:** Timestamp + MAC address
• **v2:** DCE Security
• **v3:** Namespace + MD5 hash
• **v4:** Random (most common)
• **v5:** Namespace + SHA-1 hash

🎯 *Best Practices:*
• Use v4 for most applications
• Store as string or binary
• Index UUID columns in databases
• Consider shortened UUIDs for URLs

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD UUID Generator

🔑 Unique identifiers made easy!`

    await reply(uuidText)
}