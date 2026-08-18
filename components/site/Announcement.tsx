import Link from "next/link";

interface AnnouncementProps {
  text: string;
  href: string;
  linkLabel?: string;
}

/**
 * Full-bleed black bar above the nav. Rendered only when the page passes copy,
 * so the site has no empty ribbon when there is nothing to announce.
 */
export function Announcement({ text, href, linkLabel = "Read more" }: AnnouncementProps) {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5 text-center">
        <span className="text-[13px] leading-snug">{text}</span>
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-[13px] font-medium underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
        >
          {linkLabel}
          <span aria-hidden="true" className="arrow-nudge">&#8599;</span>
        </Link>
      </div>
    </div>
  );
}
