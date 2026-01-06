import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface QuizNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: number[];
  flaggedQuestions: number[];
  onQuestionSelect: (questionNumber: number) => void;
  onSubmit?: () => void;
}

export default function QuizNavigator({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  flaggedQuestions,
  onQuestionSelect,
  onSubmit,
}: QuizNavigatorProps) {
  return (
    <Card className="sticky top-6">
      <div className="p-4 border-b border-slate-100 dark:border-border-dark">
        <h3 className="text-base font-bold dark:text-white mb-1">
          Danh sách câu hỏi
        </h3>
        <p className="text-xs text-slate-500 dark: text-slate-400">
          Nhấn vào số để chuyển câu hỏi
        </p>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-primary" />
            <span>Đã làm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-amber-500" />
            <span>Đánh dấu</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full border border-slate-300 dark:border-slate-600" />
            <span>Chưa làm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full border-2 border-primary bg-primary/20" />
            <span>Hiện tại</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
            (num) => {
              const isAnswered = answeredQuestions.includes(num);
              const isFlagged = flaggedQuestions.includes(num);
              const isCurrent = num === currentQuestion;

              return (
                <button
                  key={num}
                  onClick={() => onQuestionSelect(num)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded text-sm font-medium transition-colors relative",
                    isCurrent &&
                      "bg-primary/20 border-2 border-primary text-primary font-bold shadow-sm",
                    !isCurrent &&
                      isAnswered &&
                      "bg-primary text-white hover:bg-blue-600",
                    !isCurrent &&
                      isFlagged &&
                      !isAnswered &&
                      "bg-amber-500 text-white hover:bg-amber-600",
                    !isCurrent &&
                      !isAnswered &&
                      !isFlagged &&
                      "bg-slate-100 dark:bg-[#282e39] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  {num}
                  {isFlagged && !isCurrent && (
                    <span className="absolute top-0.5 right-0.5 size-1.5 bg-white rounded-full" />
                  )}
                </button>
              );
            }
          )}
        </div>

        <div className="h-px bg-slate-200 dark: border-border-dark my-2" />

        {/* Submit Button */}
        {onSubmit && (
          <Button onClick={onSubmit} className="w-full" variant="primary">
            <span className="material-symbols-outlined mr-2">check_circle</span>
            Nộp bài
          </Button>
        )}
      </div>

      <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 m-4 border border-blue-100 dark:border-blue-900/30 flex gap-3">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 shrink-0">
          info
        </span>
        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          Hệ thống sẽ tự động nộp bài khi hết thời gian. Hãy kiểm tra kỹ các câu
          hỏi được đánh dấu trước khi nộp.
        </p>
      </div>
    </Card>
  );
}
