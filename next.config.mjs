/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "vn6khqensdflnt70.public.blob.vercel-storage.com",
      },
    ],
  },

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/jobs",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
