const { generateQuiz } = require("./gemini.service");
const { activeQuizzes } = require("../storage/quiz.storage");

// ✅ Hàm tạo mã 6 số
function generateQuizPin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createQuizService({ title, topic, duration }) {
  if (!title || !topic) {
    throw new Error("Missing required fields:  title, topic");
  }

  const questions = await generateQuiz(topic, 5);

  if (!questions || questions.length === 0) {
    throw new Error("No questions generated");
  }

  // ✅ Tạo ID duy nhất 6 số
  let quizId;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    quizId = generateQuizPin();
    attempts++;
  } while (activeQuizzes.has(quizId) && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    throw new Error("Failed to generate unique quiz ID");
  }

  const quiz = {
    id: quizId, // ✅ 6 chữ số
    title,
    duration: duration || 60,
    questions,
    createdAt: new Date().toISOString(),
    status: "active",
    participants: [],
  };

  console.log("📝 Quiz created:", {
    id: quiz.id,
    title: quiz.title,
    questionsCount: quiz.questions.length,
  });

  return quiz;
}

module.exports = { createQuizService };
