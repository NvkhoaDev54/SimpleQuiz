import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  progress?: number;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      title,
      value,
      subtitle,
      icon,
      iconColor = "text-primary",
      trend,
      progress,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("p-5 md:p-6", className)} hover {...props}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <div
            className={cn(
              "p-2 rounded-lg bg-opacity-10",
              iconColor,
              `bg-current`
            )}
          >
            <Icon name={icon} className={iconColor} />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium flex items-center px-1.5 py-0.5 rounded",
                trend.isPositive
                  ? "text-green-500 bg-green-500/10"
                  : "text-red-500 bg-red-500/10"
              )}
            >
              <Icon
                name={trend.isPositive ? "trending_up" : "trending_down"}
                size="sm"
                className="mr-0.5"
              />
              {trend.value}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-slate-500 dark: text-slate-400">
            {subtitle}
          </p>
        )}

        {progress !== undefined && (
          <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                iconColor.replace("text-", "bg-")
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
