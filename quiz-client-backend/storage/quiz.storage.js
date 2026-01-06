// storage/quiz.storage.js
const activeQuizzes = new Map();

console.log("🏗️ Storage module loaded. Instance ID:", Date.now());

// Debug wrapper
const originalSet = activeQuizzes.set.bind(activeQuizzes);
const originalGet = activeQuizzes.get.bind(activeQuizzes);

activeQuizzes.set = function (key, value) {
  console.log("📥 SET called:", key, "Total after:", activeQuizzes.size + 1);
  return originalSet(key, value);
};

activeQuizzes.get = function (key) {
  const result = originalGet(key);
  console.log(
    "📤 GET called:",
    key,
    "Found:",
    !!result,
    "Total:",
    activeQuizzes.size
  );
  console.log("📋 All keys:", Array.from(activeQuizzes.keys()));
  return result;
};

module.exports = { activeQuizzes };
