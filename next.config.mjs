/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
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
