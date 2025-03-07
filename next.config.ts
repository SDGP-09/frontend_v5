import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

};

// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
}

export default nextConfig;

