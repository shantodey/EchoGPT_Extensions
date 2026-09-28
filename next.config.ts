import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — required for Chrome extension
  output: "export",

  // Images don't need optimization for extension
  images: {
    unoptimized: true,
  },

  trailingSlash: false,
};

export default nextConfig;
