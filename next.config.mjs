/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*','192.168.1.50'],

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