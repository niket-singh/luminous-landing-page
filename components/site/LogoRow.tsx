import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Every mark is desaturated, then given the treatment that makes it legible on
 * both themes. `brightness-0` is deliberately not used anywhere: flattening all
 * colour to black destroys marks whose identity comes from internal contrast —
 * Hugging Face loses its eyes and smile and reads as a blob.
 *
 *  - `invert dark:invert-0` — artwork is white-on-transparent, so it needs
 *    inverting to show on paper and leaving alone on the dark theme.
 *  - `dark:invert` — artwork is dark or full-colour; the usual case.
 *  - Hugging Face is the exception. Its face is light with dark features, so
 *    inverting it produces a negative: a dark face with glowing eyes. Instead it
 *    is never inverted, only darkened on the light theme, which preserves the
 *    face-lighter-than-features relationship in both.
 */
const LOGOS = [
  { src: "/logo/openAI.svg", name: "OpenAI", filter: "invert dark:invert-0" },
  { src: "/logo/meta.svg", name: "Meta", filter: "dark:invert" },
  {
    src: "/logo/huggingFace.svg",
    name: "Hugging Face",
    filter: "brightness-[0.45] dark:brightness-100",
  },
  { src: "/logo/langChain.svg", name: "LangChain", filter: "invert dark:invert-0" },
  { src: "/logo/databricks.svg", name: "Databricks", filter: "dark:invert" },
  { src: "/logo/ollama.svg", name: "Ollama", filter: "invert dark:invert-0" },
] as const;

export function LogoRail({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14",
        className,
      )}
    >
      {LOGOS.map((logo) => (
        <li key={logo.name}>
          <Image
            src={logo.src}
            alt={logo.name}
            width={120}
            height={32}
            className={cn("h-5 w-auto opacity-55 grayscale", logo.filter)}
          />
        </li>
      ))}
    </ul>
  );
}
