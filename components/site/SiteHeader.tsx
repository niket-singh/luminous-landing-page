import { Announcement } from "@/components/site/Announcement";
import { Nav } from "@/components/site/Nav";
import { ANNOUNCEMENT } from "@/lib/site";

/** Announcement ribbon plus the sticky nav — every page opens with this pair. */
export function SiteHeader() {
  return (
    <>
      <Announcement {...ANNOUNCEMENT} />
      <Nav />
    </>
  );
}
