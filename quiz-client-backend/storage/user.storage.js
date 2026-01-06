// In-memory storage for users
const users = new Map();

// Create some default users for testing
const defaultUsers = [
  {
    id: "teacher_001",
    email: "teacher@quiz.com",
    password: "teacher123",
    name: "Teacher Demo",
    role: "teacher",
    createdAt: new Date().toISOString(),
  },
  {
    id: "student_001",
    email: "student@quiz.com",
    password: "student123",
    name: "Student Demo",
    role: "student",
    createdAt: new Date().toISOString(),
  },
];

// Initialize with default users
defaultUsers.forEach((user) => {
  users.set(user.id, user);
});

console.log("👥 Default users loaded:", users.size);

module.exports = { users };
