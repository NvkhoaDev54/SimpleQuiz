import { apiClient } from "./axios.config";

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "essay";
  text: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  points: number;
  required: boolean;
}

export interface QuizParticipant {
  userId: string;
  socketId?: string;
  joinedAt?: string;
}

export interface QuizSubmission {
  userId: string;
  answers: Record<string, string>;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  submittedAt: string;
}

export interface QuizResults {
  quizId: string;
  quizTitle: string;
  totalSubmissions: number;
  submissions: QuizSubmission[];
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  duration: number;
  questions: QuizQuestion[];
  createdAt: string;
  status: "active" | "ended";
  participants: QuizParticipant[];
  teacherId?: string;
  settings?: {
    timeLimit: number;
    shuffleQuestions: boolean;
    showAnswersAfterSubmit: boolean;
  };
}

export interface CreateQuizPayload {
  title: string;
  topic: string;
  duration: number;
  questions?: QuizQuestion[];
}

export interface CreateQuizResponse {
  id: string;
  title: string;
  duration: number;
  questions: QuizQuestion[];
  createdAt: string;
  status: "active" | "ended";
  participants: QuizParticipant[];
}

// Create a new quiz
export const createQuiz = async (
  payload: CreateQuizPayload
): Promise<CreateQuizResponse> => {
  const response = await apiClient.post<CreateQuizResponse>(
    "/api/quizzes",
    payload
  );
  return response.data;
};

// Get all quizzes
export const getAllQuizzes = async (): Promise<{
  total: number;
  quizzes: Quiz[];
}> => {
  const response = await apiClient.get("/api/quizzes");
  return response.data;
};

// Get quiz by ID
export const getQuizById = async (id: string): Promise<Quiz> => {
  const response = await apiClient.get(`/api/quizzes/${id}`);
  return response.data;
};

// Update quiz
export const updateQuiz = async (
  id: string,
  payload: Partial<Quiz>
): Promise<Quiz> => {
  const response = await apiClient.put(`/api/quizzes/${id}`, payload);
  return response.data;
};

// Delete quiz
export const deleteQuiz = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/quizzes/${id}`);
};

// Start quiz
export const startQuiz = async (id: string): Promise<void> => {
  await apiClient.post(`/api/quizzes/${id}/start`);
};

// End quiz
export const endQuiz = async (id: string): Promise<void> => {
  await apiClient.post(`/api/quizzes/${id}/end`);
};

// Submit quiz answers
export const submitQuizAnswers = async (
  quizId: string,
  userId: string,
  answers: Record<string, string>
): Promise<{
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}> => {
  const response = await apiClient.post(`/api/quizzes/${quizId}/submit`, {
    userId,
    answers,
  });
  return response.data;
};

// Get quiz results
export const getQuizResults = async (quizId: string): Promise<QuizResults> => {
  const response = await apiClient.get<QuizResults>(
    `/api/quizzes/${quizId}/results`
  );
  return response.data;
};
