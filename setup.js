#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧠 Elite Prompt Optimizer Setup');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from template...');

    if (fs.existsSync(envExamplePath)) {
        const envContent = fs.readFileSync(envExamplePath, 'utf8');
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully!');
    } else {
        console.log('❌ env.example file not found');
        process.exit(1);
    }
} else {
    console.log('✅ .env file already exists');
}

console.log('\n🔧 Next Steps:');
console.log('1. Edit .env file and add your OpenAI API key');
console.log('2. Run: npm run dev:full');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\n🚀 Happy prompting!'); 