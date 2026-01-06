"use client";

import { useState, useEffect } from "react";
import {
  Quiz,
  getAllQuizzes,
  getQuizById,
  createQuiz,
  CreateQuizPayload,
} from "../api/quiz.api";

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllQuizzes();
      setQuizzes(data.quizzes);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch quizzes";
      setError(errorMessage);
      console.error("Fetch quizzes error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return { quizzes, loading, error, refetch: fetchQuizzes };
};

export const useQuiz = (quizId: string) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch quiz";
        setError(errorMessage);
        console.error("Fetch quiz error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const refetch = async () => {
    if (!quizId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getQuizById(quizId);
      setQuiz(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch quiz";
      setError(errorMessage);
      console.error("Fetch quiz error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { quiz, loading, error, refetch };
};

export const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateQuizPayload) => {
    try {
      setLoading(true);
      setError(null);
      const quiz = await createQuiz(payload);
      return quiz;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create quiz";
      setError(errorMessage);
      console.error("Create quiz error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};
