/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apod.nasa.gov',
            },
            {
                protocol: 'https',
                hostname: 'images-assets.nasa.gov',
            },
            {
                protocol: 'https',
                hostname: 'epic.gsfc.nasa.gov',
            },
            {
                protocol: 'https',
                hostname: 'www.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'www.twitter.com',
            },
        ],
    },
};

export default nextConfig;
