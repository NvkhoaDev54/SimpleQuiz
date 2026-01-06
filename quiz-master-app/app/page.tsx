import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name="school" size="lg" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              QuizMaster
            </h2>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
            >
              Trang chủ
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
            >
              Giới thiệu
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300"
            >
              Tính năng
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover: text-primary transition-colors text-slate-600 dark:text-slate-300"
            >
              Trợ giúp
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="whitespace-nowrap">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white"
              >
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start gap-6 text-left">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm dark:border-gray-700 dark:bg-surface-dark dark:text-slate-300">
                <span className="mr-1 flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Nền tảng học tập 4.0
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
                Nâng tầm tri thức <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                  trong tầm tay bạn
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Công cụ toàn diện giúp giảng viên tạo bài kiểm tra dễ dàng và
                sinh viên ôn tập hiệu quả. Kết nối, học hỏi và đánh giá năng lực
                mọi lúc, mọi nơi.
              </p>

              <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto min-w-40 hover:scale-105"
                  >
                    <Icon name="rocket_launch" className="mr-2" />
                    <span>Bắt đầu ngay</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-w-40"
                >
                  <Icon name="play_circle" className="mr-2" />
                  <span>Xem demo</span>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-8 flex items-center gap-6 border-t border-gray-200 pt-8 dark:border-gray-800 w-full">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    10k+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Người dùng
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    500+
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Bài giảng
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    4.9
                  </p>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="star" filled size="sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl filter dark:bg-primary/10"></div>
              <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl filter dark:bg-blue-400/10"></div>

              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-700 dark:bg-surface-dark/50 backdrop-blur-sm">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-blue-400/20 flex items-center justify-center">
                  <Icon name="school" className="text-9xl text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-surface-dark/30">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "school",
                  title: "Dành cho Giảng viên",
                  desc: "Tạo ngân hàng câu hỏi, tổ chức thi và nhận báo cáo thống kê chi tiết trong vài giây.",
                },
                {
                  icon: "menu_book",
                  title: "Dành cho Sinh viên",
                  desc: "Ôn tập kiến thức, làm bài thi thử và theo dõi tiến độ học tập cá nhân hóa.",
                },
                {
                  icon: "sync_alt",
                  title: "Đồng bộ Thời gian thực",
                  desc: "Dữ liệu được lưu trữ và đồng bộ hóa tức thì trên mọi thiết bị máy tính và di động.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-surface-dark hover:border-primary/50 transition-colors group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary dark:bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-background-dark py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20 text-primary">
              <Icon name="school" size="sm" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              QuizMaster
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="#"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 transition-colors"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 transition-colors"
            >
              Trung tâm hỗ trợ
            </Link>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 QuizMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
