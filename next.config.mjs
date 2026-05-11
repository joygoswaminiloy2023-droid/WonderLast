/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This is the "Universal" wildcard
      },
    ],
  },
};

export default nextConfig;
