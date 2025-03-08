import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//     ],
//   },
// };
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
export default nextConfig;
