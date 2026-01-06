const express = require("express");
const {
  createQuiz,
  getQuiz,
  getAllQuizzes,
  updateQuiz,
  deleteQuiz,
  startQuizAPI,
  endQuizAPI,
  submitQuizAnswers,
  getQuizResults,
} = require("../controllers/quiz.controller");
const { authMiddleware, isTeacher } = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", getAllQuizzes);
router.get("/:id", getQuiz);

// Protected routes - Teacher only
router.post("/", authMiddleware, isTeacher, createQuiz);
router.put("/:id", authMiddleware, isTeacher, updateQuiz);
router.delete("/:id", authMiddleware, isTeacher, deleteQuiz);
router.post("/:id/start", authMiddleware, isTeacher, startQuizAPI);
router.post("/:id/end", authMiddleware, isTeacher, endQuizAPI);

// Protected routes - Any authenticated user
router.post("/:id/submit", authMiddleware, submitQuizAnswers);
router.get("/:id/results", authMiddleware, getQuizResults);

module.exports = router;
