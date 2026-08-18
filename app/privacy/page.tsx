import type { Metadata } from "next";
import { LegalPage, type LegalClause } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | AdzzatLabs",
  description:
    "How AdzzatLabs handles your data. Learn about the information we collect, how we use it, and your choices regarding your personal data.",
  alternates: {
    canonical: "/privacy",
  },
};

const CLAUSES: readonly LegalClause[] = [
  {
    heading: "Information we collect",
    body: (
      <p>
        In the current version of the site, we primarily collect information that you choose to
        share with us via the contact form, such as your name, work email, company, and
        high&#8209;level engagement details. We may also collect basic analytics signals (for
        example, page views and referrers) to understand how the website is used.
      </p>
    ),
  },
  {
    heading: "How we use this information",
    body: (
      <p>
        We use contact information to respond to inquiries, schedule conversations, and share
        relevant information about AdzzatLabs&apos;s products and services. Usage metadata helps us
        improve the website, debug issues, and prioritize future product work.
      </p>
    ),
  },
  {
    heading: "Data sharing and retention",
    body: (
      <p>
        We do not sell your personal information. Limited third&#8209;party tools (for example,
        email providers or analytics platforms) may process data on our behalf under appropriate
        agreements. Contact submissions are retained for as long as reasonably necessary to respond
        to you and maintain a record of our relationship, unless deletion is requested or required
        by law.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        If you&apos;d like to access, correct, or delete information we hold about you, please reach
        out to <a href="mailto:contact@adzzat.com">contact@adzzat.com</a>. We&apos;ll do our best to
        respond promptly, subject to applicable legal requirements.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        As AdzzatLabs grows, this policy will be updated to reflect new products, regions, and
        regulatory expectations. When we make material changes, we will update the effective date
        and, where appropriate, surface a clear notice on the site.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      title="How AdzzatLabs handles your data."
      intro={
        <>
          This page is a working draft of our privacy policy. It is provided for informational
          purposes only and does not constitute legal advice. We&apos;ll update this document as our
          product and compliance posture evolve.
        </>
      }
      clauses={CLAUSES}
    />
  );
}
