import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { Problem } from "@/components/home/Problem";
import { Solution } from "@/components/home/Solution";
import { Research } from "@/components/home/Research";
import { CareersBand } from "@/components/home/CareersBand";
import { SITE_NAME } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adzzatlabs.com";

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Adzzat Labs AI evaluation and routing infrastructure",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: "Global",
      serviceType:
        "AI model evaluation, intelligent routing, human preference data, and RL environments",
      description:
        "Expert evaluation and routing infrastructure for frontier foundation models, powered by Southeast Asia's largest contributor network.",
      url: SITE_URL,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <Research />
        <CareersBand />
      </main>
      <Footer />
    </>
  );
}
