import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize GoogleGenAI server-side with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;

const getAIClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health and AI status endpoint
app.get('/api/ai/status', (_req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    hasApiKey: hasKey,
    recommendedModel: 'gemini-3.8-flash',
  });
});

// Secure Server-Side Gemini Chat API Endpoint
app.post('/api/ai/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history, studentProfile } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error: 'GEMINI_API_KEY is missing on the server. Please configure it in Settings > Secrets.',
      });
      return;
    }

    const ai = getAIClient();

    // Build personalized placement mentor system instruction
    const profileContext = studentProfile ? `
CURRENT STUDENT PROFILE (Use this actual context in your responses):
- Name: ${studentProfile.name || 'Student'}
- College: ${studentProfile.college || 'Engineering Institute'}
- Degree & Branch: ${studentProfile.degree || 'B.Tech'} in ${studentProfile.branch || 'Computer Science'}
- Academic Year: ${studentProfile.currentYear || 'Final Year'}
- CGPA: ${studentProfile.cgpa || '8.5'} / 10.0
- Target Package: ${studentProfile.targetPackage || '18 - 25 LPA'}
- Target Companies: ${(studentProfile.targetCompanies || []).join(', ')}
- Preferred Roles: ${(studentProfile.preferredRoles || []).join(', ')}
- Placement Readiness Score: ${studentProfile.readinessScore || 74}/100
- Weak Skills (Highest Priority Gaps): ${(studentProfile.weakSkills || []).map((s: any) => s.name || s).join(', ') || 'Dynamic Programming, B-Tree Indexing'}
- Strong Skills: ${(studentProfile.strongSkills || []).map((s: any) => s.name || s).join(', ') || 'Java, OOP, SQL Queries'}
- Solved Problems (LeetCode/GfG): ${studentProfile.leetcodeCount || 280}+
- Preparation Streak: ${studentProfile.streakDays || 14} days
` : '';

    const systemInstruction = `You are the Lead Technical Placement Mentor and Career Coach at SMART PLACEMENT TRACKER.
Tagline: "Your Skills. Your Roadmap. Your Dream Placement."

YOUR ROLE & TONE:
- You are a genuine, friendly, highly intelligent mentor who talks naturally and conversationally like an experienced senior software engineer from Google or Amazon.
- When the student says "Hii", "Hello", or casual greetings, greet them warmly and personally (e.g. "Hey ${studentProfile?.name || 'there'}! Great to see you. How is your placement prep going today?"). Do NOT dump unprompted generic advice or canned scripts on greetings.
- Answer the student's exact question thoughtfully, directly, and specifically. Never return the same answer to different questions.

${profileContext}

TEACHING & MENTORING RULES:
1. When asked to teach a concept (e.g., "Teach me Java", "Explain Dijkstra", "What is ACID?"):
   - Step 1: Explain the concept in clear, crystal-simple language with real-world analogy.
   - Step 2: Provide a practical, clean, modern code snippet (Java, C++, or Python).
   - Step 3: Explain the code line-by-line with edge cases.
   - Step 4: Share a real campus interview practice question (Easy/Medium).
   - Step 5: Check their understanding with a quick interactive follow-up question.

2. When asked for DSA problems (e.g., "Give me DSA questions"):
   - Provide relevant, high-frequency interview questions matching their target companies and package.
   - Include difficulty level (Easy/Medium/Hard), core algorithmic pattern (Sliding Window, Two Pointers, BFS, DP), hints, and time/space complexity analysis.

3. When asked for roadmap advice (e.g., "I want a 20 LPA package", "Create my roadmap"):
   - Review their actual profile, CGPA, and weak skills.
   - Provide an actionable, week-by-week timeline focusing on their highest-yield blindspots.

4. Formatting:
   - Use clean Markdown with bolding, bullet points, and syntax-highlighted code blocks.
   - Keep answers well-structured and easy to read on mobile and desktop screens.`;

    // Format chat history into contents array for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-8)) { // keep last 8 turns for context window
        if (item.sender === 'user' || item.role === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text || item.content || '' }] });
        } else if (item.sender === 'assistant' || item.role === 'model') {
          contents.push({ role: 'model', parts: [{ text: item.text || item.content || '' }] });
        }
      }
    }

    // Add current user prompt
    contents.push({ role: 'user', parts: [{ text: message }] });

    // Order models starting with fastest, highly-available models
    const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let lastError: any = null;
    let generatedText = '';
    let usedModel = '';

    for (const model of modelsToTry) {
      try {
        console.log(`[AI Mentor] Calling model: ${model}`);
        // 12-second timeout per model to prevent client hangs on temporary spikes
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Request timed out after 12s on ${model}`)), 12000)
        );

        const apiCallPromise = ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
          },
        });

        const response: any = await Promise.race([apiCallPromise, timeoutPromise]);

        if (response && response.text) {
          generatedText = response.text;
          usedModel = model;
          console.log(`[AI Mentor] Success with model: ${model} (${generatedText.length} chars)`);
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI Mentor] Model ${model} failed or timed out:`, err?.message || err);
        // Continue immediately to next model
      }
    }

    if (!generatedText) {
      console.error('All Gemini models failed:', lastError);
      res.status(502).json({
        error: `Gemini AI service unavailable: ${lastError?.message || 'Failed to generate response'}. Please verify your API key and network connection.`,
      });
      return;
    }

    res.json({
      text: generatedText,
      model: usedModel,
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/chat:', err);
    res.status(500).json({
      error: `Server error generating AI response: ${err?.message || 'Unknown error'}`,
    });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SMART PLACEMENT TRACKER server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
