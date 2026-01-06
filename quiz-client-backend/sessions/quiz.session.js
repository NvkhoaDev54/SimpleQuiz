const quizSessions = new Map();
/*
quizId => {
  startTime,
  duration,
  participants: Map(userId => socketId),
  submissions: Map(userId => answers)
}
*/
module.exports = quizSessions;
