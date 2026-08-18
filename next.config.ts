import type { NextConfig } from "next";

const outputMode =
  process.env.OUTPUT_MODE === "export" ? "export" : "standalone";

const nextConfig: NextConfig = {
  output: outputMode,
  images: {
    unoptimized: outputMode === "export",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.adzzatlabs.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  // /contact was the old enquiry route; /get-started replaces it.
  async redirects() {
    return [{ source: "/contact", destination: "/get-started", permanent: true }];
  },
};

export default nextConfig;
