import { KlarveLandingPage } from "@/components/revamp/KlarveLandingPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai.klarve.com";

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Klarve",
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Klarve frontier AI data pipelines",
      provider: {
        "@type": "Organization",
        name: "Klarve",
        url: SITE_URL,
      },
      areaServed: "Global",
      serviceType: "AI training data, RLHF, SFT, evaluation datasets, and agentic workflow traces",
      description:
        "Expert-curated datasets for complex reasoning, alignment, agentic workflows, and model evaluation.",
      url: SITE_URL,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <KlarveLandingPage />
    </>
  );
}
