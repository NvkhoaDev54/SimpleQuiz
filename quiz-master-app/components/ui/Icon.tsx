import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  filled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ className, name, filled = false, size = "md", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "material-symbols-outlined",
          {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-xl": size === "lg",
            "text-3xl": size === "xl",
          },
          className
        )}
        style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
        {...props}
      >
        {name}
      </span>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
