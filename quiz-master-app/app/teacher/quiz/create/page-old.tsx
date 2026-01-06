"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "essay";
  text: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  points: number;
  required: boolean;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [quizTitle, setQuizTitle] = useState(
    "Kiểm tra giữa kỳ - Học kỳ I 2024"
  );
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple-choice",
      text: "Giao thức nào được sử dụng để truyền tải file trên mạng Internet?",
      options: [
        { id: "a", text: "HTTP", isCorrect: false },
        { id: "b", text: "FTP", isCorrect: true },
        { id: "c", text: "SMTP", isCorrect: false },
      ],
      points: 10,
      required: true,
    },
    {
      id: "2",
      type: "multiple-choice",
      text: "",
      options: [],
      points: 10,
      required: false,
    },
  ]);

  const [settings, setSettings] = useState({
    timeLimit: 45,
    timeLimitEnabled: true,
    shuffleQuestions: false,
    showAnswersAfterSubmit: true,
    requirePassword: false,
    startDate: "",
    endDate: "",
  });

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                {
                  id: String.fromCharCode(97 + q.options.length),
                  text: "",
                  isCorrect: false,
                },
              ],
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
          : q
      )
    );
  };

  const setCorrectAnswer = (questionId: string, optionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            }
          : q
      )
    );
  };

  const duplicateQuestion = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setQuestions((prev) => [
        ...prev,
        { ...question, id: Date.now().toString() },
      ]);
    }
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const addNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "multiple-choice",
        text: "",
        options: [],
        points: 10,
        required: false,
      },
    ]);
  };

  const handlePublish = () => {
    console.log("Publishing quiz:", { quizTitle, questions, settings });
    router.push("/teacher/quizzes");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden min-h-screen flex flex-col">
      {/* Sidebar */}
      <div className="flex h-screen w-full">
        <aside className="w-64 shrink-0 bg-[#111318] border-r border-border-dark hidden md:flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="size-8 text-primary">
              <Icon name="school" size="xl" />
            </div>
            <h1 className="text-white text-xl font-bold tracking-tight">
              Quiz Maker
            </h1>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6">
            {/* User Info */}
            <div className="flex gap-3 items-center p-2 rounded-lg bg-surface-dark/50">
              <div
                className="bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
                }}
              />
              <div className="flex flex-col">
                <h2 className="text-white text-sm font-medium">Giảng viên A</h2>
                <p className="text-text-secondary text-xs">Khoa CNTT</p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <Link
                href="/teacher/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
              >
                <Icon name="dashboard" />
                <span className="text-sm font-medium">Tổng quan</span>
              </Link>
              <Link
                href="/teacher/library"
                className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
              >
                <Icon name="menu_book" />
                <span className="text-sm font-medium">Bài giảng</span>
              </Link>
              <Link
                href="/teacher/bank"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
              >
                <Icon name="folder" filled />
                <span className="text-sm font-medium">Ngân hàng câu hỏi</span>
              </Link>
              <Link
                href="/teacher/students"
                className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
              >
                <Icon name="group" />
                <span className="text-sm font-medium">Sinh viên</span>
              </Link>
              <Link
                href="/teacher/settings"
                className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
              >
                <Icon name="settings" />
                <span className="text-sm font-medium">Cài đặt</span>
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-border-dark">
            <Link href="/">
              <button className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-red-400 transition-colors w-full">
                <Icon name="logout" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* Top Header */}
          <header className="h-16 border-b border-border-dark bg-[#111318] flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4 md:hidden">
              <button className="text-white" aria-label="Open menu">
                <Icon name="menu" />
              </button>
              <h2 className="text-white text-lg font-bold">Quiz Maker</h2>
            </div>
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Icon name="search" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm bài kiểm tra..."
                  className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-surface-dark text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-text-secondary hover:text-white relative"
                aria-label="View notifications"
              >
                <Icon name="notifications" />
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-[#111318]" />
              </button>
              <div
                className="bg-cover rounded-full size-9 md:hidden"
                style={{
                  backgroundImage:
                    "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
                }}
              />
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              {/* Page Heading & Actions */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link href="/teacher/quizzes">
                      <button className="text-text-secondary hover:text-white flex items-center gap-1 text-sm">
                        <Icon name="arrow_back" className="text-[18px]" />
                        Quay lại
                      </button>
                    </Link>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                    Tạo Quiz mới
                  </h1>
                  <p className="text-text-secondary mt-2">
                    Thiết lập nội dung và cấu hình cho bài kiểm tra
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary">Lưu nháp</Button>
                  <Button
                    onClick={handlePublish}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Icon name="publish" size="sm" className="mr-2" />
                    Xuất bản
                  </Button>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Column:  Quiz Builder */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Quiz Meta Info */}
                  <Card className="p-6">
                    <div className="flex flex-col gap-5">
                      <label className="flex flex-col gap-2">
                        <span className="text-white font-medium">
                          Tên bài kiểm tra
                        </span>
                        <input
                          type="text"
                          value={quizTitle}
                          onChange={(e) => setQuizTitle(e.target.value)}
                          className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Nhập tên bài kiểm tra"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-white font-medium">
                          Mô tả / Hướng dẫn
                        </span>
                        <textarea
                          value={quizDescription}
                          onChange={(e) => setQuizDescription(e.target.value)}
                          className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-25"
                          placeholder="Nhập hướng dẫn làm bài cho sinh viên..."
                        />
                      </label>
                    </div>
                  </Card>

                  {/* Question List */}
                  <div className="flex flex-col gap-4">
                    {questions.map((question, index) => (
                      <Card
                        key={question.id}
                        className="overflow-hidden group/card relative"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                        <div className="p-6 flex flex-col gap-5">
                          {/* Card Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="bg-background-dark text-text-secondary size-8 flex items-center justify-center rounded-md font-bold text-sm border border-border-dark">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="text-white font-bold text-lg">
                                Câu hỏi trắc nghiệm
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => duplicateQuestion(question.id)}
                                className="p-2 text-text-secondary hover:text-white rounded-lg hover:bg-background-dark"
                                title="Nhân bản"
                              >
                                <Icon name="content_copy" />
                              </button>
                              <button
                                onClick={() => deleteQuestion(question.id)}
                                className="p-2 text-text-secondary hover: text-red-400 rounded-lg hover: bg-background-dark"
                                title="Xóa"
                              >
                                <Icon name="delete" />
                              </button>
                              <button
                                className="p-2 text-text-secondary hover:text-white cursor-grab active:cursor-grabbing"
                                aria-label="Drag to reorder"
                              >
                                <Icon name="drag_indicator" />
                              </button>
                            </div>
                          </div>

                          {/* Question Input */}
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <input
                                type="text"
                                value={question.text}
                                onChange={(e) =>
                                  setQuestions((prev) =>
                                    prev.map((q) =>
                                      q.id === question.id
                                        ? { ...q, text: e.target.value }
                                        : q
                                    )
                                  )
                                }
                                className="w-full bg-background-dark border border-border-dark rounded-lg pl-4 pr-12 py-3 text-white placeholder-text-secondary focus:border-primary focus: ring-1 focus:ring-primary outline-none font-medium"
                                placeholder="Nhập nội dung câu hỏi..."
                              />
                              <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
                                aria-label="Upload image"
                              >
                                <Icon name="image" size="sm" />
                              </button>
                            </div>
                          </div>

                          {/* Answers */}
                          {question.type === "multiple-choice" &&
                            question.options.length > 0 && (
                              <div className="flex flex-col gap-3 pl-2 border-l-2 border-border-dark ml-3">
                                <p className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1 pl-2">
                                  Đáp án
                                </p>
                                {question.options.map((option) => (
                                  <div
                                    key={option.id}
                                    className="flex items-center gap-3 group/option"
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      checked={option.isCorrect}
                                      onChange={() =>
                                        setCorrectAnswer(question.id, option.id)
                                      }
                                      className="size-5 border-border-dark bg-background-dark text-primary focus:ring-offset-background-dark focus:ring-primary cursor-pointer"
                                      aria-label={`Mark option ${option.id} as correct answer`}
                                    />
                                    <div className="flex-1 flex items-center gap-2">
                                      <span className="text-text-secondary text-sm font-medium w-6">
                                        {option.id.toUpperCase()}.
                                      </span>
                                      <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) =>
                                          setQuestions((prev) =>
                                            prev.map((q) =>
                                              q.id === question.id
                                                ? {
                                                    ...q,
                                                    options: q.options.map(
                                                      (o) =>
                                                        o.id === option.id
                                                          ? {
                                                              ...o,
                                                              text: e.target
                                                                .value,
                                                            }
                                                          : o
                                                    ),
                                                  }
                                                : q
                                            )
                                          )
                                        }
                                        className="flex-1 bg-background-dark border border-border-dark rounded-md px-3 py-2 text-sm text-white placeholder-text-secondary focus:border-primary focus:ring-0 outline-none"
                                        placeholder="Nhập đáp án"
                                      />
                                    </div>
                                    <button
                                      onClick={() =>
                                        removeOption(question.id, option.id)
                                      }
                                      className="text-text-secondary hover:text-red-400 opacity-0 group-hover/option:opacity-100 transition-opacity"
                                      aria-label={`Remove option ${option.id}`}
                                    >
                                      <Icon
                                        name="close"
                                        className="text-[18px]"
                                      />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => addOption(question.id)}
                                  className="flex items-center gap-2 text-primary hover:text-primary-hover text-sm font-medium mt-1 w-fit"
                                >
                                  <Icon
                                    name="add_circle"
                                    className="text-[18px]"
                                  />
                                  Thêm lựa chọn
                                </button>
                              </div>
                            )}

                          {/* Card Footer Settings */}
                          <div className="flex flex-wrap gap-4 pt-4 border-t border-border-dark mt-2 items-center justify-between">
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 bg-background-dark px-3 py-1. 5 rounded-lg border border-border-dark">
                                <span className="text-text-secondary text-sm">
                                  Điểm số:{" "}
                                </span>
                                <input
                                  type="number"
                                  value={question.points}
                                  onChange={(e) =>
                                    setQuestions((prev) =>
                                      prev.map((q) =>
                                        q.id === question.id
                                          ? {
                                              ...q,
                                              points: parseInt(e.target.value),
                                            }
                                          : q
                                      )
                                    )
                                  }
                                  className="w-12 bg-transparent border-none p-0 text-white text-right focus:ring-0 font-bold"
                                />
                              </label>
                              <div className="h-6 w-px bg-border-dark" />
                              <label className="flex items-center gap-2 cursor-pointer group/toggle">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={question.required}
                                    onChange={(e) =>
                                      setQuestions((prev) =>
                                        prev.map((q) =>
                                          q.id === question.id
                                            ? {
                                                ...q,
                                                required: e.target.checked,
                                              }
                                            : q
                                        )
                                      )
                                    }
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-[#3b4354] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                                </div>
                                <span className="text-text-secondary text-sm group-hover/toggle:text-white transition-colors">
                                  Bắt buộc
                                </span>
                              </label>
                            </div>
                            <div className="relative">
                              <select
                                className="appearance-none bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pr-8"
                                aria-label="Question type"
                              >
                                <option>Trắc nghiệm (Một đáp án)</option>
                                <option>Trắc nghiệm (Nhiều đáp án)</option>
                                <option>Đúng / Sai</option>
                                <option>Tự luận ngắn</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-text-secondary">
                                <Icon name="expand_more" size="sm" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {/* Add Question Button */}
                    <button
                      onClick={addNewQuestion}
                      className="w-full py-4 rounded-xl border-2 border-dashed border-border-dark text-text-secondary hover:text-primary hover:border-primary hover:bg-surface-dark transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      <Icon name="add_circle" />
                      Thêm câu hỏi mới
                    </button>
                  </div>
                </div>

                {/* Right Column: Settings Panel */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-6">
                    <div className="p-4 border-b border-border-dark">
                      <h3 className="text-white font-bold text-lg">
                        Cài đặt bài kiểm tra
                      </h3>
                    </div>
                    <div className="p-5 flex flex-col gap-6">
                      {/* Time Settings */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white font-medium">
                            <Icon
                              name="timer"
                              className="text-text-secondary"
                            />
                            Thời gian làm bài
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.timeLimitEnabled}
                              onChange={(e) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  timeLimitEnabled: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                              aria-label="Enable time limit"
                            />
                            <div className="w-11 h-6 bg-[#3b4354] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                          </label>
                        </div>
                        {settings.timeLimitEnabled && (
                          <div className="flex items-center gap-2 bg-background-dark p-2 rounded-lg border border-border-dark">
                            <input
                              type="number"
                              value={settings.timeLimit}
                              onChange={(e) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  timeLimit: parseInt(e.target.value),
                                }))
                              }
                              className="w-full bg-transparent border-none text-white focus:ring-0 p-1"
                              placeholder="45"
                              aria-label="Time limit in minutes"
                            />
                            <span className="text-text-secondary text-sm font-medium pr-2">
                              phút
                            </span>
                          </div>
                        )}
                      </div>

                      <hr className="border-border-dark" />

                      {/* Schedule */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <Icon
                            name="calendar_today"
                            className="text-text-secondary"
                          />
                          Lịch trình
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-text-secondary">
                            Bắt đầu
                          </label>
                          <input
                            type="datetime-local"
                            value={settings.startDate}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                startDate: e.target.value,
                              }))
                            }
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary scheme-dark"
                            aria-label="Start date and time"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-text-secondary">
                            Kết thúc
                          </label>
                          <input
                            type="datetime-local"
                            value={settings.endDate}
                            onChange={(e) =>
                              setSettings((prev) => ({
                                ...prev,
                                endDate: e.target.value,
                              }))
                            }
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary scheme-dark"
                            aria-label="End date and time"
                          />
                        </div>
                      </div>

                      <hr className="border-border-dark" />

                      {/* Other Settings */}
                      <div className="flex flex-col gap-4">
                        {[
                          { key: "shuffleQuestions", label: "Trộn câu hỏi" },
                          {
                            key: "showAnswersAfterSubmit",
                            label: "Hiện đáp án sau khi nộp",
                          },
                          {
                            key: "requirePassword",
                            label: "Mật khẩu truy cập",
                          },
                        ].map(({ key, label }) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-white">{label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={
                                  settings[
                                    key as keyof typeof settings
                                  ] as boolean
                                }
                                onChange={(e) =>
                                  setSettings((prev) => ({
                                    ...prev,
                                    [key]: e.target.checked,
                                  }))
                                }
                                className="sr-only peer"
                                aria-label={label}
                              />
                              <div className="w-9 h-5 bg-[#3b4354] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <div className="bg-primary/10 rounded-lg p-3 flex gap-3 items-start">
                          <Icon
                            name="info"
                            className="text-primary text-sm mt-0.5"
                          />
                          <p className="text-xs text-primary/80 leading-relaxed">
                            Cài đặt này sẽ áp dụng cho tất cả sinh viên tham gia
                            bài kiểm tra này.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
