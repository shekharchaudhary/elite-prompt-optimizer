# 🧠 Elite Prompt Optimizer MVP

Transform vague or low-quality user prompts into elite, intentional prompts using AI and MCP (Model Context Protocol). This web app uses agentic layers to analyze, expand, and rewrite user input into high-quality prompts.

## ✨ Features

- **3-Tier Agent System**: Analyzer → Expander → Rewriter
- **Professional UI**: Modern, responsive design with Tailwind CSS
- **Real-time Optimization**: Instant prompt transformation
- **Before/After Comparison**: Visual transformation tracking
- **Optional Context**: Add audience, goal, and tone specifications
- **Copy-to-Clipboard**: Easy prompt copying functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development servers:**

   ```bash
   npm run dev:full
   ```

   This starts both the Next.js frontend (port 3000) and Express backend (port 3001).

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🏗️ Architecture

### Frontend (Next.js + React)

- **Modern UI**: Professional design with Tailwind CSS
- **Responsive Layout**: Works on desktop and mobile
- **Real-time Updates**: Live prompt optimization
- **Component Structure**:
  - `PromptInput`: User input with optional tags
  - `PromptOutput`: Display optimized prompt
  - `ComparisonView`: Before/after comparison
  - `Header`: Branding and navigation

### Backend (Node.js + Express)

- **API Endpoint**: `POST /api/enhance-prompt`
- **Agent Layers**: 3-tier optimization system
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin requests enabled

### Agent System

#### Layer A: Prompt Analyzer

- **Purpose**: Detect vagueness and classify missing elements
- **Output**: JSON with analysis results
- **Identifies**: Missing goal, audience, tone, style

#### Layer B: Intent Expander (MCP)

- **Purpose**: Suggest context when user doesn't specify
- **Input**: Vague prompt + optional user context
- **Output**: Suggested goal, tone, audience
- **MCP Integration**: Model Context Protocol for intelligent suggestions

#### Layer C: Prompt Rewriter

- **Purpose**: Transform input into elite prompt
- **Input**: Original prompt + expanded context
- **Output**: Optimized, specific, actionable prompt

## 📡 API Reference

### POST /api/enhance-prompt

Enhance a vague prompt into an elite prompt.

**Request Body:**

```json
{
  "prompt": "string (required)",
  "audience": "string (optional)",
  "goal": "string (optional)",
  "tone": "string (optional)"
}
```

**Response:**

```json
{
  "optimizedPrompt": "string",
  "explanation": "string",
  "analysis": {
    "isVague": "boolean",
    "missingElements": ["array"],
    "suggestedContext": "object"
  }
}
```

## 🎨 UI Components

### Input Section

- **Main Textarea**: Large input for user prompts
- **Optional Tags**: Audience, Goal, Tone fields
- **Submit Button**: "Make it Elite" with loading states
- **Example Prompts**: Quick reference examples

### Output Section

- **Elite Prompt Display**: Optimized prompt with copy functionality
- **Explanation**: Detailed transformation explanation
- **Loading States**: Professional loading animations

### Comparison View

- **Before/After**: Side-by-side comparison
- **Visual Indicators**: Color-coded improvements
- **Transformation Details**: Step-by-step explanation

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start Next.js frontend only
npm run server       # Start Express backend only
npm run dev:full     # Start both frontend and backend
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Project Structure

```
elite-prompt-optimizer/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── server/                 # Express backend
│   └── index.js           # Server with agent layers
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── README.md              # This file
```

## 🎯 Example Usage

### Input Examples

- `"make this sound better"`
- `"caption for my gym photo"`
- `"write something about AI"`

### Output Examples

- `"Rewrite this text as a concise, emotionally compelling Instagram caption for young entrepreneurs, maintaining authenticity while increasing engagement potential."`
- `"Write a bold, poetic caption that reflects strength, discipline, and inner power for a gym selfie targeting fitness enthusiasts and motivational content consumers."`

## 🔒 Environment Variables

Create a `.env` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

## 🚀 Deployment

### Vercel (Frontend)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Railway/Heroku (Backend)

1. Set environment variables
2. Deploy Express server
3. Update frontend API endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using Next.js, Express, OpenAI, and MCP**
