const { createQuizService } = require("../services/quiz.service");
const { activeQuizzes } = require("../storage/quiz.storage");
const { calculateScore } = require("../services/scoring.service");

async function createQuiz(req, res) {
  try {
    const quiz = await createQuizService(req.body);
    activeQuizzes.set(quiz.id, quiz);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
}

// Get quiz by ID
async function getQuiz(req, res) {
  try {
    const { id } = req.params;
    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
}

// Get all quizzes
async function getAllQuizzes(req, res) {
  try {
    const quizzes = Array.from(activeQuizzes.values());
    res.json({ total: quizzes.length, quizzes });
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
}

// Update quiz
async function updateQuiz(req, res) {
  try {
    const { id } = req.params;
    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Update quiz properties
    const updatedQuiz = {
      ...quiz,
      ...req.body,
      id: quiz.id, // Preserve original ID
      updatedAt: new Date().toISOString(),
    };

    activeQuizzes.set(id, updatedQuiz);
    res.json(updatedQuiz);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update quiz", details: err.message });
  }
}

// Delete quiz
async function deleteQuiz(req, res) {
  try {
    const { id } = req.params;
    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    activeQuizzes.delete(id);
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete quiz", details: err.message });
  }
}

// Start quiz (API endpoint)
async function startQuizAPI(req, res) {
  try {
    const { id } = req.params;
    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    quiz.status = "active";
    quiz.startedAt = new Date().toISOString();
    activeQuizzes.set(id, quiz);

    res.json({ message: "Quiz started", quiz });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to start quiz", details: err.message });
  }
}

// End quiz (API endpoint)
async function endQuizAPI(req, res) {
  try {
    const { id } = req.params;
    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    quiz.status = "ended";
    quiz.endedAt = new Date().toISOString();
    activeQuizzes.set(id, quiz);

    res.json({ message: "Quiz ended", quiz });
  } catch (err) {
    res.status(500).json({ error: "Failed to end quiz", details: err.message });
  }
}

// Submit quiz answers
async function submitQuizAnswers(req, res) {
  try {
    const { id } = req.params;
    const { userId, answers } = req.body;

    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (!userId || !answers) {
      return res.status(400).json({ error: "Missing userId or answers" });
    }

    // Calculate score
    const result = calculateScore(answers, quiz.questions);

    // Store submission
    if (!quiz.submissions) {
      quiz.submissions = [];
    }

    const submission = {
      userId,
      answers,
      score: result.score,
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      submittedAt: new Date().toISOString(),
    };

    quiz.submissions.push(submission);
    activeQuizzes.set(id, quiz);

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to submit answers", details: err.message });
  }
}

// Get quiz results
async function getQuizResults(req, res) {
  try {
    const { id } = req.params;
    const quiz = activeQuizzes.get(id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const results = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      totalSubmissions: quiz.submissions?.length || 0,
      submissions: quiz.submissions || [],
    };

    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get results", details: err.message });
  }
}

module.exports = {
  createQuiz,
  getQuiz,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
  startQuizAPI,
  endQuizAPI,
  submitQuizAnswers,
  getQuizResults,
};
