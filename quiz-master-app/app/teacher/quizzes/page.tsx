"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface Quiz {
  id: string;
  name: string;
  subject: string;
  icon: string;
  iconColor: string;
  questionCount: number;
  status: "published" | "draft" | "completed";
  createdAt: string;
}

export default function MyQuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const quizzes: Quiz[] = [
    {
      id: "1",
      name: "Mid-term Exam:  Java Core",
      subject: "Lập trình Java",
      icon: "functions",
      iconColor: "blue",
      questionCount: 30,
      status: "published",
      createdAt: "20/10/2023",
    },
    {
      id: "2",
      name: "Intro to Data Science",
      subject: "Khoa học dữ liệu",
      icon: "science",
      iconColor: "orange",
      questionCount: 10,
      status: "draft",
      createdAt: "Hôm nay",
    },
    {
      id: "3",
      name: "Advanced Algorithms",
      subject: "Thuật toán",
      icon: "code",
      iconColor: "pink",
      questionCount: 40,
      status: "published",
      createdAt: "30/08/2023",
    },
    {
      id: "4",
      name: "Chemistry Basics",
      subject: "Chem 101",
      icon: "science",
      iconColor: "teal",
      questionCount: 25,
      status: "published",
      createdAt: "01/11/2023",
    },
    {
      id: "5",
      name: "History of Art",
      subject: "Art 200",
      icon: "palette",
      iconColor: "purple",
      questionCount: 50,
      status: "completed",
      createdAt: "15/09/2023",
    },
  ];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || quiz.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Quiz["status"]) => {
    switch (status) {
      case "published":
        return <Badge variant="success">Đang hoạt động</Badge>;
      case "draft":
        return <Badge variant="warning">Bản nháp</Badge>;
      case "completed":
        return <Badge variant="default">Đã hoàn thành</Badge>;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-gray-200 dark:border-border-dark bg-white dark:bg-background-dark h-screen shrink-0">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2 py-4">
              <div className="bg-primary/10 rounded-xl p-2 flex items-center justify-center">
                <Icon name="school" className="text-primary" size="xl" />
              </div>
              <h1 className="text-xl font-bold leading-normal tracking-tight">
                QuizMaster
              </h1>
            </div>
            {/* Navigation */}
            <div className="flex flex-col gap-1">
              <Link
                href="/teacher/dashboard"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors group"
              >
                <Icon
                  name="dashboard"
                  className="group-hover:text-primary transition-colors"
                />
                <p className="text-sm font-medium">Dashboard</p>
              </Link>
              <Link
                href="/teacher/quizzes"
                className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 text-primary"
              >
                <Icon name="description" filled />
                <p className="text-sm font-bold">My Quizzes</p>
              </Link>
              <Link
                href="/teacher/reports"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors group"
              >
                <Icon
                  name="bar_chart"
                  className="group-hover:text-primary transition-colors"
                />
                <p className="text-sm font-medium">Reports</p>
              </Link>
              <Link
                href="/teacher/students"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors group"
              >
                <Icon
                  name="groups"
                  className="group-hover:text-primary transition-colors"
                />
                <p className="text-sm font-medium">Students</p>
              </Link>
              <div className="h-px bg-gray-200 dark:bg-border-dark my-2 mx-3" />
              <Link
                href="/teacher/settings"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors group"
              >
                <Icon
                  name="settings"
                  className="group-hover:text-primary transition-colors"
                />
                <p className="text-sm font-medium">Settings</p>
              </Link>
            </div>
          </div>
          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-surface-dark">
            <div
              className="bg-cover rounded-full size-10 shrink-0"
              style={{
                backgroundImage:
                  "url('https://api.dicebear.com/7.x/avataaars/svg?seed=teacher')",
              }}
            />
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-bold truncate">Prof. Sarah J. </p>
              <p className="text-xs text-text-secondary truncate">Lecturer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen relative overflow-y-auto bg-background-light dark:bg-[#0f141e]">
        <div className="w-full max-w-[1280px] mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Page Heading & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight tracking-tight">
                My Quizzes
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage, edit, and track performance of your assessments.
              </p>
            </div>
            <Link href="/teacher/quiz/create">
              <Button className="shrink-0">
                <Icon name="add_circle" size="sm" className="mr-2" />
                Create New Quiz
              </Button>
            </Link>
          </div>

          {/* Filters & Search Bar */}
          <Card className="p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="text-slate-400" size="sm" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2. 5 border border-gray-200 dark:border-border-dark rounded-lg bg-gray-50 dark:bg-[#151b26] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus: border-primary text-sm transition-all"
                placeholder="Search quizzes by name or subject..."
              />
            </div>
            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              {[
                { label: "All Statuses", value: "all" },
                { label: "Published", value: "published" },
                { label: "Drafts", value: "draft" },
                { label: "Completed", value: "completed" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`flex h-9 shrink-0 items-center justify-center px-4 rounded-lg text-sm font-bold transition-colors ${
                    activeFilter === filter.value
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-gray-100 dark:bg-[#252e3e] hover:bg-gray-200 dark:hover:bg-[#2f3a4d] text-slate-600 dark:text-slate-300 border border-transparent"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            {/* View Toggle */}
            <div className="hidden lg:flex items-center bg-gray-100 dark:bg-[#151b26] rounded-lg p-1 border border-gray-200 dark: border-border-dark">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${
                  viewMode === "list"
                    ? "bg-white dark:bg-surface-dark text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <Icon name="format_list_bulleted" size="sm" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${
                  viewMode === "grid"
                    ? "bg-white dark: bg-surface-dark text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                <Icon name="grid_view" size="sm" />
              </button>
            </div>
          </Card>

          {/* Data Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-wider border-b border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#151b26]">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                      Quiz Name
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                      Subject
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                      Questions
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">
                      Last Modified
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                  {filteredQuizzes.map((quiz) => (
                    <tr
                      key={quiz.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#1f293a] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`size-10 rounded-lg bg-${quiz.iconColor}-100 dark:bg-${quiz.iconColor}-900/30 flex items-center justify-center text-${quiz.iconColor}-600 dark:text-${quiz.iconColor}-400 shrink-0`}
                          >
                            <Icon name={quiz.icon} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{quiz.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 lg:hidden">
                              {quiz.subject}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                        {quiz.subject}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Icon
                            name="quiz"
                            className="text-[16px] text-slate-400"
                          />
                          <span>{quiz.questionCount} Qs</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(quiz.status)}
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {quiz.createdAt}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2f3a4d] text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                            title="View Analytics"
                          >
                            <Icon name="analytics" />
                          </button>
                          <Link href={`/teacher/quiz/edit/${quiz.id}`}>
                            <button
                              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2f3a4d] text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                              title="Edit Quiz"
                            >
                              <Icon name="edit" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-[#151b26] text-center">
              <button className="text-sm text-primary font-medium hover:text-blue-400 transition-colors">
                View All Quizzes
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
