import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/dashboard/StatCard";
import QuizCard from "@/components/dashboard/QuizCard";

export default function TeacherDashboard() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#111318] border-r border-border-dark hidden md:flex flex-col h-full">
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
            <div className="rounded-full size-10 bg-primary/20 flex items-center justify-center text-primary font-bold">
              GA
            </div>
            <div className="flex flex-col">
              <h2 className="text-white text-sm font-medium">Giảng viên A</h2>
              <p className="text-text-secondary text-xs">Khoa CNTT</p>
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
              href="/teacher/courses"
              className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
            >
              <Icon name="menu_book" />
              <span className="text-sm font-medium">Bài giảng</span>
            </Link>
            <Link
              href="/teacher/quizzes"
              className="flex items-center gap-3 px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors"
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
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border-dark bg-[#111318] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-white">
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
                className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-surface-dark text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                placeholder="Tìm kiếm bài kiểm tra..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-text-secondary hover:text-white relative">
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-[#111318]" />
            </button>
            <Link href="/teacher/quizzes/create">
              <Button
                size="sm"
                className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Icon name="add" size="sm" className="mr-2" />
                <span>New Quiz</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-white text-3xl font-bold mb-2">
                  Welcome back, Professor Smith 👋
                </h1>
                <p className="text-text-secondary text-base">
                  Here's what's happening with your classes today.{" "}
                </p>
              </div>
              <Link href="/teacher/quizzes/create" className="md:hidden">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Icon name="add" className="mr-2" />
                  <span>New Quiz</span>
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Quizzes"
                value="12"
                icon="library_books"
                iconColor="text-blue-500"
                trend={{ value: "+2%", isPositive: true }}
              />
              <StatCard
                title="Đang hoạt động"
                value="3"
                icon="play_circle"
                iconColor="text-emerald-500"
                trend={{ value: "+1", isPositive: true }}
              />
              <StatCard
                title="Avg. Class Score"
                value="82%"
                icon="grade"
                iconColor="text-orange-500"
                trend={{ value: "+1. 5%", isPositive: true }}
              />
              <StatCard
                title="Pending Grading"
                value="5"
                icon="pending_actions"
                iconColor="text-red-500"
              />
            </div>

            {/* Performance Chart */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-white text-lg font-bold">
                  Quiz Performance Statistics
                </h3>
                <div className="flex items-center gap-1 bg-[#282e39] rounded-lg p-1 border border-[#363d4a]">
                  <button className="px-3 py-1.5 rounded text-xs font-medium bg-primary text-white shadow-sm">
                    Scores
                  </button>
                  <button className="px-3 py-1.5 rounded text-xs font-medium text-text-secondary hover:text-white hover:bg-[#3d4654] transition-colors">
                    Completion
                  </button>
                  <button className="px-3 py-1.5 rounded text-xs font-medium text-text-secondary hover:text-white hover:bg-[#3d4654] transition-colors">
                    Time
                  </button>
                </div>
              </div>

              <Card className="p-6 bg-[#282e39] border-border-dark">
                <div className="flex h-64 gap-2 w-full">
                  <div className="flex flex-col justify-between h-[85%] text-xs text-text-secondary text-right w-8 shrink-0 pb-1">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>

                  <div className="flex-1 flex flex-col h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between h-[85%] pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-full border-t border-[#363d4a]/50 border-dashed"
                        />
                      ))}
                    </div>

                    {/* Bars */}
                    <div className="flex items-end justify-between h-[85%] relative z-10 gap-2 sm:gap-4 md:gap-8 px-2 md:px-6">
                      {[78, 65, 88, 72, 92, 55].map((height, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-end w-full group h-full"
                        >
                          <div
                            className={`w-full max-w-[64px] ${
                              i % 2 === 0 ? "bg-primary" : "bg-[#3b82f6]"
                            } rounded-t shadow-[0_0_10px_rgba(19,91,236,0.3)] group-hover:bg-blue-400 transition-all duration-300 relative`}
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111318] border border-[#363d4a] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                              Avg: {height}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between items-start h-[15%] pt-3 px-2 md:px-6 gap-2 sm:gap-4 md:gap-8">
                      {[
                        "Bio 101",
                        "Calculus",
                        "History",
                        "Physics",
                        "Chem Lab",
                        "Algebra",
                      ].map((label, i) => (
                        <div key={i} className="w-full text-center">
                          <p className="text-text-secondary text-xs truncate">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Quizzes & Sidebar */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Quizzes Table */}
              <div className="xl:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg font-bold">
                    Recent Quizzes
                  </h3>
                  <Link
                    href="/teacher/quizzes"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <Card className="bg-[#282e39] border-[#363d4a] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#363d4a] bg-[#2f3642]">
                          <th className="p-4 text-xs font-semibold tracking-wide text-text-secondary uppercase">
                            Quiz Name
                          </th>
                          <th className="p-4 text-xs font-semibold tracking-wide text-text-secondary uppercase">
                            Course
                          </th>
                          <th className="p-4 text-xs font-semibold tracking-wide text-text-secondary uppercase">
                            Status
                          </th>
                          <th className="p-4 text-xs font-semibold tracking-wide text-text-secondary uppercase text-right">
                            Submissions
                          </th>
                          <th className="p-4 text-xs font-semibold tracking-wide text-text-secondary uppercase text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#363d4a]">
                        {[
                          {
                            name: "Introduction to Biology",
                            course: "BIO-101",
                            status: "Active",
                            submissions: "32/45",
                            icon: "science",
                            color: "blue",
                          },
                          {
                            name: "Advanced Calculus Midterm",
                            course: "MAT-302",
                            status: "Draft",
                            submissions: "-",
                            icon: "functions",
                            color: "purple",
                          },
                          {
                            name: "World History:  1900s",
                            course: "HIS-201",
                            status: "Closed",
                            submissions: "45/45",
                            icon: "history_edu",
                            color: "orange",
                          },
                        ].map((quiz, idx) => (
                          <tr
                            key={idx}
                            className="hover: bg-[#2f3642] transition-colors group"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`size-10 rounded-lg bg-${quiz.color}-500/20 flex items-center justify-center text-${quiz.color}-500 shrink-0`}
                                >
                                  <Icon name={quiz.icon} />
                                </div>
                                <div>
                                  <p className="text-white font-medium text-sm">
                                    {quiz.name}
                                  </p>
                                  <p className="text-text-secondary text-xs lg:hidden">
                                    {quiz.course}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-text-secondary text-sm">
                              {quiz.course}
                            </td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  quiz.status === "Active"
                                    ? "success"
                                    : quiz.status === "Draft"
                                    ? "warning"
                                    : "default"
                                }
                              >
                                {quiz.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-right text-white text-sm font-medium">
                              {quiz.submissions}
                            </td>
                            <td className="p-4 text-right">
                              <button className="text-text-secondary hover:text-white p-2 rounded hover:bg-[#3d4654] transition-colors">
                                <Icon name="more_vert" size="sm" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-[#363d4a] bg-[#2f3642]/50 text-center">
                    <button className="text-sm text-primary font-medium hover:text-blue-400 transition-colors">
                      View All Quizzes
                    </button>
                  </div>
                </Card>
              </div>

              {/* Sidebar - Announcements & Engagement */}
              <div className="xl:col-span-1 flex flex-col gap-6">
                {/* Announcements */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-lg font-bold">
                    Announcements
                  </h3>
                  <Card className="bg-[#282e39] border-[#363d4a] p-5 flex flex-col gap-4">
                    {[
                      {
                        icon: "info",
                        color: "blue",
                        title: "System Maintenance",
                        desc: "The platform will be undergoing scheduled maintenance this Saturday from 2 AM to 4 AM.",
                        time: "2 hours ago",
                      },
                      {
                        icon: "check_circle",
                        color: "green",
                        title: "Grading Completed",
                        desc: 'Auto-grading for "Physics 101" has finished successfully.',
                        time: "Yesterday",
                      },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 min-w-[32px] h-8 rounded-full bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-500`}
                          >
                            <Icon name={item.icon} size="sm" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium mb-1">
                              {item.title}
                            </p>
                            <p className="text-text-secondary text-xs leading-relaxed">
                              {item.desc}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {item.time}
                            </p>
                          </div>
                        </div>
                        {idx === 0 && (
                          <div className="h-px bg-[#363d4a] w-full my-4" />
                        )}
                      </div>
                    ))}
                  </Card>
                </div>

                {/* Student Engagement */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-lg font-bold">
                    Student Engagement
                  </h3>
                  <Card className="bg-[#282e39] border-[#363d4a] p-6">
                    <div className="flex items-end justify-between h-32 gap-2">
                      {[40, 65, 50, 85, 70, 55, 90].map((height, i) => (
                        <div
                          key={i}
                          className="w-full bg-[#111318] rounded-t-sm relative group flex flex-col justify-end"
                        >
                          <div
                            className={`${
                              i === 4
                                ? "bg-primary"
                                : "bg-primary/40 group-hover:bg-primary"
                            } transition-all w-full rounded-t-sm`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-text-secondary mt-3 font-mono">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day, i) => (
                          <span
                            key={i}
                            className={i === 4 ? "text-white font-bold" : ""}
                          >
                            {day}
                          </span>
                        )
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
