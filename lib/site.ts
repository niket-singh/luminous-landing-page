/**
 * Single source of truth for site identity and navigation.
 *
 * Only routes that actually exist are listed. The content brief also names
 * "Knowledge", "Trust & Safety" and an X account; those have no destination
 * yet, so they are deliberately omitted rather than shipped as dead links.
 */

export const SITE_NAME = "Adzzat Labs";
export const CONTACT_EMAIL = "contact@adzzat.com";
export const LINKEDIN_URL = "https://www.linkedin.com/company/adzzatlabs/";

export const ANNOUNCEMENT = {
  text: "Adzzat works with AI labs and enterprises to evaluate, improve and deploy AI models more reliably",
  href: "/research",
  linkLabel: "Read blog",
} as const;

export const NAV_LINKS = [
  { href: "/research", label: "Research & Blog" },
  { href: "/products", label: "Products" },
  { href: "/for-enterprises", label: "For Enterprises" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Lab",
    links: [
      { href: "/research", label: "Research & Blog" },
      { href: "/datasets", label: "Datasets" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/products", label: "Products" },
      { href: "/for-enterprises", label: "For Enterprises" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    heading: "Social",
    links: [{ href: LINKEDIN_URL, label: "LinkedIn", external: true }],
  },
  {
    heading: "Terms & Policies",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
] as const;
