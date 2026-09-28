import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — required for Chrome extension (no Node.js server)
  output: "export",

  // Output the static build into extension/ so manifest.json and
  // the built HTML/JS/CSS all live in the same folder
  distDir: "extension/out",

  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },

  // Extensions don't use trailing slashes in paths
  trailingSlash: false,
};

export default nextConfig;
