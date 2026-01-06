# QuizMaster - Hệ thống Quiz Online

## 🚀 Tổng quan

QuizMaster là một nền tảng quiz online hoàn chỉnh với backend API và frontend Next.js, hỗ trợ:

- Tạo và quản lý quiz
- Tham gia quiz real-time với Socket.io
- Hệ thống authentication (Teacher/Student)
- Tự động chấm điểm
- Theo dõi kết quả

## 📁 Cấu trúc dự án

```
SimpleQuiz/
├── quiz-client-backend/    # Backend API (Node.js + Express + Socket.io)
└── quiz-master-app/        # Frontend (Next.js + React + TypeScript)
```

## 🛠️ Backend API (quiz-client-backend)

### Cài đặt

```bash
cd quiz-client-backend
npm install jsonwebtoken
```

### Cấu hình

Tạo file `.env` từ `.env.example`:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=quiz-master-secret-key-2024
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your-gemini-api-key-here
```

### Chạy Backend

```bash
npm start
# hoặc
npm run dev
```

Backend sẽ chạy tại: `http://localhost:3001`

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile (requires auth)
- `PUT /api/auth/profile` - Cập nhật profile (requires auth)

#### Quizzes

- `GET /api/quizzes` - Lấy danh sách quiz
- `GET /api/quizzes/:id` - Lấy chi tiết quiz
- `POST /api/quizzes` - Tạo quiz mới (teacher only)
- `PUT /api/quizzes/:id` - Cập nhật quiz (teacher only)
- `DELETE /api/quizzes/:id` - Xóa quiz (teacher only)
- `POST /api/quizzes/:id/start` - Bắt đầu quiz (teacher only)
- `POST /api/quizzes/:id/end` - Kết thúc quiz (teacher only)
- `POST /api/quizzes/:id/submit` - Nộp bài (requires auth)
- `GET /api/quizzes/:id/results` - Xem kết quả (requires auth)

#### Socket.io Events

- `register-quiz` - Đăng ký quiz với socket
- `join-quiz` - Tham gia quiz
- `start-quiz` - Bắt đầu quiz real-time
- `submit-answer` - Nộp câu trả lời
- `quiz-data` - Nhận dữ liệu quiz
- `quiz-start` - Nhận thông báo bắt đầu
- `quiz-result` - Nhận kết quả

### Tài khoản mẫu

```javascript
// Teacher
Email: teacher@quiz.com
Password: teacher123

// Student
Email: student@quiz.com
Password: student123
```

## 🎨 Frontend (quiz-master-app)

### Cài đặt

```bash
cd quiz-master-app
npm install axios socket.io-client
```

### Cấu hình

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=QuizMaster
```

### Chạy Frontend

```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 📚 API Service Layer

Frontend đã được tích hợp đầy đủ API services:

### 1. Authentication (`lib/api/auth.api.ts`)

```typescript
import { login, register, logout, getCurrentUser } from "@/lib/api/auth.api";

// Đăng nhập
const { token, user } = await login({ email, password });

// Đăng ký
const { token, user } = await register({ email, password, name, role });

// Đăng xuất
logout();
```

### 2. Quiz API (`lib/api/quiz.api.ts`)

```typescript
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuizAnswers,
} from "@/lib/api/quiz.api";

// Tạo quiz
const quiz = await createQuiz({ title, topic, duration });

// Lấy danh sách quiz
const { quizzes, total } = await getAllQuizzes();

// Nộp bài
const result = await submitQuizAnswers(quizId, userId, answers);
```

### 3. Socket.io (`lib/api/socket.ts`)

```typescript
import { initSocket, joinQuiz, startQuiz } from "@/lib/api/socket";

// Khởi tạo socket
const socket = initSocket();

// Tham gia quiz
joinQuiz({ quizId, userId });

// Bắt đầu quiz
startQuiz({ quizId, duration });
```

## 🎣 React Hooks

### useAuth Hook

```typescript
import { useAuth } from "@/lib/context/AuthContext";

const { user, isAuthenticated, login, logout } = useAuth();
```

### useQuiz Hooks

```typescript
import { useQuizzes, useQuiz, useCreateQuiz } from "@/lib/hooks/useQuiz";

// Lấy danh sách quiz
const { quizzes, loading, error } = useQuizzes();

// Lấy quiz theo ID
const { quiz, loading } = useQuiz(quizId);

// Tạo quiz
const { create, loading } = useCreateQuiz();
```

### useSocket Hooks

```typescript
import { useSocket, useQuizSocket } from "@/lib/hooks/useSocket";

// Socket connection
const { connected } = useSocket();

// Quiz socket events
const { quizData, quizStarted, join, start, submit } = useQuizSocket();
```

## 🔧 Cách sử dụng

### 1. Tích hợp vào component

Wrap app với `AuthProvider`:

```tsx
// app/layout.tsx
import { AuthProvider } from "@/lib/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Sử dụng trong page

```tsx
"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useQuizzes } from "@/lib/hooks/useQuiz";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { quizzes, loading } = useQuizzes();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>{quiz.title}</div>
      ))}
    </div>
  );
}
```

## 🎯 Các tính năng đã phát triển

### Backend

✅ Authentication với JWT
✅ User management (Teacher/Student roles)
✅ CRUD operations cho Quiz
✅ Real-time quiz với Socket.io
✅ Automatic scoring system
✅ Quiz results tracking
✅ Protected routes với middleware

### Frontend

✅ API service layer với Axios
✅ Socket.io client integration
✅ React Context cho Authentication
✅ Custom hooks cho Quiz và Socket
✅ TypeScript types cho API
✅ Environment configuration
✅ Error handling và loading states

## 🚀 Bước tiếp theo

1. Cài đặt dependencies cho cả backend và frontend
2. Cấu hình environment variables
3. Chạy backend: `cd quiz-client-backend && npm start`
4. Chạy frontend: `cd quiz-master-app && npm run dev`
5. Truy cập `http://localhost:3000` để sử dụng

## 📝 Ghi chú

- Backend chạy trên port 3001
- Frontend chạy trên port 3000
- Socket.io sử dụng WebSocket transport
- JWT token được lưu trong localStorage
- CORS đã được cấu hình cho development

## 🔒 Bảo mật

⚠️ **Lưu ý**: Đây là phiên bản development. Trong production cần:

- Hash password với bcrypt
- Sử dụng HTTPS
- Cấu hình CORS chặt chẽ hơn
- Lưu JWT_SECRET an toàn
- Thêm rate limiting
- Validate input đầy đủ

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:

- Backend đang chạy trên port 3001
- Environment variables được cấu hình đúng
- Dependencies đã được cài đặt đầy đủ
- Console log để debug API calls
