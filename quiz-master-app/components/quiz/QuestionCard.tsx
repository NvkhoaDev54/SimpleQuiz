import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

export interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  questionType: "multiple-choice" | "true-false" | "essay";
  points: number;
  imageUrl?: string;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
}

const QuestionCard = forwardRef<HTMLDivElement, QuestionCardProps>(
  (
    {
      className,
      questionNumber,
      totalQuestions,
      questionText,
      questionType,
      points,
      imageUrl,
      isFlagged = false,
      onToggleFlag,
      children,
      ...props
    },
    ref
  ) => {
    const typeLabels = {
      "multiple-choice": "Trắc nghiệm",
      "true-false": "Đúng/Sai",
      essay: "Tự luận",
    };

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        {/* Question Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-border-dark bg-slate-50/50 dark:bg-[#222630]">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold">Câu hỏi {questionNumber}</h3>
            <Badge variant="default">{typeLabels[questionType]}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">
              {points} Điểm
            </span>
            {onToggleFlag && (
              <button
                onClick={onToggleFlag}
                className="text-slate-400 hover:text-amber-500 transition-colors"
                title="Đánh dấu xem lại"
              >
                <Icon
                  name="flag"
                  filled={isFlagged}
                  size="lg"
                  className={isFlagged ? "text-amber-500" : ""}
                />
              </button>
            )}
          </div>
        </div>

        {/* Question Body */}
        <div className="p-5 md:p-6 flex flex-col gap-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg lg:text-xl font-medium leading-relaxed">
              {questionText}
            </p>
          </div>

          {imageUrl && (
            <div className="my-4 rounded-lg overflow-hidden border border-slate-200 dark: border-border-dark w-fit max-w-full">
              <img
                src={imageUrl}
                alt="Question image"
                className="max-w-full h-auto block"
              />
            </div>
          )}

          {children}
        </div>
      </Card>
    );
  }
);

QuestionCard.displayName = "QuestionCard";

export default QuestionCard;
