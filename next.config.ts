import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.beta.dofusdb.fr"
      }
    ]
  }
};

export default nextConfig;
