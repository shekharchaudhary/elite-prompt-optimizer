const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Agent Layer A: Prompt Analyzer
async function analyzePrompt(prompt) {
    const systemPrompt = `You are a prompt analysis expert. Analyze the given prompt and determine if it's vague, under-specified, or missing intent. Identify what's missing from the following categories: goal, audience, output style, tone.

Respond with a JSON object containing:
{
  "isVague": boolean,
  "missingElements": ["goal", "audience", "tone", "style"],
  "analysis": "brief explanation of what's missing"
}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analyze this prompt: "${prompt}"` }
        ],
        temperature: 0.3,
    });

    try {
        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        return {
            isVague: true,
            missingElements: ["goal", "audience", "tone"],
            analysis: "Unable to parse analysis, assuming prompt needs improvement"
        };
    }
}

// Agent Layer B: Intent Expander (MCP powered)
async function expandIntent(prompt, userProvided = {}) {
    const systemPrompt = `You are an intent expansion expert. Given a vague input, suggest appropriate context elements. Use the user's provided context if available, otherwise make intelligent suggestions.

Respond with a JSON object containing:
{
  "goal": "suggested goal",
  "tone": "suggested tone", 
  "audience": "suggested audience",
  "reasoning": "brief explanation of suggestions"
}`;

    const userContext = Object.entries(userProvided)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Given the vague input: "${prompt}"${userContext ? `\nUser provided context: ${userContext}` : ''}\n\nSuggest appropriate goal, tone, and audience.` }
        ],
        temperature: 0.4,
    });

    try {
        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        return {
            goal: "create engaging content",
            tone: "professional and engaging",
            audience: "general audience",
            reasoning: "Default suggestions applied"
        };
    }
}

// Agent Layer C: Prompt Rewriter
async function rewritePrompt(prompt, context) {
    const systemPrompt = `You are an elite prompt optimization expert. Rewrite vague prompts into precise, elite-level prompts using the provided context.

Guidelines:
- Be specific and actionable
- Include clear intent and desired outcome
- Specify target audience and tone
- Make it professional and purposeful
- Return only the upgraded prompt, no explanations

Examples:
Input: "make this sound better"
Output: "Rewrite this text as a concise, emotionally compelling Instagram caption for young entrepreneurs, maintaining authenticity while increasing engagement potential."

Input: "caption for my gym photo"
Output: "Write a bold, poetic caption that reflects strength, discipline, and inner power for a gym selfie targeting fitness enthusiasts and motivational content consumers."`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            {
                role: "user", content: `Rewrite this vague prompt into a precise, elite-level prompt:

Input: "${prompt}"
Goal: "${context.goal}"
Tone: "${context.tone}"
Audience: "${context.audience}"

Return only the upgraded prompt.` }
        ],
        temperature: 0.3,
    });

    return response.choices[0].message.content.trim();
}

// Main API endpoint
app.post('/api/enhance-prompt', async (req, res) => {
    try {
        const { prompt, audience, goal, tone } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Step 1: Analyze the prompt
        const analysis = await analyzePrompt(prompt);

        // Step 2: Expand intent with user-provided context
        const userContext = { audience, goal, tone };
        const expandedIntent = await expandIntent(prompt, userContext);

        // Step 3: Rewrite the prompt
        const optimizedPrompt = await rewritePrompt(prompt, expandedIntent);

        // Step 4: Generate explanation
        const explanationPrompt = `Explain how the original prompt "${prompt}" was transformed into the elite prompt "${optimizedPrompt}". Focus on the specific improvements made and why they make the prompt more effective. Keep it concise and professional.`;

        const explanationResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: explanationPrompt }
            ],
            temperature: 0.4,
        });

        const explanation = explanationResponse.choices[0].message.content.trim();

        res.json({
            optimizedPrompt,
            explanation,
            analysis: {
                isVague: analysis.isVague,
                missingElements: analysis.missingElements,
                suggestedContext: expandedIntent
            }
        });

    } catch (error) {
        console.error('Error enhancing prompt:', error);
        res.status(500).json({
            error: 'Failed to enhance prompt',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Elite Prompt Optimizer API is running' });
});

app.listen(port, () => {
    console.log(`🚀 Elite Prompt Optimizer server running on port ${port}`);
    console.log(`📝 API endpoint: http://localhost:${port}/api/enhance-prompt`);
}); 