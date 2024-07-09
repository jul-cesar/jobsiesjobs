/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: "/jobs",
                permanent: false
                
            }
        ]
    }
};

export default nextConfig;
