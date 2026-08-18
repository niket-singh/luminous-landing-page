import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The source mark is near-white, so it is normalised to pure black and then
 * inverted in dark mode. That keeps it exactly on the ink colour in both themes
 * without shipping two asset variants.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="AdzzatLabs home" className={cn("inline-flex items-center", className)}>
      <Image
        src="/adzzat-logo.png"
        alt="AdzzatLabs"
        width={300}
        height={100}
        priority
        className="h-7 w-auto brightness-0 dark:invert"
      />
    </Link>
  );
}
