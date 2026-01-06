const jwt = require("jsonwebtoken");
const { users } = require("../storage/user.storage");

// Secret key for JWT (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "quiz-master-secret-key-2024";
const JWT_EXPIRES_IN = "7d";

// Register new user
async function register(req, res) {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["teacher", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(
      (u) => u.email === email
    );

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const user = {
      id: generateUserId(),
      email,
      password, // In production, hash the password!
      name,
      role,
      createdAt: new Date().toISOString(),
    };

    users.set(user.id, user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Failed to register", details: err.message });
  }
}

// Login user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = Array.from(users.values()).find((u) => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to login", details: err.message });
  }
}

// Get user profile
async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error("Get profile error:", err);
    res
      .status(500)
      .json({ error: "Failed to get profile", details: err.message });
  }
}

// Update user profile
async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user
    if (name) user.name = name;
    if (email) {
      // Check if new email is already taken
      const emailExists = Array.from(users.values()).find(
        (u) => u.email === email && u.id !== userId
      );
      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" });
      }
      user.email = email;
    }

    users.set(userId, user);

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error("Update profile error:", err);
    res
      .status(500)
      .json({ error: "Failed to update profile", details: err.message });
  }
}

// Helper function to generate user ID
function generateUserId() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
