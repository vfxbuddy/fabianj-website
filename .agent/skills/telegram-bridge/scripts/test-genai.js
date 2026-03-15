require('dotenv').config({ path: '../../../../.env.local' });
const { GoogleGenAI, Type } = require('@google/genai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.log("Error: GEMINI_API_KEY not found.");
    process.exit(1);
}

// Just initialize to verify the import works
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
console.log("SDK Load Success!");
