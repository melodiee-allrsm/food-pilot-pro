import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { box: "h-7 w-7", icon: "h-4 w-4", text: "text-base" },
  md: { box: "h-9 w-9", icon: "h-5 w-5", text: "text-lg" },
  lg: { box: "h-11 w-11", icon: "h-6 w-6", text: "text-xl" },
};

export const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative flex items-center justify-center rounded-xl bg-gradient-hero shadow-glow", s.box)}>
        <Utensils className={cn("text-primary-foreground", s.icon)} strokeWidth={2.25} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", s.text)}>
          Food<span className="text-primary">Pilot</span>
        </span>
      )}
    </div>
  );
};
