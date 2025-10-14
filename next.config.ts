import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HF_TOKEN: process.env.HF_TOKEN ?? "",
  },
};

export default nextConfig;
