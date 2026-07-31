import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AdzzatLabs",
  description:
    "How AdzzatLabs handles your data. Learn about the information we collect, how we use it, and your choices regarding your personal data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-[#050814] px-6 py-20 text-white md:px-14 md:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="space-y-3">
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.35em] text-(--brand)"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Privacy policy
          </p>
          <h1
            className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            How AdzzatLabs handles your data.
          </h1>
          <p
            className="max-w-2xl text-sm leading-relaxed text-white/75 md:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            This page is a working draft of our privacy policy. It is provided for
            informational purposes only and does not constitute legal advice. We&apos;ll
            update this document as our product and compliance posture evolve.
          </p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-white/80 md:text-[0.95rem]">
          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              1. Information we collect
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              In the current version of the site, we primarily collect information that
              you choose to share with us via the contact form, such as your name, work
              email, company, and high‑level engagement details. We may also collect
              basic analytics signals (for example, page views and referrers) to
              understand how the website is used.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              2. How we use this information
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              We use contact information to respond to inquiries, schedule
              conversations, and share relevant information about AdzzatLabs&apos;s products
              and services. Usage metadata helps us improve the website, debug issues,
              and prioritize future product work.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              3. Data sharing and retention
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              We do not sell your personal information. Limited third‑party tools (for
              example, email providers or analytics platforms) may process data on our
              behalf under appropriate agreements. Contact submissions are retained for
              as long as reasonably necessary to respond to you and maintain a record of
              our relationship, unless deletion is requested or required by law.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              4. Your choices
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              If you&apos;d like to access, correct, or delete information we hold about
              you, please reach out to{" "}
              <a
                href="mailto:contact@adzzat.com"
                className="text-(--brand) underline-offset-4 hover:underline"
              >
                contact@adzzat.com
              </a>
              . We&apos;ll do our best to respond promptly, subject to applicable legal
              requirements.
            </p>
          </div>

          <div>
            <h2
              className="text-sm font-semibold tracking-tight text-white md:text-base"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              5. Changes to this policy
            </h2>
            <p style={{ fontFamily: "var(--font-inter)" }}>
              As AdzzatLabs grows, this policy will be updated to reflect new products,
              regions, and regulatory expectations. When we make material changes, we
              will update the effective date and, where appropriate, surface a clear
              notice on the site.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

