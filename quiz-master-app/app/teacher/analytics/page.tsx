import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function AnalyticsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-screen flex">
      {/* Side Navigation */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-card-light dark:bg-card-dark">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-200 dark: border-slate-800">
          <div className="bg-primary/20 flex items-center justify-center rounded-lg size-10 text-primary">
            <Icon name="school" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">QuizMaster</h1>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 gap-2 flex flex-col">
          <Link
            href="/teacher/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <Icon name="dashboard" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            href="/teacher/quizzes"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <Icon name="description" />
            <span className="text-sm font-medium">Quizzes</span>
          </Link>
          <Link
            href="/teacher/classes"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover: bg-slate-100 hover: text-slate-900 dark: text-slate-400 dark: hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <Icon name="group" />
            <span className="text-sm font-medium">Classes</span>
          </Link>
          <Link
            href="/teacher/analytics"
            className="flex items-center gap-3 rounded-lg bg-primary/10 text-primary px-3 py-2"
          >
            <Icon name="analytics" filled />
            <span className="text-sm font-medium">Analytics</span>
          </Link>
          <Link
            href="/teacher/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <Icon name="settings" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700"
              style={{
                backgroundImage:
                  "url('https://api.dicebear.com/7.x/avataaars/svg?seed=instructor')",
              }}
            />
            <div className="flex flex-col">
              <p className="text-sm font-bold">Dr. Alex Morgan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instructor
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-3 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md sticky top-0 z-10">
          <div className="hidden lg:flex flex-col">
            <h2 className="text-lg font-bold leading-tight">
              Analytics Overview
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon name="search" size="sm" />
              </span>
              <input
                type="text"
                placeholder="Search students or quizzes..."
                className="w-full h-10 rounded-lg border border-slate-200 bg-slate-100 pl-10 pr-4 text-sm focus: border-primary focus:outline-none focus:ring-1 focus: ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              />
            </div>
            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Filters & Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black tracking-tight">
                Performance Analytics
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Deep dive into quiz performance, student statistics, and
                learning trends.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select className="h-10 rounded-lg border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-card-dark dark:text-slate-200 w-full md: w-40">
                <option>All Classes</option>
                <option>CS 101 - Intro</option>
                <option>CS 202 - Advanced</option>
              </select>
              <select className="h-10 rounded-lg border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:border-primary focus:ring-primary dark: border-slate-700 dark: bg-card-dark dark:text-slate-200 w-full md:w-40">
                <option>Last 30 Days</option>
                <option>This Semester</option>
                <option>All Time</option>
              </select>
              <Button size="sm" className="w-full md:w-auto">
                <Icon name="download" size="sm" className="mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <Card className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark: text-slate-400">
                  Average Score
                </p>
                <span className="bg-primary/10 p-1 rounded-md">
                  <Icon name="bar_chart" className="text-primary" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold">78%</h3>
                <span className="flex items-center text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
                  <Icon name="trending_up" className="text-[14px] mr-0.5" />
                  +2.4%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-1.5 rounded-full bg-primary"
                  style={{ width: "78%" }}
                />
              </div>
            </Card>

            {/* KPI 2 */}
            <Card className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark: text-slate-400">
                  Completion Rate
                </p>
                <span className="bg-purple-500/10 p-1 rounded-md">
                  <Icon name="fact_check" className="text-purple-500" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold">92%</h3>
                <span className="flex items-center text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
                  <Icon name="trending_up" className="text-[14px] mr-0.5" />
                  +5.1%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-1.5 rounded-full bg-purple-500"
                  style={{ width: "92%" }}
                />
              </div>
            </Card>

            {/* KPI 3 */}
            <Card className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Participants
                </p>
                <span className="bg-orange-500/10 p-1 rounded-md">
                  <Icon name="groups" className="text-orange-500" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold">145</h3>
                <span className="flex items-center text-xs font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">
                  <Icon name="trending_up" className="text-[14px] mr-0.5" />
                  +12%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Across 3 active quizzes
              </p>
            </Card>

            {/* KPI 4 */}
            <Card className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Avg. Time Spent
                </p>
                <span className="bg-teal-500/10 p-1 rounded-md">
                  <Icon name="timer" className="text-teal-500" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold">24m</h3>
                <span className="flex items-center text-xs font-medium text-slate-400 bg-slate-500/10 px-1.5 py-0.5 rounded">
                  <Icon name="remove" className="text-[14px] mr-0.5" />
                  0%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target: 30m
              </p>
            </Card>
          </div>

          {/* Main Charts Area */}
          <div className="grid grid-cols-1 lg: grid-cols-3 gap-6">
            {/* Line Chart */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">
                    Class Performance History
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Average scores over the last 5 quizzes
                  </p>
                </div>
                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                  <Icon name="more_horiz" />
                </button>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {[78, 65, 88, 72, 92, 55].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-full rounded-t transition-all hover:opacity-80 ${
                        i % 2 === 0 ? "bg-primary" : "bg-blue-400"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-500">Q{i + 1}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Score Distribution */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">Score Distribution</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Student grades spread
                  </p>
                </div>
              </div>
              <div className="flex h-64 items-end justify-between gap-2 px-2 pb-4">
                {[
                  { label: "F", height: 10 },
                  { label: "D", height: 15 },
                  { label: "C", height: 30 },
                  { label: "B", height: 55 },
                  { label: "A", height: 40 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative flex w-full flex-col items-center gap-2"
                  >
                    <div
                      className={`relative w-full rounded-t-md transition-all hover:opacity-80 ${
                        item.label === "B" || item.label === "A"
                          ? "bg-primary"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                      style={{ height: `${item.height}%` }}
                    />
                    <span className="text-xs font-medium text-slate-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Question Difficulty Analysis */}
          <Card>
            <div className="border-b border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold">
                Question Difficulty Analysis
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Questions ranked by incorrect answers
              </p>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                {/* Question 1 */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Q4. What is the time complexity of QuickSort in worst
                      case?
                    </span>
                    <span className="text-sm font-bold text-red-500">
                      65% Incorrect
                    </span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "35%" }}
                    />
                    <div
                      className="h-full bg-red-500"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>

                {/* Question 2 */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-700 dark: text-slate-200">
                      Q2. Which data structure is best for LIFO?
                    </span>
                    <span className="text-sm font-bold text-red-500">
                      42% Incorrect
                    </span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "58%" }}
                    />
                    <div
                      className="h-full bg-red-500"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>

                {/* Question 3 */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-700 dark: text-slate-200">
                      Q9. Identify the correct syntax for a Python function.
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      15% Incorrect
                    </span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "85%" }}
                    />
                    <div
                      className="h-full bg-red-400/50"
                      style={{ width: "15%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-b-xl flex justify-center">
              <button className="text-sm font-bold text-primary hover:underline">
                View All Questions
              </button>
            </div>
          </Card>

          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}
