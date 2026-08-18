import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "wide" | "text";

const WIDTHS: Record<ContainerWidth, string> = {
  default: "max-w-[1120px]",
  wide: "max-w-[1280px]",
  text: "max-w-[720px]",
};

interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
}

export function Container({ children, width = "default", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", WIDTHS[width], className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  tone?: "paper" | "alt";
  className?: string;
}

/** Vertical rhythm for every top-level band on the page. */
export function Section({ children, id, tone = "paper", className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "alt" && "bg-paper-alt",
        className,
      )}
    >
      {children}
    </section>
  );
}
