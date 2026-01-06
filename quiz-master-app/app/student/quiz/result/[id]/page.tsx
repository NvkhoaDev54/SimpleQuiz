import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

export default function QuizResultPage({ params }: { params: { id:  string } }) {
  const score = 8. 5;
  const totalScore = 10;
  const percentage = (score / totalScore) * 100;

  return (
    <div className="bg-background-light dark: bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-card-dark/80 backdrop-blur-md">
        <div className="px-4 md:px-10 h-16 flex items-center justify-between max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <Icon name="school" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              QuizApp
            </h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-6">
              <Link href="/student/dashboard" className="text-text-secondary hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                <Icon name="dashboard" size="sm" />
                Dashboard
              </Link>
              <Link href="/student/courses" className="text-white text-sm font-medium flex items-center gap-2">
                <Icon name="library_books" size="sm" />
                Khoá học
              </Link>
              <Link href="/student/profile" className="text-text-secondary hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                <Icon name="person" size="sm" />
                Hồ sơ
              </Link>
            </nav>
            <div className="bg-cover rounded-full size-9 ring-2 ring-primary/50" 
              style={{ backgroundImage:  "url('https://api.dicebear.com/7.x/avataaars/svg?seed=student')" }} 
            />
          </div>
          <div className="md:hidden text-white">
            <Icon name="menu" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full py-8 px-4 md:px-6">
        <div className="max-w-[1000px] w-full flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
            <Link href="/student/courses" className="hover:text-primary">Khoá học</Link>
            <Icon name="arrow_forward_ios" className="text-[12px]" />
            <Link href="#" className="hover:text-primary">Lập trình Web</Link>
            <Icon name="arrow_forward_ios" className="text-[12px]" />
            <span className="text-white">Mid-term Exam</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
                Kết quả:  Mid-term Exam
              </h1>
              <p className="text-text-secondary text-base font-normal">
                Đã nộp vào 14:30, 24 Tháng 10, 2023
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/student/review/${params.id}`}>
                <Button variant="outline" size="sm">
                  <Icon name="visibility" size="sm" className="mr-2" />
                  Xem lại đáp án
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Icon name="download" size="sm" className="mr-2" />
                Tải PDF
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Icon name="replay" size="sm" className="mr-2" />
                Làm lại bài
              </Button>
            </div>
          </div>

          {/* Score and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Circle */}
            <Card className="md:col-span-1 p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
              <div className="relative size-40 rounded-full flex items-center justify-center mb-4"
                style={{ background: `conic-gradient(#135bec ${percentage}%, #282e39 0)` }}>
                <div className="absolute inset-[10px] bg-card-dark rounded-full flex flex-col items-center justify-center">
                  <span className="text-4xl font-black tracking-tight">{score}</span>
                  <span className="text-sm text-text-secondary font-medium">/ {totalScore}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Làm tốt lắm!</h3>
              <p className="text-text-secondary text-sm text-center">
                Bạn đã vượt qua {percentage}% kiến thức của bài kiểm tra này. 
              </p>
            </Card>

            {/* Stats Cards */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon name="check_circle" className="text-6xl text-success" />
                </div>
                <div className="mb-4">
                  <p className="text-text-secondary text-sm font-medium mb-1">Số câu đúng</p>
                  <p className="text-3xl font-bold">17</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1. 5 rounded-full overflow-hidden">
                  <div className="bg-success h-full rounded-full" style={{ width:  "85%" }} />
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon name="cancel" className="text-6xl text-error" />
                </div>
                <div className="mb-4">
                  <p className="text-text-secondary text-sm font-medium mb-1">Số câu sai</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: "15%" }} />
                </div>
              </Card>

              <Card className="p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover: opacity-20 transition-opacity">
                  <Icon name="timer" className="text-6xl text-primary" />
                </div>
                <div className="mb-4">
                  <p className="text-text-secondary text-sm font-medium mb-1">Thời gian làm bài</p>
                  <p className="text-3xl font-bold">14m 20s</p>
                </div>
                <p className="text-xs text-success flex items-center gap-1">
                  <Icon name="bolt" className="text-[14px]" />
                  Nhanh hơn 10%
                </p>
              </Card>
            </div>
          </div>

          {/* Detailed Review Section */}
          <div className="flex flex-col gap-4 mt-4" id="detailed-review">
            <div className="flex items-center justify-between border-b border-border-dark pb-1">
              <div className="flex gap-6">
                <button className="pb-3 border-b-2 border-primary text-primary font-medium text-sm px-1">
                  Tất cả câu hỏi (20)
                </button>
                <button className="pb-3 border-b-2 border-transparent text-text-secondary hover:text-white transition-colors font-medium text-sm px-1">
                  Câu trả lời sai (3)
                </button>
                <button className="pb-3 border-b-2 border-transparent text-text-secondary hover:text-white transition-colors font-medium text-sm px-1">
                  Câu trả lời đúng (17)
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-success" />
                  Đúng
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-error" />
                  Sai
                </div>
              </div>
            </div>

            {/* Question Review Items */}
            <div className="flex flex-col gap-4">
              {/* Correct Answer Example */}
              <Card className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <span className="flex-none flex items-center justify-center size-7 rounded bg-border-dark text-xs font-bold text-text-secondary">
                      01
                    </span>
                    <h3 className="font-medium text-lg leading-snug">
                      Trong CSS, thuộc tính nào được sử dụng để thay đổi màu chữ?
                    </h3>
                  </div>
                  <Badge variant="success">Đúng</Badge>
                </div>
                <div className="pl-10 flex flex-col gap-2">
                  <div className="p-3 rounded border border-border-dark bg-background-dark text-text-secondary text-sm">
                    font-color
                  </div>
                  <div className="p-3 rounded border border-success/30 bg-success/10 text-white text-sm flex justify-between items-center shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    <span>color</span>
                    <Icon name="check_circle" className="text-success" />
                  </div>
                  <div className="p-3 rounded border border-border-dark bg-background-dark text-text-secondary text-sm">
                    text-color
                  </div>
                </div>
              </Card>

              {/* Incorrect Answer Example */}
              <Card className="p-6 flex flex-col gap-4 border-error/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <span className="flex-none flex items-center justify-center size-7 rounded bg-border-dark text-xs font-bold text-text-secondary">
                      02
                    </span>
                    <h3 className="font-medium text-lg leading-snug">
                      HTML là viết tắt của từ gì?
                    </h3>
                  </div>
                  <Badge variant="error">Sai</Badge>
                </div>
                <div className="pl-10 flex flex-col gap-2">
                  <div className="p-3 rounded border border-error/30 bg-error/10 text-white text-sm flex justify-between items-center">
                    <span>Hyperlinks and Text Markup Language</span>
                    <Icon name="cancel" className="text-error" />
                  </div>
                  <div className="p-3 rounded border border-success/30 bg-success/10 text-white text-sm flex justify-between items-center shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    <span>Hyper Text Markup Language</span>
                    <Icon name="check_circle" className="text-success" />
                  </div>
                </div>
                <div className="ml-10 mt-2 p-4 bg-background-dark rounded border border-border-dark">
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Icon name="lightbulb" size="sm" />
                    Giải thích
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    HTML viết tắt của <strong className="text-white">Hyper Text Markup Language</strong> (Ngôn ngữ đánh dấu siêu văn bản). 
                    Nó là ngôn ngữ tiêu chuẩn để tạo ra các trang web. 
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border-dark">
            <Link href="/student/dashboard" className="text-text-secondary hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
              <Icon name="arrow_back" size="sm" />
              Quay lại Dashboard
            </Link>
            <div className="flex gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">
                Thử thách bạn bè
              </Button>
              <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white">
                Bài học tiếp theo
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}