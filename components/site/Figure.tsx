import Image from "next/image";
import { cn } from "@/lib/utils";

type FigureRatio = "wide" | "cinema" | "square" | "portrait";

const RATIOS: Record<FigureRatio, string> = {
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
};

interface FigureProps {
  /** Omit to render the placeholder treatment until real photography lands. */
  src?: string;
  alt?: string;
  ratio?: FigureRatio;
  /** Short label shown on the placeholder so empty slots are self-documenting. */
  placeholderLabel?: string;
  priority?: boolean;
  /** Edge-to-edge treatment: drops the corner radius, since it meets the viewport. */
  bleed?: boolean;
  className?: string;
}

export function Figure({
  src,
  alt = "",
  ratio = "wide",
  placeholderLabel,
  priority = false,
  bleed = false,
  className,
}: FigureProps) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden bg-paper-sunk",
        !bleed && "rounded-[var(--radius-figure)]",
        RATIOS[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={bleed ? "100vw" : "(max-width: 1120px) 100vw, 1120px"}
          className="object-cover grayscale"
        />
      ) : (
        <PlaceholderMark label={placeholderLabel} />
      )}
    </div>
  );
}

function PlaceholderMark({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--rule) 0 1px, transparent 1px 14px)",
        }}
      />
      {label ? (
        <span className="t-meta relative z-10 px-4 text-center">{label}</span>
      ) : null}
    </div>
  );
}
