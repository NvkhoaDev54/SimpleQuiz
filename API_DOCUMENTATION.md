# API Documentation - QuizMaster Backend

Base URL: `http://localhost:3001`

## Authentication Endpoints

### 1. Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "teacher" // or "student"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_1234567890_abc123",
    "email": "teacher@example.com",
    "name": "John Doe",
    "role": "teacher",
    "createdAt": "2024-01-06T10:00:00.000Z"
  }
}
```

### 2. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "teacher@quiz.com",
  "password": "teacher123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "teacher_001",
    "email": "teacher@quiz.com",
    "name": "Teacher Demo",
    "role": "teacher",
    "createdAt": "2024-01-06T10:00:00.000Z"
  }
}
```

### 3. Get Profile (Protected)

```http
GET /api/auth/profile
Authorization: Bearer <token>
```

**Response:**

```json
{
  "id": "teacher_001",
  "email": "teacher@quiz.com",
  "name": "Teacher Demo",
  "role": "teacher",
  "createdAt": "2024-01-06T10:00:00.000Z"
}
```

### 4. Update Profile (Protected)

```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "email": "newemail@example.com"
}
```

---

## Quiz Endpoints

### 1. Get All Quizzes (Public)

```http
GET /api/quizzes
```

**Response:**

```json
{
  "total": 5,
  "quizzes": [
    {
      "id": "123456",
      "title": "JavaScript Basics",
      "duration": 60,
      "status": "active",
      "questions": [...],
      "createdAt": "2024-01-06T10:00:00.000Z",
      "participants": []
    }
  ]
}
```

### 2. Get Quiz by ID (Public)

```http
GET /api/quizzes/:id
```

**Response:**

```json
{
  "id": "123456",
  "title": "JavaScript Basics",
  "duration": 60,
  "status": "active",
  "questions": [
    {
      "id": "q1",
      "text": "What is JavaScript?",
      "options": [
        { "id": "a", "text": "A programming language", "isCorrect": true },
        { "id": "b", "text": "A coffee", "isCorrect": false }
      ]
    }
  ],
  "createdAt": "2024-01-06T10:00:00.000Z",
  "participants": []
}
```

### 3. Create Quiz (Teacher Only)

```http
POST /api/quizzes
Authorization: Bearer <teacher_token>
Content-Type: application/json

{
  "title": "JavaScript Advanced",
  "topic": "JavaScript Programming",
  "duration": 60
}
```

**Response:**

```json
{
  "id": "654321",
  "title": "JavaScript Advanced",
  "duration": 60,
  "questions": [
    // Auto-generated questions by Gemini AI
  ],
  "createdAt": "2024-01-06T10:00:00.000Z",
  "status": "active",
  "participants": []
}
```

### 4. Update Quiz (Teacher Only)

```http
PUT /api/quizzes/:id
Authorization: Bearer <teacher_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "duration": 90,
  "questions": [...]
}
```

### 5. Delete Quiz (Teacher Only)

```http
DELETE /api/quizzes/:id
Authorization: Bearer <teacher_token>
```

**Response:**

```json
{
  "message": "Quiz deleted successfully"
}
```

### 6. Start Quiz (Teacher Only)

```http
POST /api/quizzes/:id/start
Authorization: Bearer <teacher_token>
```

**Response:**

```json
{
  "message": "Quiz started",
  "quiz": {
    "id": "123456",
    "status": "active",
    "startedAt": "2024-01-06T10:00:00.000Z"
  }
}
```

### 7. End Quiz (Teacher Only)

```http
POST /api/quizzes/:id/end
Authorization: Bearer <teacher_token>
```

**Response:**

```json
{
  "message": "Quiz ended",
  "quiz": {
    "id": "123456",
    "status": "ended",
    "endedAt": "2024-01-06T11:00:00.000Z"
  }
}
```

### 8. Submit Quiz Answers (Authenticated)

```http
POST /api/quizzes/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "student_001",
  "answers": {
    "q1": "a",
    "q2": "b",
    "q3": "c"
  }
}
```

**Response:**

```json
{
  "score": 80,
  "correctAnswers": 4,
  "totalQuestions": 5,
  "percentage": 80.0
}
```

### 9. Get Quiz Results (Authenticated)

```http
GET /api/quizzes/:id/results
Authorization: Bearer <token>
```

**Response:**

```json
{
  "quizId": "123456",
  "quizTitle": "JavaScript Basics",
  "totalSubmissions": 10,
  "submissions": [
    {
      "userId": "student_001",
      "answers": {...},
      "score": 80,
      "correctAnswers": 4,
      "totalQuestions": 5,
      "submittedAt": "2024-01-06T10:30:00.000Z"
    }
  ]
}
```

---

## Socket.io Events

### Client → Server

#### 1. Register Quiz

```javascript
socket.emit('register-quiz', {
  id: "123456",
  title: "JavaScript Basics",
  duration: 60,
  questions: [...]
});
```

#### 2. Join Quiz

```javascript
socket.emit("join-quiz", {
  quizId: "123456",
  userId: "student_001",
});
```

#### 3. Start Quiz

```javascript
socket.emit("start-quiz", {
  quizId: "123456",
  duration: 60,
});
```

#### 4. Submit Answer

```javascript
socket.emit("submit-answer", {
  quizId: "123456",
  userId: "student_001",
  answers: {
    q1: "a",
    q2: "b",
  },
});
```

### Server → Client

#### 1. Quiz Data

```javascript
socket.on("quiz-data", (data) => {
  console.log(data);
  // {
  //   id: "123456",
  //   title: "JavaScript Basics",
  //   questions: [...]
  // }
});
```

#### 2. Quiz Start

```javascript
socket.on("quiz-start", (data) => {
  console.log(data);
  // {
  //   quizId: "123456",
  //   duration: 60,
  //   startTime: 1704538800000
  // }
});
```

#### 3. Quiz Result

```javascript
socket.on("quiz-result", (data) => {
  console.log(data);
  // {
  //   score: 80,
  //   correctAnswers: 4,
  //   totalQuestions: 5
  // }
});
```

#### 4. Error

```javascript
socket.on("error", (error) => {
  console.error(error);
  // { message: "Quiz not found" }
});
```

---

## Error Responses

### 400 Bad Request

```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized

```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden

```json
{
  "error": "Access denied. Teachers only."
}
```

### 404 Not Found

```json
{
  "error": "Quiz not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to create quiz",
  "details": "Error message here"
}
```

---

## Authentication Flow

1. **Register/Login** → Receive JWT token
2. **Store token** in localStorage or cookies
3. **Include token** in Authorization header for protected routes
4. **Token format**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## Quiz Flow

### Teacher Flow:

1. Login with teacher account
2. Create quiz (POST /api/quizzes)
3. Register quiz with socket (`register-quiz`)
4. Share quiz ID with students
5. Start quiz via socket (`start-quiz`)
6. View results (GET /api/quizzes/:id/results)

### Student Flow:

1. Login with student account
2. Connect to socket.io
3. Join quiz (`join-quiz`)
4. Wait for `quiz-start` event
5. Answer questions
6. Submit answers (POST /api/quizzes/:id/submit or `submit-answer`)
7. Receive results via `quiz-result` event

---

## Testing with cURL

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@quiz.com","password":"teacher123"}'
```

### Create Quiz

```bash
curl -X POST http://localhost:3001/api/quizzes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Quiz","topic":"Programming","duration":60}'
```

### Get All Quizzes

```bash
curl http://localhost:3001/api/quizzes
```

---

## Default Test Accounts

```
Teacher:
  Email: teacher@quiz.com
  Password: teacher123

Student:
  Email: student@quiz.com
  Password: student123
```
