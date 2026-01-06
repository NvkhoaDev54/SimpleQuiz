"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import { useAuth } from "@/lib/context/AuthContext";
import { useCreateQuiz } from "@/lib/hooks/useQuiz";

interface Question {
  type: "multiple-choice" | "true-false" | "essay";
  text: string;
  options?: { text: string; isCorrect: boolean }[];
  points: number;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { create: createQuiz, loading: creating } = useCreateQuiz();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(45);
  const [questions, setQuestions] = useState<Question[]>([
    {
      type: "multiple-choice",
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      points: 10,
    },
  ]);

  // Redirect if not teacher
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "teacher")) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options!.push({ text: "", isCorrect: false });
      setQuestions(newQuestions);
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options?.filter((_, i) => i !== optionIndex);
    setQuestions(newQuestions);
  };

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options?.map((opt, i) => ({
      ...opt,
      isCorrect: i === optionIndex,
    }));
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "multiple-choice",
        text: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        points: 10,
      },
    ]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Transform questions to match API schema
      const apiQuestions = questions.map((q, idx) => ({
        id: `q-${Date.now()}-${idx}`,
        type: q.type,
        text: q.text,
        options: (q.options || []).map((opt, optIdx) => ({
          id: `opt-${Date.now()}-${idx}-${optIdx}`,
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
        points: q.points,
        required: true,
      }));

      await createQuiz({
        title,
        topic: description || title,
        duration: timeLimit,
        questions: apiQuestions,
      });

      router.push("/teacher/quizzes");
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Có lỗi xảy ra khi tạo quiz");
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="hourglass_empty"
            size="xl"
            className="animate-spin mb-4"
          />
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#111318] border-r border-border-dark hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 text-primary">
            <Icon name="school" size="xl" />
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            QuizMaster
          </h1>
        </div>
        <nav className="flex-1 px-4 py-2">
          <Link
            href="/teacher/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors mb-2"
          >
            <Icon name="dashboard" />
            <span className="text-sm font-medium">Tổng quan</span>
          </Link>
          <Link
            href="/teacher/quizzes"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary mb-2"
          >
            <Icon name="folder" filled />
            <span className="text-sm font-medium">Ngân hàng câu hỏi</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tạo quiz mới</h1>
            <p className="text-text-secondary">
              Điền thông tin và câu hỏi cho quiz của bạn
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Quiz Info */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin chung</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="quiz-title"
                    className="block text-sm font-medium mb-2"
                  >
                    Tiêu đề quiz *
                  </label>
                  <input
                    id="quiz-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Nhập tiêu đề quiz"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="quiz-description"
                    className="block text-sm font-medium mb-2"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="quiz-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Mô tả ngắn về quiz"
                    rows={3}
                  />
                </div>

                <div>
                  <label
                    htmlFor="time-limit"
                    className="block text-sm font-medium mb-2"
                  >
                    Thời gian (phút) *
                  </label>
                  <input
                    id="time-limit"
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    min="1"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Questions */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Câu hỏi</h2>
                <Button
                  type="button"
                  onClick={addQuestion}
                  variant="secondary"
                  size="sm"
                  aria-label="Thêm câu hỏi mới"
                >
                  <Icon name="add" size="sm" className="mr-2" />
                  Thêm câu hỏi
                </Button>
              </div>

              {questions.map((question, qIndex) => (
                <Card key={qIndex} className="p-6 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Câu hỏi {qIndex + 1}</h3>
                    <button
                      type="button"
                      onClick={() => deleteQuestion(qIndex)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Xóa câu hỏi ${qIndex + 1}`}
                    >
                      <Icon name="delete" size="sm" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`question-text-${qIndex}`}
                        className="block text-sm font-medium mb-2"
                      >
                        Nội dung câu hỏi *
                      </label>
                      <textarea
                        id={`question-text-${qIndex}`}
                        value={question.text}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].text = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        placeholder="Nhập câu hỏi"
                        rows={2}
                        required
                      />
                    </div>

                    {question.type === "multiple-choice" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Các lựa chọn
                        </label>
                        {question.options?.map((option, oIndex) => (
                          <div key={oIndex} className="flex gap-2 mb-2">
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={option.isCorrect}
                              onChange={() => setCorrectAnswer(qIndex, oIndex)}
                              className="mt-1"
                              aria-label={`Đánh dấu đáp án ${
                                oIndex + 1
                              } là đáp án đúng`}
                            />
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[qIndex].options![oIndex].text =
                                  e.target.value;
                                setQuestions(newQuestions);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                              placeholder={`Lựa chọn ${oIndex + 1}`}
                              aria-label={`Lựa chọn ${oIndex + 1} cho câu hỏi ${
                                qIndex + 1
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(qIndex, oIndex)}
                              className="text-red-500 hover:text-red-700 px-2"
                              aria-label={`Xóa lựa chọn ${oIndex + 1}`}
                            >
                              <Icon name="close" size="sm" />
                            </button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          variant="secondary"
                          size="sm"
                          aria-label="Thêm lựa chọn"
                        >
                          <Icon name="add" size="sm" className="mr-2" />
                          Thêm lựa chọn
                        </Button>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor={`question-points-${qIndex}`}
                        className="block text-sm font-medium mb-2"
                      >
                        Điểm
                      </label>
                      <input
                        id={`question-points-${qIndex}`}
                        type="number"
                        value={question.points}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].points = parseInt(
                            e.target.value
                          );
                          setQuestions(newQuestions);
                        }}
                        className="w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        min="1"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-end">
              <Link href="/teacher/dashboard">
                <Button type="button" variant="secondary">
                  Hủy
                </Button>
              </Link>
              <Button type="submit" variant="primary" disabled={creating}>
                {creating ? (
                  <>
                    <Icon
                      name="hourglass_empty"
                      size="sm"
                      className="mr-2 animate-spin"
                    />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Icon name="save" size="sm" className="mr-2" />
                    Tạo quiz
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
