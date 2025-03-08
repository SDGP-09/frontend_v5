import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};
module.exports = {
  images: {

    domains: ['res.cloudinary.com'],
    formats: ["image/avif", "image/webp"],
  },
};
module.exports = {
  images: {
    domains: ['images.unsplash.com'],

  },
};





export default nextConfig;
