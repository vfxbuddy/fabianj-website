require('dotenv').config({ path: '../../../../.env.local' });
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const { execSync } = require('child_process');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set.");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const userPrompt = process.argv[2] || "What is 2+2?";

const tools = [
  {
    functionDeclarations: [
      {
        name: 'run_command',
        description: 'Run a Windows PowerShell command (like dir /s /b, etc.) to explore the workspace.',
        parameters: { type: "object", properties: { command: { type: "string" } }, required: ['command'] }
      },
      {
        name: 'read_file_content',
        description: 'Read a file in the workspace. Use absolute paths or paths relative to C:\\Antigravity\\Website.',
        parameters: { type: "object", properties: { filePath: { type: "string" } }, required: ['filePath'] }
      },
      {
        name: 'replace_in_file',
        description: 'Replace a specific exact string in a file with new content. Use this to edit files.',
        parameters: { type: "object", properties: { filePath: { type: "string" }, targetContent: { type: "string" }, replacementContent: { type: "string" } }, required: ['filePath', 'targetContent', 'replacementContent'] }
      }
    ]
  }
];

async function run() {
  console.log("🧠 Agent started. Prompt:", userPrompt);
  
  let messages = [
    { role: 'user', parts: [{ text: userPrompt }] }
  ];

  try {
      for (let i = 0; i < 15; i++) {
        let response = await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: messages,
           config: {
             tools,
             systemInstruction: "You are an autonomous AI coding assistant. Fulfill the user request. Rules:\n1. Use run_command to find files.\n2. Use read_file_content to read them.\n3. To modify a file, use replace_in_file by providing the EXACT string to replace and the new string. Be extremely precise.\n4. Do NOT read the same file multiple times.\n5. Once you have written the changes, STOP by returning a normal text response explaining what you did."
           }
        });

        if (!response.candidates || response.candidates.length === 0) {
           console.log("No response from model.");
           break;
        }

        const modelMessage = response.candidates[0].content;
        messages.push(modelMessage);

        if (response.functionCalls && response.functionCalls.length > 0) {
          let funcParts = [];
          for (let call of response.functionCalls) {
            let name = call.name;
            let args = call.args;
            let resultStr = "";
            try {
              if (name === 'run_command') {
                 console.log(`[Agent] Running command: ${args.command}`);
                 resultStr = "Output: " + execSync(args.command, { cwd: 'C:\\Antigravity\\Website' }).toString();
              } else if (name === 'read_file_content') {
                 console.log(`[Agent] Reading file: ${args.filePath}`);
                 resultStr = fs.readFileSync(path.resolve('C:\\Antigravity\\Website', args.filePath), 'utf8');
              } else if (name === 'replace_in_file') {
                 console.log(`[Agent] Replacing text in: ${args.filePath}`);
                 const fullPath = path.resolve('C:\\Antigravity\\Website', args.filePath);
                 let content = fs.readFileSync(fullPath, 'utf8');
                 if (content.includes(args.targetContent)) {
                     content = content.replace(args.targetContent, args.replacementContent);
                     fs.writeFileSync(fullPath, content);
                     resultStr = "Success. File modified.";
                 } else {
                     resultStr = "Error: targetContent not found in file. Please read the file again and provide the EXACT targetContent string.";
                 }
              }
            } catch (e) {
              resultStr = e.message;
            }
            funcParts.push({
               functionResponse: { name, response: { result: resultStr.substring(0, 10000) } }
            });
          }
          
          messages.push({ role: 'user', parts: funcParts });
          
          // --- THROTTLE ---
          // Gemini Free Tier allows 15 requests per minute (1 every 4s)
          console.log("[Agent] Throttling for 6 seconds to respect API limits...");
          await new Promise(r => setTimeout(r, 6000));

        } else {
          console.log("\n=== AGENT RESPONSE ===");
          console.log(response.text);
          break;
        }
      }
  } catch(e) {
      console.error("\n=== AGENT ERROR ===");
      console.error(e);
  }
}

run();

