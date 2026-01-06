import { HTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

export interface ClassCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  code: string;
  semester: string;
  coverImage?: string;
  status: "active" | "archived" | "pending";
  studentCount: number;
  quizCount: number;
}

const ClassCard = forwardRef<HTMLDivElement, ClassCardProps>(
  (
    {
      className,
      id,
      name,
      code,
      semester,
      coverImage,
      status,
      studentCount,
      quizCount,
      ...props
    },
    ref
  ) => {
    const statusConfig = {
      active: { label: "Active", variant: "success" as const },
      archived: { label: "Archived", variant: "default" as const },
      pending: { label: "Pending", variant: "warning" as const },
    };

    const config = statusConfig[status];
    const isArchived = status === "archived";

    return (
      <Card
        ref={ref}
        className={cn(
          "group overflow-hidden",
          isArchived && "opacity-75",
          className
        )}
        hover
        {...props}
      >
        {/* Cover Image */}
        <div
          className={cn(
            "h-32 w-full bg-cover bg-center relative overflow-hidden",
            isArchived && "grayscale"
          )}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          )}
          <div
            className={cn(
              "absolute inset-0 transition-colors",
              isArchived ? "bg-black/40" : "bg-black/20 group-hover:bg-black/10"
            )}
          />

          <div className="absolute top-3 right-3">
            <Badge variant={config.variant} className="backdrop-blur-md">
              {config.label}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-slate-700 dark: text-slate-300">
            {code}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className={cn(
                  "text-lg font-bold leading-tight mb-1 transition-colors",
                  isArchived
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-900 dark:text-white group-hover:text-primary"
                )}
              >
                {name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {semester}
              </p>
            </div>
            <button className="text-slate-400 hover: text-slate-900 dark: text-slate-500 dark: hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover: bg-slate-700 transition-colors">
              <Icon name="more_vert" />
            </button>
          </div>

          {/* Stats */}
          <div className="my-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-slate-500 dark: text-slate-400">
              <Icon name="group" size="sm" />
              <span className="font-medium">{studentCount} Students</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 dark: text-slate-400">
              <Icon name="quiz" size="sm" />
              <span className="font-medium">{quizCount} Quizzes</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-2">
            <Link href={`/teacher/classes/${id}`}>
              <Button
                variant={isArchived ? "outline" : "secondary"}
                size="sm"
                className={cn(
                  "w-full",
                  !isArchived && "group-hover:bg-primary group-hover:text-white"
                )}
              >
                <span>{isArchived ? "View Archive" : "Enter Class"}</span>
                <Icon
                  name={isArchived ? "visibility" : "arrow_forward"}
                  size="sm"
                  className="ml-2"
                />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }
);

ClassCard.displayName = "ClassCard";

export default ClassCard;
