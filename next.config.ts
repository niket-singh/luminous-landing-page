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
};

export default nextConfig;
