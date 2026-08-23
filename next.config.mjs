/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.40', "192.168.1.44", "192.168.1.39", "198.168.1.35"],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;