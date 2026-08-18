import type { Metadata } from "next";
import { LegalPage, type LegalClause } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | AdzzatLabs",
  description:
    "Terms and conditions for using the AdzzatLabs website. Learn about acceptable use, intellectual property, and our policies.",
  alternates: {
    canonical: "/terms",
  },
};

const CLAUSES: readonly LegalClause[] = [
  {
    heading: "Informational purpose only",
    body: (
      <p>
        The AdzzatLabs website is provided for general information about our company and services.
        Nothing on this site constitutes an offer, commitment, or guarantee of service. Any
        commercial engagement with AdzzatLabs will be governed by a separate written agreement.
      </p>
    ),
  },
  {
    heading: "Acceptable use",
    body: (
      <p>
        You agree not to misuse the website, attempt to gain unauthorized access, or interfere with
        its normal operation (for example, by scraping at an unreasonable rate or probing for
        vulnerabilities). We reserve the right to limit or revoke access if we detect abuse.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        All content on this site &mdash; including copy, visuals, and branding &mdash; is owned by
        or licensed to AdzzatLabs and protected by applicable intellectual property laws. You may
        not reuse, modify, or redistribute this content without our prior written consent, except
        for fair use or as otherwise permitted by law.
      </p>
    ),
  },
  {
    heading: "No warranties",
    body: (
      <p>
        The website is provided on an &quot;as&#8209;is&quot; and &quot;as&#8209;available&quot;
        basis. To the maximum extent permitted by law, we disclaim all warranties and make no
        representations about uptime, accuracy, or suitability of the information presented here.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        If you have questions about these sample terms or would like to discuss a formal
        engagement, please reach out to <a href="mailto:contact@adzzat.com">contact@adzzat.com</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & conditions"
      title="Use of the AdzzatLabs website."
      intro={
        <>
          These sample terms describe, at a high level, how this marketing site may be used. They
          are placeholders and should be reviewed and replaced with production&#8209;ready legal
          language before any contractual reliance.
        </>
      }
      clauses={CLAUSES}
    />
  );
}
