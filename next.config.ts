import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};
module.exports = {
  images: {
<<<<<<< Updated upstream
    domains: ['res.cloudinary.com'],
    formats: ["image/avif", "image/webp"],
  },
};
module.exports = {
  images: {
    domains: ['images.unsplash.com'],

  },
};


// /** @type {import('next').NextConfig} */
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
// };
//
=======
    domains: ['images.unsplash.com'],
  },
}
>>>>>>> Stashed changes


export default nextConfig;
