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
        ],
    },
};

export default nextConfig;

// const nextConfig = {
//     images: {
//         domains: [
//             'apod.nasa.gov',
//             'images-assets.nasa.gov',
//             'epic.gsfc.nasa.gov'
//         ], // Add the NASA API hostname here
//     },
// };

// export default nextConfig;
