require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  geminiKey: process.env.GEMINI_API_KEY,
};
