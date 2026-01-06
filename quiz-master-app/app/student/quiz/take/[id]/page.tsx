"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import QuestionCard from "@/components/quiz/QuestionCard";
import AnswerOption from "@/components/quiz/AnswerOption";
import QuizTimer from "@/components/quiz/QuizTimer";
import QuizNavigator from "@/components/quiz/QuizNavigator";

export default function TakeQuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([6]);
  const [selectedAnswer, setSelectedAnswer] = useState("c");

  // Mock answered questions for demo
  const answeredQuestions = [1, 2, 3, 4];

  const totalQuestions = 50;
  const quizTitle = "Kiểm tra giữa kỳ - Học kỳ I 2024";
  const subject = "Toán Cao Cấp - MAT101";

  const handleSubmit = () => {
    if (confirm("Bạn có chắc chắn muốn nộp bài?")) {
      router.push(`/student/quiz/result/${params.id}`);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion]
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-4 lg:px-10 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <Icon name="school" size="xl" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">
            Quiz Master
          </h2>
          <div className="h-6 w-px bg-slate-200 dark:border-border-dark mx-2 hidden sm:block" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
            {subject}
          </p>
        </div>
        <div className="flex flex-1 justify-end gap-4 sm:gap-8 items-center">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/student/dashboard"
              className="text-sm font-medium leading-normal text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/student/help"
              className="text-sm font-medium leading-normal text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              Hỗ trợ
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-right hidden md:block">
              <span className="block">Nguyễn Văn A</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Sinh viên
              </span>
            </span>
            <div
              className="bg-cover rounded-full size-9 ring-2 ring-slate-100 dark:ring-border-dark"
              style={{
                backgroundImage:
                  "url('https://api.dicebear.com/7.x/avataaars/svg?seed=student')",
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column:  Question Area */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Quiz Info Header Mobile Only */}
          <div className="lg:hidden bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-border-dark shadow-sm">
            <h1 className="text-xl font-bold leading-tight mb-2">
              {quizTitle}
            </h1>
            <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
              <span>{subject}</span>
              <span className="flex items-center gap-1 text-primary font-medium">
                <Icon name="timer" size="sm" />
                45: 00
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="p-4 lg:px-6 lg:py-4">
            <div className="flex gap-6 justify-between items-center mb-2">
              <p className="text-sm font-medium text-slate-500 dark: text-slate-400">
                Tiến độ làm bài
              </p>
              <p className="text-sm font-bold text-primary">10%</p>
            </div>
            <div className="rounded-full bg-slate-100 dark:bg-[#3b4354] h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: "10%" }}
              />
            </div>
          </Card>

          {/* Question Card */}
          <QuestionCard
            questionNumber={5}
            totalQuestions={50}
            questionText="Cho hàm số f(x) = x³ - 3x + 1. Khẳng định nào sau đây là đúng về cực trị của hàm số?"
            questionType="multiple-choice"
            points={2}
            isFlagged={flaggedQuestions.includes(currentQuestion)}
            onToggleFlag={toggleFlag}
          >
            {/* Answer Options */}
            <div className="flex flex-col gap-3">
              <AnswerOption
                label="A. Hàm số đạt cực đại tại x = 1."
                value="a"
                name="question_5"
                checked={selectedAnswer === "a"}
                onChange={() => setSelectedAnswer("a")}
              />
              <AnswerOption
                label="B. Hàm số đạt cực tiểu tại x = -1."
                value="b"
                name="question_5"
                checked={selectedAnswer === "b"}
                onChange={() => setSelectedAnswer("b")}
              />
              <AnswerOption
                label="C. Hàm số đạt cực đại tại x = -1 và cực tiểu tại x = 1."
                value="c"
                name="question_5"
                checked={selectedAnswer === "c"}
                isSelected={selectedAnswer === "c"}
                onChange={() => setSelectedAnswer("c")}
              />
              <AnswerOption
                label="D. Hàm số không có cực trị."
                value="d"
                name="question_5"
                checked={selectedAnswer === "d"}
                onChange={() => setSelectedAnswer("d")}
              />
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center gap-4 flex-wrap pt-4 border-t border-slate-200 dark:border-border-dark mt-2">
              <Button variant="outline" size="sm">
                <Icon name="arrow_back" size="sm" className="mr-2" />
                Câu trước
              </Button>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" onClick={toggleFlag}>
                  <Icon
                    name="flag"
                    filled={flaggedQuestions.includes(currentQuestion)}
                    size="sm"
                    className="mr-2"
                  />
                  <span className="hidden sm:inline">Đặt cờ</span>
                </Button>
                <Button size="sm">
                  Câu tiếp
                  <Icon name="arrow_forward" size="sm" className="ml-2" />
                </Button>
              </div>
            </div>
          </QuestionCard>
        </section>

        {/* Right Column:  Sidebar (Timer & Navigator) */}
        <aside className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            {/* Timer Card */}
            <QuizTimer initialMinutes={45} onTimeUp={handleSubmit} />

            {/* Question Navigator */}
            <QuizNavigator
              totalQuestions={totalQuestions}
              currentQuestion={currentQuestion}
              answeredQuestions={answeredQuestions}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={setCurrentQuestion}
              onSubmit={handleSubmit}
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
