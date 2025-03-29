/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "cloudflare:sockets": false,
        };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'swbxrvsh7sbt6vxx.public.blob.vercel-storage.com',
                port: '',
            }
        ]
    }
};

export default nextConfig;
