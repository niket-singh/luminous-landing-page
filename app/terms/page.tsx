import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | AdzzatLabs",
  description:
    "Terms and conditions for using the AdzzatLabs website. Learn about acceptable use, intellectual property, and our policies.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-[#050814] px-6 py-20 text-white md:px-14 md:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="space-y-3">
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-(--brand)"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Terms &amp; conditions
          </p>
          <h1
            className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Use of the AdzzatLabs website.
          </h1>
          <p
            className="max-w-2xl text-sm leading-relaxed text-white/75 md:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            These sample terms describe, at a high level, how this marketing site may be
            used. They are placeholders and should be reviewed and replaced with
            production‑ready legal language before any contractual reliance.
          </p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-white/80 md:text-[0.95rem]">
          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              1. Informational purpose only
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              The AdzzatLabs website is provided for general information about our company
              and services. Nothing on this site constitutes an offer, commitment, or
              guarantee of service. Any commercial engagement with AdzzatLabs will be
              governed by a separate written agreement.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              2. Acceptable use
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              You agree not to misuse the website, attempt to gain unauthorized access,
              or interfere with its normal operation (for example, by scraping at an
              unreasonable rate or probing for vulnerabilities). We reserve the right to
              limit or revoke access if we detect abuse.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              3. Intellectual property
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              All content on this site—including copy, visuals, and branding—is owned by
              or licensed to AdzzatLabs and protected by applicable intellectual property
              laws. You may not reuse, modify, or redistribute this content without our
              prior written consent, except for fair use or as otherwise permitted by
              law.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              4. No warranties
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              The website is provided on an &quot;as‑is&quot; and &quot;as‑available&quot;
              basis. To the maximum extent permitted by law, we disclaim all warranties
              and make no representations about uptime, accuracy, or suitability of the
              information presented here.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              5. Contact
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              If you have questions about these sample terms or would like to discuss a
              formal engagement, please reach out to{" "}
              <a
                href="mailto:contact@adzzat.com"
                className="text-(--brand) underline-offset-4 hover:underline"
              >
                contact@adzzat.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

