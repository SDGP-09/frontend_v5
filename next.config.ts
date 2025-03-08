// import type { NextConfig } from "next";
//
//
//
// const nextConfig: NextConfig = {
//   images: {
//     domains: ["res.cloudinary.com"], // Add Cloudinary to allowed domains
//   },
// };
//
//
// module.exports = {
//   output: "standalone",
// };
//
// module.exports = {
//   images: {
//
//     domains: ['res.cloudinary.com'],
//     formats: ["image/avif", "image/webp"],
//   },
// };
// module.exports = {
//   images: {
//     domains: ['images.unsplash.com'],
//
//   },
// };
//
//
//
//
//
// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"], // Include both domains
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
