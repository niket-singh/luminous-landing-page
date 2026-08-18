import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Container, Section } from "@/components/site/Container";
import { SectionHeading } from "@/components/site/Heading";
import { PostCard } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { ALL_POSTS, RESEARCH_AREAS } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Training Data Research — Adzzat Labs",
  description:
    "Research into evaluation quality, intelligent routing, human judgment at scale, and the data curation methods behind reliable AI.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <Container>
            <Reveal>
              <p className="t-eyebrow mb-4">Research</p>
              <h1 className="t-display">Data quality makes all the difference.</h1>
              <p className="t-lead mt-5">
                We&rsquo;re driven by the conviction that model performance is fundamentally bounded
                by evaluation quality. Through expert collaboration, rigorous curation
                methodologies, and deep domain expertise, we research infrastructure that powers
                tomorrow&rsquo;s reliable AI.
              </p>
            </Reveal>
          </Container>
        </section>

        <Section tone="alt">
          <Container>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
              {ALL_POSTS.map((post, index) => (
                <Reveal key={post.title} delay={Math.min(index, 3) * 0.05}>
                  <PostCard {...post} imageLabel="Post image" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Core research areas">
                Where we focus.
              </SectionHeading>
            </Reveal>

            <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {RESEARCH_AREAS.map((area, index) => (
                <Reveal key={area.title} delay={index * 0.05}>
                  <div className="border-t border-rule pt-6">
                    <h2 className="t-h3">{area.title}</h2>
                    <p className="t-small mt-2">{area.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
