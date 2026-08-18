import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container, Section } from "@/components/site/Container";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Adzzat Labs",
  description:
    "Engineering, operations, and research roles building AI evaluation and deployment infrastructure at Adzzat Labs.",
  alternates: { canonical: "/careers" },
};

const CATEGORIES = [
  {
    name: "Engineering",
    roles: [
      "Software Engineer — Platform/Applied AI (Fullstack)",
      "Software Engineering Intern",
      "Senior Software Engineer — Infrastructure",
      "Senior Software Engineer — Security/Infrastructure",
      "Software Engineer — Routing Infrastructure",
      "Machine Learning Engineer — Quality Intelligence",
      "Staff Platform Engineer — Applied AI",
    ],
  },
  {
    name: "Growth",
    roles: [
      "Growth Associate",
      "Contractor Relations Specialist",
      "Head of Expert Marketplace / Technical GM",
      "Head of Growth",
    ],
  },
  {
    name: "Internal Ops",
    roles: [
      "Business Operations Generalist",
      "People Programs Lead",
      "Business Talent Acquisition Lead",
      "Technical Recruiter",
      "Talent Coordinator",
      "People Operations Lead",
    ],
  },
  {
    name: "Operations",
    roles: [
      "Strategic Projects Lead",
      "Strategic Projects Lead — Coding",
      "Strategic Projects Associate — Coding",
      "Strategic Projects Lead — Healthcare",
    ],
  },
  {
    name: "Research",
    roles: ["Research Scientist — Post Training"],
  },
  {
    name: "Revenue",
    roles: ["Marketing Lead", "GTM Operations Lead", "Engagement Manager"],
  },
] as const;

const TOTAL_ROLES = CATEGORIES.reduce((sum, category) => sum + category.roles.length, 0);

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Container>
            <Reveal>
              <h1 className="t-display">Shape how AI learns.</h1>
              <p className="t-lead mt-5">
                We&rsquo;re hiring across engineering, operations, and research to build the
                evaluation and deployment infrastructure reliable AI depends on.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Application`} external>
                  Apply by email
                </ButtonLink>
                <span className="t-meta">{TOTAL_ROLES} open roles</span>
              </div>
            </Reveal>
          </Container>
        </section>

        <Section tone="alt">
          <Container>
            {CATEGORIES.map((category, index) => (
              <Reveal key={category.name} delay={Math.min(index, 4) * 0.04}>
                <section className="grid gap-4 border-t border-rule py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10">
                  <h2 className="t-h3">{category.name}</h2>
                  <ul className="space-y-3">
                    {category.roles.map((role) => (
                      <li key={role} className="text-[15px] font-medium leading-snug text-ink/80">
                        {role}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </Container>
        </Section>

        <Section>
          <Container width="text">
            <Reveal>
              <div className="border-l-2 border-accent pl-5">
                <h2 className="text-[17px] font-semibold text-ink">
                  Verify the opportunity through official channels
                </h2>
                <p className="t-small mt-2">
                  Adzzat Labs never asks candidates for payment at any stage of hiring. All
                  correspondence comes from an{" "}
                  <span className="font-mono text-[13px]">@adzzat.com</span> address. If you receive
                  an offer or request that looks like it came from us and you are unsure, contact{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-ink underline underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>{" "}
                  before responding.
                </p>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
