"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/dashboard/StatCard";
import QuizCard from "@/components/dashboard/QuizCard";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useQuizzes } from "@/lib/hooks/useQuiz";

export default function TeacherDashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const { data: quizzes, isLoading: quizzesLoading } = useQuizzes();

  // Redirect if not authenticated or not a teacher
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading || !user) {
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

  // Calculate stats
  const totalQuizzes = quizzes?.length || 0;
  const activeQuizzes =
    quizzes?.filter((q) => q.status === "active").length || 0;
  const recentQuizzes = quizzes?.slice(0, 5) || [];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#111318] border-r border-border-dark hidden md:flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 text-primary">
            <Icon name="school" size="xl" />
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            QuizMaster
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6">
          {/* User Info */}
          <div className="flex gap-3 items-center p-2 rounded-lg bg-surface-dark/50">
            <div className="rounded-full size-10 bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name?.charAt(0).toUpperCase() || "G"}
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-sm font-medium">
                {user.name || user.email}
              </h2>
              <p className="text-text-secondary text-xs capitalize">
                {user.role}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/teacher/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
            >
              <Icon name="dashboard" />
              <span className="text-sm font-medium">Tổng quan</span>
            </Link>
            <Link
              href="/teacher/quizzes"
              className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
            >
              <Icon name="folder" filled />
              <span className="text-sm font-medium">Ngân hàng câu hỏi</span>
            </Link>
            <Link
              href="/teacher/analytics"
              className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
            >
              <Icon name="analytics" />
              <span className="text-sm font-medium">Phân tích</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
            >
              <Icon name="settings" />
              <span className="text-sm font-medium">Cài đặt</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-border-dark">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-red-400 transition-colors w-full"
          >
            <Icon name="logout" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Chào mừng trở lại, {user.name || "Giáo viên"}! 👋
              </h2>
              <p className="text-text-secondary">
                Quản lý bài kiểm tra và theo dõi tiến độ học sinh
              </p>
            </div>
            <Link href="/teacher/quiz/create">
              <Button variant="primary" size="md">
                <Icon name="add" size="sm" className="mr-2" />
                Tạo quiz mới
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon="folder"
              title="Tổng số quiz"
              value={totalQuizzes.toString()}
              change="+12%"
              trend="up"
            />
            <StatCard
              icon="play_circle"
              title="Quiz đang hoạt động"
              value={activeQuizzes.toString()}
              change="+5%"
              trend="up"
            />
            <StatCard
              icon="group"
              title="Tổng học sinh"
              value="248"
              change="+18%"
              trend="up"
            />
            <StatCard
              icon="insights"
              title="Điểm trung bình"
              value="7.8"
              change="-2%"
              trend="down"
            />
          </div>

          {/* Recent Quizzes */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Quiz gần đây</h3>
              <Link href="/teacher/quizzes">
                <Button variant="secondary" size="sm">
                  Xem tất cả
                  <Icon name="arrow_forward" size="sm" className="ml-2" />
                </Button>
              </Link>
            </div>

            {quizzesLoading ? (
              <div className="text-center py-8">
                <Icon
                  name="hourglass_empty"
                  className="animate-spin mx-auto mb-2"
                />
                <p className="text-text-secondary">Đang tải quiz...</p>
              </div>
            ) : recentQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description || ""}
                    questions={quiz.questions?.length || 0}
                    duration={quiz.timeLimit || 0}
                    participants={0}
                    status={
                      quiz.status === "active"
                        ? "active"
                        : quiz.status === "completed"
                        ? "completed"
                        : "draft"
                    }
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Icon
                  name="quiz"
                  size="xl"
                  className="mx-auto mb-4 text-text-secondary"
                />
                <h4 className="font-semibold mb-2">Chưa có quiz nào</h4>
                <p className="text-text-secondary mb-4">
                  Bắt đầu tạo quiz đầu tiên của bạn
                </p>
                <Link href="/teacher/quiz/create">
                  <Button variant="primary" size="sm">
                    <Icon name="add" size="sm" className="mr-2" />
                    Tạo quiz
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
