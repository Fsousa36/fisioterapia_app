import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors",
        variant === "primary" && "bg-primary text-white hover:bg-teal-800",
        variant === "secondary" && "border border-border bg-white text-foreground hover:bg-slate-50",
        variant === "ghost" && "text-foreground hover:bg-slate-100",
        className
      )}
      {...props}
    />
  );
}
