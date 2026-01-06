import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20":
              variant === "primary",
            "bg-slate-200 dark:bg-surface-dark text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700":
              variant === "secondary",
            "border border-slate-300 dark:border-border-dark bg-transparent hover:bg-slate-50 dark:hover:bg-surface-dark":
              variant === "outline",
            "bg-transparent hover:bg-slate-100 dark:hover:bg-surface-dark":
              variant === "ghost",
            "bg-error text-white hover:bg-red-600 shadow-lg shadow-error/20":
              variant === "danger",
            "h-9 px-3 text-sm": size === "sm",
            "h-10 px-4 text-base": size === "md",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
