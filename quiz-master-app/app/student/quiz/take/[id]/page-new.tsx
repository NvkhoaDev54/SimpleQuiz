"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { useQuizSocket } from "@/lib/hooks/useSocket";
import { initSocket } from "@/lib/api/socket";

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "essay";
  text: string;
  options?: { id: string; text: string }[];
  points: number;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export default function TakeQuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(
    new Set()
  );

  const { quizData: socketQuizData, join, submit } = useQuizSocket();

  // Get socket instance
  const socket = useMemo(() => {
    if (typeof window !== "undefined") {
      return initSocket();
    }
    return null;
  }, []);

  useEffect(() => {
    // Join quiz when component mounts
    if (params.id && typeof window !== "undefined") {
      const userId =
        localStorage.getItem("userId") ||
        "guest-" + Math.random().toString(36).substr(2, 9);
      join({ quizId: params.id, userId });
    }
  }, [params.id, join]);

  // Use derived state to avoid cascading renders
  const quizData = useMemo(() => {
    if (socketQuizData) {
      return socketQuizData as unknown as QuizData;
    }
    return null;
  }, [socketQuizData]);

  // Initialize time remaining from quiz data
  useEffect(() => {
    if (socketQuizData && timeRemaining === 0) {
      const timeLimit =
        typeof socketQuizData.timeLimit === "number"
          ? socketQuizData.timeLimit
          : 45;
      // Use timeout to defer setState
      const timer = setTimeout(() => {
        setTimeRemaining(timeLimit * 60);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [socketQuizData, timeRemaining]);

  useEffect(() => {
    // Listen for quiz end
    const handleQuizEnd = () => {
      router.push(`/student/quiz/result/${params.id}`);
    };

    socket?.on("quiz-end", handleQuizEnd);
    return () => {
      socket?.off("quiz-end", handleQuizEnd);
    };
  }, [socket, params.id, router]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    const updatedAnswers = { ...answers, [questionId]: answerId };
    setAnswers(updatedAnswers);

    // Submit answer to server
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId") || "guest";
      submit({
        quizId: params.id,
        userId,
        answers: updatedAnswers,
      });
    }
  };

  const handleSubmit = () => {
    if (!confirm("Bạn có chắc chắn muốn nộp bài?")) return;

    // Submit final answers
    if (typeof window !== "undefined" && socket) {
      const userId = localStorage.getItem("userId") || "guest";
      socket.emit("submit-answer", {
        quizId: params.id,
        userId,
        answers,
      });
    }

    router.push(`/student/quiz/result/${params.id}`);
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <Icon
            name="hourglass_empty"
            size="xl"
            className="animate-spin mb-4 text-primary"
          />
          <p className="text-slate-900 dark:text-white">Đang tải quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark shadow-sm">
        <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <Icon name="school" size="xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{quizData.title}</h2>
              <p className="text-xs text-text-secondary">
                {quizData.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
              <Icon name="timer" className="text-primary" />
              <span className="font-semibold">
                {Math.floor(timeRemaining / 60)}:
                {String(timeRemaining % 60).padStart(2, "0")}
              </span>
            </div>
            <Button onClick={handleSubmit} variant="primary" size="sm">
              <Icon name="check" size="sm" className="mr-2" />
              Nộp bài
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: progress + "%" }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-6">
            {/* Question Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary">
                    Câu {currentQuestionIndex + 1}/{quizData.questions.length}
                  </span>
                  {flaggedQuestions.has(currentQuestion.id) && (
                    <Icon name="flag" className="text-yellow-500" size="sm" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">
                  {currentQuestion.text}
                </h3>
                <p className="text-sm text-text-secondary">
                  {currentQuestion.points} điểm
                </p>
              </div>

              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className="text-yellow-500 hover:text-yellow-600"
                aria-label="Đánh dấu câu hỏi"
              >
                <Icon
                  name={
                    flaggedQuestions.has(currentQuestion.id)
                      ? "flag"
                      : "outlined_flag"
                  }
                />
              </button>
            </div>

            {/* Answer Options */}
            {currentQuestion.type === "multiple-choice" &&
              currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
                    const isSelected =
                      answers[currentQuestion.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() =>
                          handleAnswerSelect(currentQuestion.id, option.id)
                        }
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            {optionLabel}
                          </div>
                          <span className="flex-1">{option.text}</span>
                          {isSelected && (
                            <Icon
                              name="check_circle"
                              className="text-primary"
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {currentQuestion.type === "essay" && (
              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleAnswerSelect(currentQuestion.id, e.target.value)
                }
                className="w-full p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-slate-800"
                rows={6}
                placeholder="Nhập câu trả lời của bạn..."
              />
            )}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
              variant="secondary"
            >
              <Icon name="arrow_back" size="sm" className="mr-2" />
              Câu trước
            </Button>

            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Đã trả lời: {Object.keys(answers).length}/
                {quizData.questions.length}
              </p>
            </div>

            {currentQuestionIndex < quizData.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                variant="secondary"
              >
                Câu sau
                <Icon name="arrow_forward" size="sm" className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="primary">
                <Icon name="check" size="sm" className="mr-2" />
                Nộp bài
              </Button>
            )}
          </div>

          {/* Question Grid */}
          <Card className="p-6 mt-6">
            <h4 className="font-semibold mb-4">Tất cả câu hỏi</h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {quizData.questions.map((q, index) => {
                const isAnswered = answers[q.id];
                const isFlagged = flaggedQuestions.has(q.id);
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all relative ${
                      isCurrent
                        ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                        : isAnswered
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                    }`}
                    aria-label={`Câu ${index + 1}${
                      isFlagged ? " (đã đánh dấu)" : ""
                    }`}
                  >
                    {index + 1}
                    {isFlagged && (
                      <Icon
                        name="flag"
                        size="sm"
                        className="absolute -top-1 -right-1 text-yellow-500"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
