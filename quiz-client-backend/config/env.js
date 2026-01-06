require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  geminiKey: process.env.GEMINI_API_KEY,
};
