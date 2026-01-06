import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import StatCard from "@/components/dashboard/StatCard";

export default function StudentDashboard() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen bg-surface-light dark:bg-[#111318] border-r border-gray-200 dark:border-slate-800 sticky top-0">
        <div className="flex flex-col h-full p-6 justify-between">
          <div className="flex flex-col gap-8">
            {/* User Profile */}
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-12 shrink-0 border-2 border-primary"
                style={{
                  backgroundImage:
                    "url('https://api.dicebear.com/7.x/avataaars/svg?seed=student')",
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-base font-bold leading-tight">
                  Nguyễn Văn A
                </h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Sinh viên K15
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <Link
                href="/student/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary"
              >
                <Icon name="home" filled />
                <p className="text-sm font-semibold">Trang chủ</p>
              </Link>
              <Link
                href="/student/courses"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Icon name="local_library" />
                <p className="text-sm font-medium">Khóa học của tôi</p>
              </Link>
              <Link
                href="/student/scores"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover: bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Icon name="bar_chart" />
                <p className="text-sm font-medium">Điểm số</p>
              </Link>
              <Link
                href="/student/notifications"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover: bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Icon name="notifications" />
                <p className="text-sm font-medium">Thông báo</p>
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  3
                </span>
              </Link>
              <Link
                href="/student/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover: bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Icon name="settings" />
                <p className="text-sm font-medium">Cài đặt</p>
              </Link>
            </nav>
          </div>

          <Link href="/">
            <Button variant="outline" className="w-full">
              <Icon name="logout" className="mr-2" />
              <span>Đăng xuất</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="bg-cover rounded-full size-8"
              style={{
                backgroundImage:
                  "url('https://api.dicebear.com/7.x/avataaars/svg?seed=student')",
              }}
            />
            <span className="font-bold text-lg text-primary">Quiz App</span>
          </div>
          <button className="text-slate-900 dark:text-white p-2">
            <Icon name="menu" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
          {/* Page Heading */}
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Xin chào, Nguyễn Văn A 👋
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400">
              Chào mừng bạn trở lại! Bạn có 2 bài kiểm tra cần hoàn thành hôm
              nay.
            </p>
          </header>

          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Điểm trung bình"
              value="8.5"
              icon="show_chart"
              iconColor="text-primary"
              progress={85}
            />
            <StatCard
              title="Quiz đã hoàn thành"
              value="12"
              icon="task_alt"
              iconColor="text-purple-600"
              trend={{ value: "+2 tuần này", isPositive: true }}
            />
            <StatCard
              title="Nhiệm vụ cần làm"
              value="3"
              icon="pending_actions"
              iconColor="text-orange-600"
              subtitle="Hạn chót gần nhất:  14: 00 Hôm nay"
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Quick Join CTA */}
              <Card className="p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                      <Icon name="rocket_launch" className="text-primary" />
                      Tham gia nhanh
                    </h2>
                    <p className="text-sm text-slate-500 dark: text-slate-400">
                      Nhập mã bài kiểm tra từ giảng viên để bắt đầu ngay lập
                      tức.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      className="flex-1 bg-gray-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all outline-none"
                      placeholder="Nhập mã Quiz (VD: 123456)"
                    />
                    <Link href="/student/quiz/join">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <span>Tham gia ngay</span>
                        <Icon name="arrow_forward" size="sm" className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Upcoming Quizzes */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Sắp diễn ra</h2>
                  <Link
                    href="/student/quizzes"
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    Xem tất cả
                  </Link>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Quiz Item */}
                  {[
                    {
                      id: 1,
                      title: "Toán Cao Cấp - Chương 3",
                      subject: "TC",
                      time: "14:00 - Hôm nay",
                      status: "active",
                    },
                    {
                      id: 2,
                      title: "Tiếng Anh B1 - Reading",
                      subject: "TA",
                      time: "09:00 - Ngày mai",
                      status: "pending",
                    },
                    {
                      id: 3,
                      title: "Lập trình Web - Final",
                      subject: "LT",
                      time: "20/10/2023",
                      status: "draft",
                    },
                  ].map((quiz) => (
                    <Card
                      key={quiz.id}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`size-12 rounded-xl bg-${
                            quiz.subject === "TC"
                              ? "blue"
                              : quiz.subject === "TA"
                              ? "purple"
                              : "orange"
                          }-100 dark:bg-${
                            quiz.subject === "TC"
                              ? "blue"
                              : quiz.subject === "TA"
                              ? "purple"
                              : "orange"
                          }-900/30 flex items-center justify-center shrink-0 text-primary font-bold`}
                        >
                          {quiz.subject}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-base">{quiz.title}</h3>
                          <p className="text-sm text-slate-500 dark: text-slate-400 flex items-center gap-1">
                            <Icon name="schedule" size="sm" />
                            {quiz.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {quiz.status === "active" ? (
                          <>
                            <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold border border-yellow-200 dark:border-yellow-800">
                              Sắp bắt đầu
                            </span>
                            <Link href={`/student/quiz/${quiz.id}`}>
                              <Button size="sm">Chi tiết</Button>
                            </Link>
                          </>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold border border-gray-200 dark:border-slate-600">
                            Chưa mở
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8">
              {/* Notifications */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Thông báo mới</h2>
                <Card className="p-2">
                  <div className="flex flex-col">
                    {[
                      {
                        icon: "school",
                        color: "blue",
                        title: "Giảng viên đã đăng bài mới",
                        desc: "Bài kiểm tra chương 4 môn Mạng máy tính đã được cập nhật.",
                        time: "1 giờ trước",
                      },
                      {
                        icon: "grade",
                        color: "green",
                        title: "Điểm thi đã có",
                        desc: "Bạn đạt 9.0 điểm môn Cơ sở dữ liệu.",
                        time: "3 giờ trước",
                      },
                    ].map((notif, idx) => (
                      <div key={idx}>
                        <div className="flex gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer relative">
                          {idx === 0 && (
                            <div className="absolute top-4 right-3 size-2 rounded-full bg-red-500" />
                          )}
                          <div
                            className={`size-10 rounded-full bg-${notif.color}-100 dark:bg-${notif.color}-900/20 flex items-center justify-center shrink-0 text-${notif.color}-600`}
                          >
                            <Icon name={notif.icon} size="sm" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold leading-tight">
                              {notif.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                              {notif.desc}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                        {idx === 0 && (
                          <div className="w-full h-px bg-slate-100 dark:bg-slate-700 my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-2 py-2 text-primary text-xs font-bold hover:bg-primary/5 rounded-lg transition-colors">
                    Xem tất cả thông báo
                  </button>
                </Card>
              </div>

              {/* Recent Results */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Kết quả gần đây</h2>
                <Card className="p-4 flex flex-col gap-4">
                  {[
                    {
                      title: "Triết học Mác - Lênin",
                      date: "10/10/2023",
                      score: 9.5,
                    },
                    { title: "Lịch sử Đảng", date: "08/10/2023", score: 8.0 },
                  ].map((result, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-sm font-bold">{result.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Hoàn thành: {result.date}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-lg font-bold text-green-600">
                            {result.score}
                          </p>
                          <p className="text-[10px] text-slate-500">/10</p>
                        </div>
                      </div>
                      {idx === 0 && (
                        <div className="w-full h-px bg-slate-100 dark: bg-slate-700 my-4" />
                      )}
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
