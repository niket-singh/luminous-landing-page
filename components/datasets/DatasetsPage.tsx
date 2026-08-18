import Image from "next/image";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container, Section } from "@/components/site/Container";
import { SectionHeading } from "@/components/site/Heading";
import { Banner } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { Catalogue } from "@/components/datasets/Catalogue";

const METHOD_POINTS = [
  {
    title: "Trained collection network",
    description:
      "Every contributor is onboarded, briefed per taxonomy, and monitored for capture quality across households, shops and factory floors.",
  },
  {
    title: "Verified at every step",
    description:
      "Multi-stage QA on framing, lighting, task completion and metadata before a single clip enters a delivery batch.",
  },
  {
    title: "Consented & anonymised",
    description:
      "All footage is collected with informed consent, PII-scrubbed, and referenced by anonymised codes end to end.",
  },
] as const;

const PARTNERS = [
  { src: "/partners/service-robot-co.png", alt: "Service Robot Co.", width: 206 },
  { src: "/partners/merit-data.png", alt: "Merit Data", width: 96 },
] as const;

export function DatasetsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Container>
            <Reveal>
              <p className="t-eyebrow mb-4">Physical intelligence &mdash; dataset catalogue</p>
              <h1 className="t-display">Robotics data, captured in the real world.</h1>
              <p className="t-lead mt-5">
                Egocentric video, teleoperation traces, tactile glove streams and annotated
                manipulation data &mdash; collected by trained workers across residential,
                commercial and industrial environments.
              </p>
              <p className="t-body mt-5">
                Off-the-shelf packs ship today; custom collections are scoped to your embodiment.
              </p>

              <div className="mt-10">
                <p className="t-meta">Co-branded OTS data with</p>
                {/*
                  Partner marks are opaque black-on-white PNGs with no alpha, so
                  a filter would black out the whole rectangle. Multiply drops the
                  white ground on paper; inverted screen does the same on dark.
                */}
                <div className="mt-4 flex flex-wrap items-center gap-8">
                  {PARTNERS.map((partner) => (
                    <Image
                      key={partner.src}
                      src={partner.src}
                      alt={partner.alt}
                      width={partner.width}
                      height={32}
                      className="h-7 w-auto opacity-70 mix-blend-multiply dark:opacity-60 dark:mix-blend-screen dark:invert"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <Section tone="alt">
          <Catalogue />
        </Section>

        <Section>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="How it&rsquo;s built">
                Collected by people, verified by process.
              </SectionHeading>
            </Reveal>

            <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
              {METHOD_POINTS.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.05}>
                  <div className="border-t border-rule pt-6">
                    <h3 className="text-[17px] font-semibold leading-snug text-ink">
                      {point.title}
                    </h3>
                    <p className="t-small mt-2">{point.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <section className="pb-20 sm:pb-28">
          <Container>
            <Reveal>
              <Banner
                title="Need a different embodiment, geography or sensor rig?"
                action={{ href: "/get-started", label: "Request a custom collection" }}
              >
                We scope custom collections &mdash; stereo rigs, tactile gloves, IMU-fused capture,
                task taxonomies of your choice &mdash; and deliver first samples within days.
              </Banner>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
