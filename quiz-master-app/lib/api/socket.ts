import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "./axios.config";
import { Quiz } from "./quiz.api";

let socket: Socket | null = null;

// Socket event data types
export interface QuizDataEvent {
  id: string;
  title: string;
  duration: number;
  questions: unknown[];
  [key: string]: unknown;
}

export interface QuizStartEvent {
  quizId: string;
  duration: number;
  startTime: number;
}

export interface QuizResultEvent {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage?: number;
}

export interface SocketError {
  message: string;
  [key: string]: unknown;
}

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("error", (error: SocketError) => {
      console.error("❌ Socket error:", error);
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Quiz socket events
export interface JoinQuizPayload {
  quizId: string;
  userId: string;
}

export interface StartQuizPayload {
  quizId: string;
  duration: number;
}

export interface SubmitAnswerPayload {
  quizId: string;
  userId: string;
  answers: Record<string, string>;
}

export const registerQuiz = (quiz: Partial<Quiz>) => {
  socket?.emit("register-quiz", quiz);
};

export const joinQuiz = (payload: JoinQuizPayload) => {
  socket?.emit("join-quiz", payload);
};

export const startQuiz = (payload: StartQuizPayload) => {
  console.log("🚀 Emitting start-quiz:", payload);
  socket?.emit("start-quiz", payload);
};

export const submitAnswer = (payload: SubmitAnswerPayload) => {
  socket?.emit("submit-answer", payload);
};

export const onQuizData = (callback: (data: QuizDataEvent) => void) => {
  socket?.on("quiz-data", callback);
};

export const onQuizStart = (callback: (data: QuizStartEvent) => void) => {
  socket?.on("quiz-start", callback);
};

export const onQuizResult = (callback: (data: QuizResultEvent) => void) => {
  socket?.on("quiz-result", callback);
};

export const offQuizData = () => {
  socket?.off("quiz-data");
};

export const offQuizStart = () => {
  socket?.off("quiz-start");
};

export const offQuizResult = () => {
  socket?.off("quiz-result");
};
