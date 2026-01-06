"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import AnswerOption from "@/components/quiz/AnswerOption";

export default function ReviewQuizPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"all" | "incorrect" | "correct">(
    "all"
  );

  const questions = [
    {
      id: 1,
      number: 1,
      type: "Trắc nghiệm",
      text: "Giao thức nào được sử dụng để truyền tải file trên mạng Internet?",
      userAnswer: "C",
      correctAnswer: "C",
      isCorrect: true,
      options: [
        { label: "A.  HTTP", value: "A" },
        { label: "B.  FTP", value: "B" },
        { label: "C. FTP", value: "C" },
        { label: "D.  SMTP", value: "D" },
      ],
    },
    {
      id: 2,
      number: 2,
      type: "Hình ảnh",
      text: "Biểu đồ dưới đây biểu diễn độ phức tạp thời gian nào?",
      imageUrl: "https://via.placeholder.com/400x200",
      userAnswer: "B",
      correctAnswer: "C",
      isCorrect: false,
      options: [
        { label: "A. O(1) - Constant Time", value: "A" },
        { label: "B. O(log n) - Logarithmic Time", value: "B" },
        { label: "C. O(n) - Linear Time", value: "C" },
      ],
    },
    {
      id: 3,
      number: 3,
      type: "Tự luận",
      text: "Giải thích ngắn gọn khái niệm về Recursion (Đệ quy).",
      userAnswer:
        "Đệ quy là một phương pháp trong lập trình nơi một hàm gọi chính nó để giải quyết vấn đề.",
      isCorrect: null,
      explanation:
        "Đệ quy là quá trình trong đó một hàm gọi tr��c tiếp hoặc gián tiếp chính nó.  Hàm đệ quy thường bao gồm trường hợp cơ sở (base case) để dừng đệ quy và bước đệ quy (recursive step) để chia nhỏ vấn đề.",
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    if (activeTab === "incorrect") return q.isCorrect === false;
    if (activeTab === "correct") return q.isCorrect === true;
    return true;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-card-dark/80 backdrop-blur-md">
        <div className="px-4 md: px-10 h-16 flex items-center justify-between max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg">
              <Icon name="school" />
            </div>
            <h2 className="text-lg font-bold">QuizApp</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-6">
              <Link
                href="/student/courses"
                className="text-text-secondary hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Icon name="dashboard" size="sm" />
                Dashboard
              </Link>
              <Link
                href="/student/courses"
                className="text-white text-sm font-medium flex items-center gap-2"
              >
                <Icon name="library_books" size="sm" />
                Khoá học
              </Link>
              <Link
                href="/student/profile"
                className="text-text-secondary hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Icon name="person" size="sm" />
                Hồ sơ
              </Link>
            </nav>
            <div
              className="bg-cover rounded-full size-9 ring-2 ring-primary/50"
              style={{
                backgroundImage:
                  "url('https://api.dicebear.com/7. x/avataaars/svg? seed=student')",
              }}
            />
          </div>
          <button className="md:hidden text-white">
            <Icon name="menu" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full py-8 px-4 md:px-6">
        <div className="max-w-[1000px] w-full flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
            <Link href="/student/courses" className="hover:text-primary">
              Khoá học
            </Link>
            <Icon name="arrow_forward_ios" className="text-[12px]" />
            <Link href="#" className="hover:text-primary">
              Lập trình Web
            </Link>
            <Icon name="arrow_forward_ios" className="text-[12px]" />
            <span className="text-white">Mid-term Exam</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
                Xem lại: Cấu trúc dữ liệu & Giải thuật
              </h1>
              <p className="text-text-secondary text-base">
                Đã nộp vào 14:30, 24 Tháng 10, 2023
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Icon name="flag" size="sm" className="mr-2" />
                Báo lỗi
              </Button>
              <Link href={`/student/quiz/result/${params.id}`}>
                <Button size="sm">
                  <Icon name="arrow_back" size="sm" className="mr-2" />
                  Thoát xem lại
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left:  Questions Stream */}
            <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
              {filteredQuestions.map((question) => (
                <Card
                  key={question.id}
                  className="overflow-hidden"
                  id={`q${question.id}`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-border-dark bg-slate-50/50 dark:bg-[#222630]">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold">
                        Câu hỏi {question.number}
                      </h3>
                      <Badge variant="default">{question.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {question.isCorrect !== null &&
                        (question.isCorrect ? (
                          <Badge
                            variant="success"
                            className="flex items-center gap-1"
                          >
                            <Icon name="check_circle" size="sm" />
                            Đúng
                          </Badge>
                        ) : (
                          <Badge
                            variant="error"
                            className="flex items-center gap-1"
                          >
                            <Icon name="cancel" size="sm" />
                            Sai
                          </Badge>
                        ))}
                      {question.isCorrect === null && (
                        <Badge
                          variant="warning"
                          className="flex items-center gap-1"
                        >
                          <Icon name="hourglass_empty" size="sm" />
                          Đang xử lý
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Question Body */}
                  <div className="p-5 md:p-6 flex flex-col gap-6">
                    <p className="text-base md:text-lg leading-relaxed font-medium">
                      {question.text}
                    </p>

                    {question.imageUrl && (
                      <div className="w-full max-w-md h-48 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                        <img
                          src={question.imageUrl}
                          alt="Question"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Multiple Choice Options */}
                    {question.options && (
                      <div className="flex flex-col gap-3">
                        {question.options.map((option) => (
                          <AnswerOption
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            name={`question_${question.id}`}
                            isSelected={question.userAnswer === option.value}
                            isCorrect={question.correctAnswer === option.value}
                            isIncorrect={
                              question.userAnswer === option.value &&
                              question.correctAnswer !== option.value
                            }
                            showResult
                            readOnly
                          />
                        ))}
                      </div>
                    )}

                    {/* Essay Answer */}
                    {question.type === "Tự luận" && (
                      <>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                            Câu trả lời của bạn
                          </span>
                          <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#161a23] border border-slate-200 dark:border-border-dark text-slate-700 dark:text-slate-300 italic">
                            "{question.userAnswer}"
                          </div>
                        </div>
                        {question.explanation && (
                          <div className="flex flex-col gap-2">
                            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                              Đáp án mẫu / Gợi ý
                            </span>
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 text-slate-700 dark:text-slate-300">
                              {question.explanation}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Right:  Sticky Navigation */}
            <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
              <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-border-dark">
                  <h3 className="text-base font-bold">Danh sách câu hỏi</h3>
                  <div className="mt-2 flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-success" />
                      Đúng
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-error" />
                      Sai
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="size-2 rounded-full bg-orange-400" />
                      Chờ
                    </div>
                  </div>
                </div>

                <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q) => (
                      <a
                        key={q.id}
                        href={`#q${q.id}`}
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg font-bold hover:opacity-90 transition shadow-sm ${
                          q.isCorrect === true
                            ? "bg-success text-white shadow-success/20"
                            : q.isCorrect === false
                            ? "bg-error text-white shadow-error/20"
                            : "bg-orange-400 text-white shadow-orange-500/20"
                        }`}
                      >
                        {q.number}
                        {q.isCorrect === true && (
                          <Icon name="check" className="text-[16px]" />
                        )}
                        {q.isCorrect === false && (
                          <Icon name="close" className="text-[16px]" />
                        )}
                        {q.isCorrect === null && (
                          <Icon
                            name="hourglass_top"
                            filled
                            className="text-[16px]"
                          />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-border-dark bg-slate-50/50 dark:bg-[#161a23]">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-success h-2 rounded-full"
                      style={{ width: "70%" }}
                    />
                  </div>
                  <p className="text-xs text-center text-slate-500 dark: text-slate-400">
                    Bạn đã trả lời đúng 7/10 câu hỏi
                  </p>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
