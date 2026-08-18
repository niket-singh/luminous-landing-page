import type { ReactNode } from "react";
import Link from "next/link";
import { Figure } from "@/components/site/Figure";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  description: string;
}

/**
 * The "our data includes" list. No borders, no fill — the reference separates
 * these purely with a hairline and whitespace.
 */
export function DataCard({ title, description }: DataCardProps) {
  return (
    <div className="border-t border-rule pt-6">
      <h3 className="text-[17px] font-semibold leading-snug text-ink">{title}</h3>
      <p className="t-small mt-2 max-w-[42ch]">{description}</p>
    </div>
  );
}

interface PostCardProps {
  title: string;
  description: string;
  kicker: string;
  /** Publication date, or omitted while the post is unpublished. */
  meta?: string;
  /** Omit until the post exists — the card then renders as plain, unlinked content. */
  href?: string;
  image?: string;
  imageAlt?: string;
  imageLabel?: string;
}

export function PostCard({
  title,
  description,
  kicker,
  meta,
  href,
  image,
  imageAlt,
  imageLabel,
}: PostCardProps) {
  const body = (
    <>
      {/* Square, not 16:9 — the post imagery is composed square, and a
          landscape crop would eat ~44% of each frame's height. */}
      <Figure
        src={image}
        alt={imageAlt}
        ratio="square"
        placeholderLabel={imageLabel}
        className={href ? "zoom-figure" : undefined}
      />
      <h3
        className={cn(
          "t-h3 mt-5",
          href && "transition-opacity duration-150 group-hover:opacity-70",
        )}
      >
        {title}
      </h3>
      <p className="t-small mt-3 max-w-[52ch]">{description}</p>
      <div className="mt-5 flex items-center gap-2">
        <span aria-hidden="true" className="size-2 bg-ink" />
        <span className="t-meta text-ink">{kicker}</span>
        <span className="t-meta">&middot;</span>
        <span className="t-meta">{meta ?? "Coming soon"}</span>
      </div>
    </>
  );

  if (!href) return <article>{body}</article>;

  return (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}

interface BannerProps {
  title: string;
  children: ReactNode;
  action: { href: string; label: string };
  className?: string;
}

/** Full-width taupe call-to-action block, closing the page. */
export function Banner({ title, children, action, className }: BannerProps) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-[var(--radius-figure)] bg-taupe",
        "px-8 py-10 sm:px-12 sm:py-14",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="t-h2 text-white">{title}</h2>
          <div className="mt-4 max-w-[52ch] text-sm font-medium leading-relaxed text-white/80">
            {children}
          </div>
        </div>
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-white underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
        >
          {action.label}
          <span aria-hidden="true" className="arrow-nudge">
            &#8599;
          </span>
        </Link>
      </div>
    </div>
  );
}
