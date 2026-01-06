# 🚀 Quick Start Guide - QuizMaster

## Bước 1: Cài đặt Backend

```bash
cd quiz-client-backend

# Cài đặt package mới
npm install jsonwebtoken

# Tạo file .env
copy .env.example .env
# Hoặc trên Linux/Mac: cp .env.example .env

# Khởi động backend
npm start
```

Backend sẽ chạy tại: **http://localhost:3001**

## Bước 2: Cài đặt Frontend

```bash
cd quiz-master-app

# Cài đặt packages mới
npm install axios socket.io-client

# File .env.local đã được tạo sẵn, không cần chỉnh sửa

# Khởi động frontend
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

## Bước 3: Test thử hệ thống

### Test API với cURL hoặc Postman:

**1. Login:**

```bash
curl -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"teacher@quiz.com\",\"password\":\"teacher123\"}"
```

Lưu lại `token` từ response!

**2. Tạo Quiz:**

```bash
curl -X POST http://localhost:3001/api/quizzes ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"title\":\"Test Quiz\",\"topic\":\"JavaScript\",\"duration\":60}"
```

**3. Lấy danh sách Quiz:**

```bash
curl http://localhost:3001/api/quizzes
```

### Test Frontend:

1. Mở trình duyệt: **http://localhost:3000**
2. Click "Đăng nhập"
3. Sử dụng tài khoản test:
   - Teacher: `teacher@quiz.com` / `teacher123`
   - Student: `student@quiz.com` / `student123`

## 🎯 Các tính năng đã hoàn thành

### Backend API:

- ✅ Authentication (Register/Login/Profile)
- ✅ JWT Token authorization
- ✅ Role-based access control (Teacher/Student)
- ✅ Quiz CRUD operations
- ✅ Real-time Socket.io integration
- ✅ Auto scoring system
- ✅ Results tracking

### Frontend:

- ✅ API Service Layer ([lib/api/](quiz-master-app/lib/api/))
  - `axios.config.ts` - Axios configuration
  - `auth.api.ts` - Authentication APIs
  - `quiz.api.ts` - Quiz APIs
  - `socket.ts` - Socket.io client
- ✅ React Hooks ([lib/hooks/](quiz-master-app/lib/hooks/))
  - `useQuiz.ts` - Quiz management hooks
  - `useSocket.ts` - Socket hooks
- ✅ Context ([lib/context/](quiz-master-app/lib/context/))

  - `AuthContext.tsx` - Authentication context

- ✅ Example Pages
  - `app/teacher/quiz/create/example-integrated.tsx`
  - `app/student/quiz/join/example-integrated.tsx`

## 📁 Các file mới được tạo

### Backend:

```
quiz-client-backend/
├── controllers/
│   └── auth.controller.js          # ✨ NEW
├── middleware/
│   └── auth.middleware.js          # ✨ NEW
├── routes/
│   └── auth.route.js              # ✨ NEW
├── storage/
│   └── user.storage.js            # ✨ NEW
├── .env.example                   # ✨ NEW
└── [Updated files]
    ├── app.js                     # ✅ Updated
    ├── routes/quiz.route.js       # ✅ Updated
    ├── controllers/quiz.controller.js  # ✅ Updated
    └── services/scoring.service.js     # ✅ Updated
```

### Frontend:

```
quiz-master-app/
├── lib/
│   ├── api/                       # ✨ NEW Directory
│   │   ├── axios.config.ts
│   │   ├── auth.api.ts
│   │   ├── quiz.api.ts
│   │   └── socket.ts
│   ├── context/                   # ✨ NEW Directory
│   │   └── AuthContext.tsx
│   └── hooks/                     # ✨ NEW Directory
│       ├── useQuiz.ts
│       └── useSocket.ts
├── app/
│   ├── teacher/quiz/create/
│   │   └── example-integrated.tsx  # ✨ NEW
│   └── student/quiz/join/
│       └── example-integrated.tsx  # ✨ NEW
├── .env.local                     # ✨ NEW
└── package.json                   # ✅ Updated
```

### Documentation:

```
SimpleQuiz/
├── README.md                      # ✨ NEW
├── API_DOCUMENTATION.md           # ✨ NEW
└── QUICK_START.md                 # ✨ NEW (this file)
```

## 🔥 Cách sử dụng trong code

### 1. Sử dụng Authentication:

```tsx
"use client";

import { useAuth } from "@/lib/context/AuthContext";

export default function MyPage() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login("teacher@quiz.com", "teacher123");
      alert("Login success!");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 2. Sử dụng Quiz API:

```tsx
"use client";

import { useQuizzes, useCreateQuiz } from "@/lib/hooks/useQuiz";

export default function QuizListPage() {
  const { quizzes, loading } = useQuizzes();
  const { create } = useCreateQuiz();

  const handleCreate = async () => {
    const quiz = await create({
      title: "My Quiz",
      topic: "JavaScript",
      duration: 60,
    });
    console.log("Created:", quiz);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create Quiz</button>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>{quiz.title}</div>
      ))}
    </div>
  );
}
```

### 3. Sử dụng Socket.io:

```tsx
"use client";

import { useQuizSocket } from "@/lib/hooks/useSocket";
import { useAuth } from "@/lib/context/AuthContext";

export default function QuizJoinPage() {
  const { user } = useAuth();
  const { join, quizData, quizStarted } = useQuizSocket();

  const handleJoin = () => {
    join({
      quizId: "123456",
      userId: user!.id,
    });
  };

  return (
    <div>
      <button onClick={handleJoin}>Join Quiz</button>
      {quizData && <p>Quiz: {quizData.title}</p>}
      {quizStarted && <p>Quiz has started!</p>}
    </div>
  );
}
```

## 🔧 Troubleshooting

### Backend không khởi động được:

```bash
# Check port 3001 có bị chiếm không
netstat -ano | findstr :3001

# Nếu bị chiếm, kill process hoặc đổi port trong .env
```

### Frontend lỗi kết nối API:

```bash
# Check backend đang chạy
curl http://localhost:3001/health

# Check environment variables
cat .env.local
```

### Socket.io không kết nối:

- Đảm bảo backend đang chạy
- Check console browser để xem lỗi
- Verify SOCKET_URL trong `.env.local`

## 📞 Tài khoản test

```
Teacher Account:
  Email: teacher@quiz.com
  Password: teacher123

Student Account:
  Email: student@quiz.com
  Password: student123
```

## ⚡ Next Steps

1. **Wrap app với AuthProvider** trong `app/layout.tsx`:

```tsx
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

2. **Tích hợp vào các page hiện có**:

   - Update `app/(auth)/login/page.tsx` để sử dụng `useAuth()`
   - Update `app/teacher/quiz/create/page.tsx` để call API
   - Update `app/student/quiz/join/page.tsx` để sử dụng Socket.io

3. **Deploy**:
   - Backend: Deploy to Heroku, Railway, hoặc VPS
   - Frontend: Deploy to Vercel, Netlify
   - Update environment variables

## 🎉 Hoàn tất!

Bây giờ bạn đã có một hệ thống quiz hoàn chỉnh với:

- ✅ Backend API với authentication
- ✅ Real-time features với Socket.io
- ✅ Frontend API integration
- ✅ React hooks và context
- ✅ Full documentation

Chúc bạn phát triển thành công! 🚀
