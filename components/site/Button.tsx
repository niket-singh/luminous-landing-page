import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "ghost";
type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-full font-medium " +
  "whitespace-nowrap transition-[opacity,transform] duration-150 hover:opacity-70 " +
  // A press that registers physically without becoming a bounce.
  "active:scale-[0.97] motion-reduce:active:scale-100";

const VARIANTS: Record<ButtonVariant, string> = {
  solid: "bg-shell text-shell-ink",
  ghost: "bg-paper-sunk text-ink",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[13px]",
  md: "px-5 py-2.5 text-sm",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Underlined inline link with the reference's trailing arrow glyph. */
export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1 text-sm font-medium underline",
        "underline-offset-4 transition-opacity duration-150 hover:opacity-70",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="arrow-nudge">
        &#8599;
      </span>
    </Link>
  );
}
