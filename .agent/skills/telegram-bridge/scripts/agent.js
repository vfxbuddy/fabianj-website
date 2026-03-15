require('dotenv').config({ path: '../../../../.env.local' });
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = 'C:\\Antigravity\\Website';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const userPrompt = process.argv[2] || "What is 2+2?";

// Pre-built project map so the agent doesn't waste turns exploring
const PROJECT_MAP = `
PROJECT STRUCTURE (C:\\Antigravity\\Website\\src):
Pages:
  src/app/layout.tsx - Root layout (Navbar, Footer)
  src/app/page.tsx - Homepage
  src/app/contact/page.tsx - Contact page
  src/app/gallery/page.tsx - Gallery page
  src/app/resume/page.tsx - Resume page
  src/app/xr/page.tsx - XR page
Components:
  src/components/hero/Hero.tsx
  src/components/layout/Footer.tsx
  src/components/layout/GlobalGrid.tsx
  src/components/layout/InitialLoadWrapper.tsx
  src/components/layout/Navbar.tsx
  src/components/ui/BentoCard.tsx
  src/components/ui/FadeIn.tsx
  src/components/ui/LoadingScreen.tsx
  src/components/ui/NotionModal.tsx
  src/components/ui/PersonalLogo.tsx
  src/components/ui/StudioMarquee.tsx
  src/components/ui/TextReveal.tsx
Data:
  src/data/gallery.json
Styles:
  src/app/globals.css
`;

const SYSTEM_PROMPT = `You are an autonomous AI coding assistant for a Next.js website.
The project is at C:\\Antigravity\\Website.

${PROJECT_MAP}

RULES:
1. You already know the project structure above. Do NOT run dir commands to explore. Go straight to reading the relevant file.
2. Use read_file_content to read a file. NEVER read the same file twice.
3. Use replace_in_file to make surgical edits. Provide the EXACT string to find and the replacement.
4. After making your edit, IMMEDIATELY return a text response summarizing what you changed. Do NOT make any more tool calls.
5. Keep your final answer to 1-2 sentences max.
6. You have a MAXIMUM of 5 tool calls total. Use them wisely.`;

const tools = [
  {
    functionDeclarations: [
      {
        name: 'read_file_content',
        description: 'Read a file. Path is relative to C:\\\\Antigravity\\\\Website.',
        parameters: { type: "object", properties: { filePath: { type: "string" } }, required: ['filePath'] }
      },
      {
        name: 'replace_in_file',
        description: 'Replace an exact string in a file with new content. Path is relative to C:\\\\Antigravity\\\\Website.',
        parameters: {
          type: "object",
          properties: {
            filePath: { type: "string" },
            targetContent: { type: "string", description: "The EXACT string currently in the file to replace" },
            replacementContent: { type: "string", description: "The new string to put in its place" }
          },
          required: ['filePath', 'targetContent', 'replacementContent']
        }
      }
    ]
  }
];

async function run() {
  console.log("🧠 Agent started. Prompt:", userPrompt);
  
  const filesRead = new Set();
  let messages = [
    { role: 'user', parts: [{ text: userPrompt }] }
  ];

  const MAX_TURNS = 6;

  try {
    for (let turn = 0; turn < MAX_TURNS; turn++) {
      console.log(`[Agent] Turn ${turn + 1}/${MAX_TURNS}`);

      let response;
      // Retry loop for 429 rate limits
      for (let retry = 0; retry < 3; retry++) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: messages,
            config: { tools, systemInstruction: SYSTEM_PROMPT }
          });
          break; // success
        } catch (e) {
          if (e.status === 429 && retry < 2) {
            console.log(`[Agent] Rate limited. Waiting 10 seconds... (retry ${retry + 1}/3)`);
            await new Promise(r => setTimeout(r, 10000));
          } else {
            throw e;
          }
        }
      }

      if (!response || !response.candidates || response.candidates.length === 0) {
        console.log("No response from model.");
        break;
      }

      const modelMessage = response.candidates[0].content;
      messages.push(modelMessage);

      if (response.functionCalls && response.functionCalls.length > 0) {
        let funcParts = [];
        for (let call of response.functionCalls) {
          const { name, args } = call;
          let resultStr = "";
          try {
            if (name === 'read_file_content') {
              const fullPath = path.resolve(PROJECT_ROOT, args.filePath);
              if (filesRead.has(fullPath)) {
                resultStr = "ERROR: You already read this file. Use the content from before. Do NOT read it again.";
              } else {
                console.log(`[Agent] Reading: ${args.filePath}`);
                resultStr = fs.readFileSync(fullPath, 'utf8');
                filesRead.add(fullPath);
              }
            } else if (name === 'replace_in_file') {
              const fullPath = path.resolve(PROJECT_ROOT, args.filePath);
              console.log(`[Agent] Replacing in: ${args.filePath}`);
              let content = fs.readFileSync(fullPath, 'utf8');
              if (content.includes(args.targetContent)) {
                content = content.replace(args.targetContent, args.replacementContent);
                fs.writeFileSync(fullPath, content);
                resultStr = "SUCCESS: File modified. Now return a text summary of what you did. Do NOT make any more tool calls.";
              } else {
                resultStr = "ERROR: Target string not found in file. Double-check your targetContent for exact match including whitespace.";
              }
            }
          } catch (e) {
            resultStr = "ERROR: " + e.message;
          }
          funcParts.push({
            functionResponse: { name, response: { result: resultStr.substring(0, 8000) } }
          });
        }
        
        messages.push({ role: 'user', parts: funcParts });
        
        // Throttle between API calls
        await new Promise(r => setTimeout(r, 5000));

      } else {
        // Model returned text — we're done
        console.log("\n=== AGENT RESPONSE ===");
        console.log(response.text);
        return;
      }
    }

    // If we hit max turns, force a summary
    console.log("\n=== AGENT RESPONSE ===");
    console.log("I ran out of turns. The change may be partially applied. Please check.");

  } catch (e) {
    console.error("\n=== AGENT ERROR ===");
    if (e.status === 429) {
      console.log("Rate limit hit. Please wait 60 seconds and try again.");
    } else {
      console.error(e.message || e);
    }
  }
}

run();
