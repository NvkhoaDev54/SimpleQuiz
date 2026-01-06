function calculateScore(answers, questions) {
  if (!answers || !questions) {
    return {
      score: 0,
      correctAnswers: 0,
      totalQuestions: questions?.length || 0,
      percentage: 0,
    };
  }

  let correctAnswers = 0;
  const totalQuestions = questions.length;

  // Handle different answer formats
  if (Array.isArray(answers)) {
    // Array format: [{questionId, selected}]
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && answer.selected === question.correct) {
        correctAnswers++;
      }
    });
  } else if (typeof answers === "object") {
    // Object format: {questionId: selectedAnswer}
    Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        // Find the correct answer
        const correctOption = question.options?.find((opt) => opt.isCorrect);
        if (correctOption && correctOption.id === selectedAnswer) {
          correctAnswers++;
        }
      }
    });
  }

  const percentage =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const score = Math.round(percentage);

  return {
    score,
    correctAnswers,
    totalQuestions,
    percentage: parseFloat(percentage.toFixed(2)),
  };
}

module.exports = { calculateScore };
