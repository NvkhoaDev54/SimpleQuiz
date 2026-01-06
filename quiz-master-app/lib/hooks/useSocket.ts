"use client";

import { useState, useEffect, useCallback } from "react";
import {
  initSocket,
  disconnectSocket,
  registerQuiz,
  joinQuiz,
  startQuiz as socketStartQuiz,
  submitAnswer,
  onQuizData,
  onQuizStart,
  onQuizResult,
  offQuizData,
  offQuizStart,
  offQuizResult,
  JoinQuizPayload,
  StartQuizPayload,
  SubmitAnswerPayload,
  QuizDataEvent,
  QuizResultEvent,
} from "../api/socket";
import { Quiz } from "../api/quiz.api";

export const useSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = initSocket();

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return { connected };
};

export const useQuizSocket = () => {
  const [quizData, setQuizData] = useState<QuizDataEvent | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResultEvent | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    // Initialize socket connection
    initSocket();

    // Listen for quiz data
    onQuizData((data) => {
      console.log("📥 Quiz data received:", data);
      setQuizData(data);
    });

    // Listen for quiz start
    onQuizStart((data) => {
      console.log("🚀 Quiz started:", data);
      setQuizStarted(true);
      setStartTime(data.startTime);
      setDuration(data.duration);
    });

    // Listen for quiz result
    onQuizResult((data) => {
      console.log("📊 Quiz result:", data);
      setQuizResult(data);
    });

    return () => {
      offQuizData();
      offQuizStart();
      offQuizResult();
    };
  }, []);

  const register = useCallback((quiz: Partial<Quiz>) => {
    registerQuiz(quiz);
  }, []);

  const join = useCallback((payload: JoinQuizPayload) => {
    joinQuiz(payload);
  }, []);

  const start = useCallback((payload: StartQuizPayload) => {
    console.log("🎯 Starting quiz:", payload);
    socketStartQuiz(payload);
  }, []);

  const submit = useCallback((payload: SubmitAnswerPayload) => {
    submitAnswer(payload);
  }, []);

  return {
    quizData,
    quizStarted,
    quizResult,
    startTime,
    duration,
    register,
    join,
    start,
    submit,
  };
};
