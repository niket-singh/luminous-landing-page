import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small muted section label. The reference sets these in plain sentence case
 * rather than tracked-out uppercase — the restraint is the point.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cn("t-eyebrow mb-4", className)}>{children}</p>;
}

interface SectionHeadingProps {
  eyebrow?: string;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  children,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={cn("t-h2", className)}>{children}</Tag>
    </>
  );
}
