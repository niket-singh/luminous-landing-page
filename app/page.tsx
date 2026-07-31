import { AdzzatLabsLandingPage } from "@/components/revamp/AdzzatLabsLandingPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adzzatlabs.com";

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AdzzatLabs",
      url: SITE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AdzzatLabs frontier AI data pipelines",
      provider: {
        "@type": "Organization",
        name: "AdzzatLabs",
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
      <AdzzatLabsLandingPage />
    </>
  );
}
