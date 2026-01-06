const quizSessions = require("../sessions/quiz.session");
const { calculateScore } = require("../services/scoring.service");

// ✅ Import hoặc tạo activeQuizzes Map
const activeQuizzes = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    // ✅ Lưu quiz vào activeQuizzes khi tạo
    socket.on("register-quiz", (quiz) => {
      console.log("💾 Registering quiz:", quiz.id);
      activeQuizzes.set(quiz.id, quiz);
      console.log("📦 Active quizzes:", Array.from(activeQuizzes.keys()));
    });

    socket.on("join-quiz", ({ quizId, userId }) => {
      console.log("👤 Student joined:", { quizId, userId });
      
      socket.join(`quiz_${quizId}`);

      let session = quizSessions.get(quizId);
      if (!session) {
        session = {
          participants: new Map(),
          submissions: new Map(),
        };
        quizSessions.set(quizId, session);
      }

      session.participants.set(userId, socket.id);
      
      // ✅ Gửi quiz data
      const quiz = activeQuizzes.get(quizId);
      if (quiz) {
        console.log("📤 Sending quiz data to student");
        socket.emit("quiz-data", quiz);
      } else {
        console.log("❌ Quiz not found:", quizId);
        socket.emit("error", { message: "Quiz not found" });
      }
    });

    socket.on("start-quiz", ({ quizId, duration }) => {
      console.log("🚀 start-quiz received:", { quizId, duration });

      if (!quizId) {
        console.log("❌ Missing quizId");
        return;
      }

      const quiz = activeQuizzes.get(quizId);
      if (!quiz) {
        console.log("❌ Quiz not found in activeQuizzes");
        return;
      }

      // ✅ Phát tới room cụ thể, không phải toàn bộ server
      io.to(`quiz_${quizId}`).emit("quiz-start", {
        quizId,
        duration,
        startTime: Date.now(),
      });

      console.log(`✅ quiz-start emitted to quiz_${quizId}`);
    });

    socket.on("submit-answer", ({ quizId, userId, answers }) => {
      console.log("📝 Answer submitted:", { quizId, userId });
      
      const session = quizSessions.get(quizId);
      if (!session) return;

      session.submissions.set(userId, answers);

      // ✅ Tính điểm ngay
      const score = calculateScore(answers);
      socket.emit("quiz-result", { score });
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};

function endQuiz(io, quizId) {
  const session = quizSessions.get(quizId);
  if (!session) return;

  for (const [userId, answers] of session.submissions) {
    const score = calculateScore(answers);
    const socketId = session.participants.get(userId);

    io.to(socketId).emit("quiz-result", { score });
  }

  quizSessions.delete(quizId);
}

module.exports.endQuiz = endQuiz;