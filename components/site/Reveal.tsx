"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Stagger in seconds, for sibling items revealed together. */
  delay?: number;
  className?: string;
}

/**
 * A quiet fade-and-lift on first view. Deliberately small (8px, 500ms) — the
 * reference design animates almost nothing, so this stays under the threshold
 * of feeling like an effect.
 *
 * Content renders VISIBLE by default and is only hidden once JS confirms the
 * element is still below the fold. That keeps the markup readable without
 * JavaScript, avoids hiding above-the-fold content behind an observer, and
 * means a failed hydration can never blank the page.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at mount — leave it alone rather than flashing it out.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: state === "shown" && delay ? `${delay}s` : undefined }}
      className={cn(
        state !== "static" &&
          "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        state === "hidden" && "translate-y-2 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
