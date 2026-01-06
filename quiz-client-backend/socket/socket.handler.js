const quizSessions = require("../sessions/quiz.session");
const { calculateScore } = require("../services/scoring.service");
const { activeQuizzes } = require("../storage/quiz.storage");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    // ✅ Join quiz
    socket.on("join-quiz", ({ quizId, userId, userName }) => {
      console.log("👤 Join:", { quizId, userId, userName });

      const quiz = activeQuizzes.get(quizId);
      if (!quiz) {
        socket.emit("error", { message: "Quiz not found" });
        return;
      }

      socket.join(`quiz_${quizId}`);

      let session = quizSessions.get(quizId);
      if (!session) {
        session = {
          participants: new Map(),
          submissions: new Map(),
          startTime: null,
        };
        quizSessions.set(quizId, session);
      }

      session.participants.set(userId, {
        socketId: socket.id,
        userName,
        joinedAt: Date.now(),
      });

      // Broadcast participant joined
      io.to(`quiz_${quizId}`).emit("participant-joined", {
        userId,
        userName,
        totalParticipants: session.participants.size,
      });

      socket.emit("quiz-data", quiz);
    });

    // ✅ Start quiz
    socket.on("start-quiz", ({ quizId, duration }) => {
      console.log("🚀 Start quiz:", { quizId, duration });

      const quiz = activeQuizzes.get(quizId);
      const session = quizSessions.get(quizId);

      if (!quiz || !session) {
        socket.emit("error", { message: "Quiz not found" });
        return;
      }

      const startTime = Date.now();
      session.startTime = startTime;

      io.to(`quiz_${quizId}`).emit("quiz-start", {
        quizId,
        duration: duration || quiz.duration,
        startTime,
      });

      // Auto-end after duration
      setTimeout(() => {
        endQuiz(io, quizId);
      }, (duration || quiz.duration) * 60 * 1000);
    });

    // ✅ Submit answer (real-time)
    socket.on("submit-answer", ({ quizId, userId, questionIndex, answer }) => {
      const session = quizSessions.get(quizId);
      if (!session) return;

      let userAnswers = session.submissions.get(userId) || [];
      userAnswers[questionIndex] = { selected: answer, timestamp: Date.now() };
      session.submissions.set(userId, userAnswers);
    });

    // ✅ Submit full quiz
    socket.on("submit-quiz", ({ quizId, userId, answers }) => {
      const session = quizSessions.get(quizId);
      const quiz = activeQuizzes.get(quizId);

      if (!session || !quiz) {
        socket.emit("error", { message: "Quiz not found" });
        return;
      }

      session.submissions.set(userId, answers);

      const score = calculateScore(answers, quiz.questions);
      const result = {
        userId,
        score,
        totalQuestions: quiz.questions.length,
        percentage: ((score / quiz.questions.length) * 100).toFixed(1),
        answers,
      };

      socket.emit("quiz-result", result);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

function endQuiz(io, quizId) {
  const session = quizSessions.get(quizId);
  const quiz = activeQuizzes.get(quizId);

  if (!session || !quiz) return;

  io.to(`quiz_${quizId}`).emit("quiz-ended", {
    quizId,
    message: "Time's up!",
  });

  console.log(`⏱️ Quiz ${quizId} ended`);
}

module.exports.endQuiz = endQuiz;
