import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

export interface AnswerOptionProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  value: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  showResult?: boolean;
}

const AnswerOption = forwardRef<HTMLInputElement, AnswerOptionProps>(
  (
    {
      className,
      label,
      value,
      isSelected = false,
      isCorrect = false,
      isIncorrect = false,
      showResult = false,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          "group relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
          !showResult &&
            !isSelected &&
            "border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-[#252a35]",
          !showResult &&
            isSelected &&
            "border-primary bg-primary/5 dark:bg-primary/10",
          showResult &&
            isCorrect &&
            "border-success bg-success/5 dark: bg-success/10",
          showResult &&
            isIncorrect &&
            "border-error bg-error/5 dark:bg-error/10",
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          className="sr-only peer"
          value={value}
          {...props}
        />

        <div
          className={cn(
            "flex items-center justify-center size-6 rounded-full border-2 mr-4 shrink-0 transition-colors",
            !showResult &&
              !isSelected &&
              "border-slate-300 dark:border-slate-500",
            !showResult && isSelected && "border-primary bg-primary",
            showResult && isCorrect && "border-success bg-success text-white",
            showResult &&
              isIncorrect &&
              "border-error text-error bg-transparent"
          )}
        >
          {!showResult && isSelected && (
            <div className="size-2. 5 rounded-full bg-white" />
          )}
          {showResult && isCorrect && (
            <Icon name="check" size="sm" className="font-bold" />
          )}
          {showResult && isIncorrect && (
            <Icon name="close" size="sm" className="font-bold" />
          )}
        </div>

        <span
          className={cn(
            "font-medium",
            showResult && isCorrect && "text-slate-800 dark:text-slate-100",
            showResult && isIncorrect && "text-slate-800 dark:text-slate-100",
            !showResult &&
              "text-slate-700 dark: text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
          )}
        >
          {label}
        </span>

        {showResult && isSelected && (
          <span className="absolute right-4 text-xs font-bold uppercase tracking-wider">
            {isCorrect ? (
              <span className="text-success">Bạn đã chọn</span>
            ) : (
              <span className="text-error">Bạn đã chọn</span>
            )}
          </span>
        )}

        {showResult && isCorrect && !isSelected && (
          <span className="absolute right-4 text-xs font-bold text-success uppercase tracking-wider">
            Đáp án đúng
          </span>
        )}

        {!showResult && isSelected && (
          <div className="absolute inset-0 rounded-lg border-2 border-primary opacity-100 pointer-events-none" />
        )}
      </label>
    );
  }
);

AnswerOption.displayName = "AnswerOption";

export default AnswerOption;
