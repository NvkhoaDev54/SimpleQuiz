import { HTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

export interface QuizCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  subject: string;
  description?: string;
  coverImage?: string;
  status: "active" | "draft" | "closed" | "pending";
  duration?: number;
  questionCount?: number;
  studentCount?: number;
  createdAt?: string;
  role?: "student" | "teacher";
}

const QuizCard = forwardRef<HTMLDivElement, QuizCardProps>(
  (
    {
      className,
      id,
      title,
      subject,
      description,
      coverImage,
      status,
      duration,
      questionCount,
      studentCount,
      createdAt,
      role = "student",
      ...props
    },
    ref
  ) => {
    const statusConfig = {
      active: {
        label: "Đang hoạt động",
        variant: "success" as const,
        icon: "play_circle",
      },
      draft: { label: "Bản nháp", variant: "default" as const, icon: "edit" },
      closed: { label: "Đã đóng", variant: "default" as const, icon: "lock" },
      pending: {
        label: "Sắp bắt đầu",
        variant: "warning" as const,
        icon: "schedule",
      },
    };

    const config = statusConfig[status];

    return (
      <Card
        ref={ref}
        className={cn("group overflow-hidden", className)}
        hover
        {...props}
      >
        {/* Cover Image */}
        <div className="h-32 w-full relative overflow-hidden bg-gradient-to-br from-primary/20 to-purple-600/20">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="quiz" className="text-6xl text-primary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute top-3 right-3">
            <Badge variant={config.variant} className="backdrop-blur-md">
              <Icon name={config.icon} size="sm" className="mr-1" />
              {config.label}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-slate-700 dark:text-slate-300">
            {subject}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark: text-white group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            {role === "teacher" && (
              <button className="text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <Icon name="more_vert" />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-400 mt-auto">
            {duration && (
              <div className="flex items-center gap-2">
                <Icon name="schedule" size="sm" />
                <span className="font-medium">{duration} phút</span>
              </div>
            )}
            {questionCount && (
              <div className="flex items-center gap-2">
                <Icon name="quiz" size="sm" />
                <span className="font-medium">{questionCount} câu</span>
              </div>
            )}
            {studentCount !== undefined && (
              <div className="flex items-center gap-2 col-span-2">
                <Icon name="group" size="sm" />
                <span className="font-medium">{studentCount} sinh viên</span>
              </div>
            )}
            {createdAt && (
              <div className="flex items-center gap-2 col-span-2">
                <Icon name="calendar_today" size="sm" />
                <span className="font-medium">Tạo: {createdAt}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 mt-auto border-t border-slate-100 dark:border-border-dark flex gap-2">
            {role === "student" ? (
              <>
                <Link href={`/student/quiz/${id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    Chi tiết
                  </Button>
                </Link>
                {status === "active" && (
                  <Link href={`/student/quiz/take/${id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      Làm bài
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href={`/teacher/quizzes/${id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    Chi tiết
                  </Button>
                </Link>
                <Link
                  href={`/teacher/quizzes/${id}/results`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Kết quả
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

QuizCard.displayName = "QuizCard";

export default QuizCard;
