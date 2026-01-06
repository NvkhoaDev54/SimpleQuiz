const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiKey } = require("../config/env");

if (!geminiKey) {
  throw new Error("❌ Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(geminiKey);

function cleanJson(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function generateQuiz(topic, count = 5) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Create ${count} multiple-choice questions about "${topic}".

Rules:
- 4 options A,B,C,D
- Only ONE correct answer
- Return PURE JSON ONLY
- No markdown, no explanation

Format:
[
  {
    "question": "...",
    "options": {
      "A": "...",
      "B": "...",
      "C": "...",
      "D": "..."
    },
    "correct": "A"
  }
]
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    console.log("GEMINI RAW:", rawText);

    const cleanText = cleanJson(rawText);
    return JSON.parse(cleanText);
  } catch (err) {
    console.error("🔥 Gemini error:", err);
    throw new Error("Gemini generate failed");
  }
}

module.exports = { generateQuiz };
