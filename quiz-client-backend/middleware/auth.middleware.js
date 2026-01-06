const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "quiz-master-secret-key-2024";

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Middleware to check if user is a teacher
function isTeacher(req, res, next) {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ error: "Access denied. Teachers only." });
  }
  next();
}

// Middleware to check if user is a student
function isStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Access denied. Students only." });
  }
  next();
}

module.exports = {
  authMiddleware,
  isTeacher,
  isStudent,
};
