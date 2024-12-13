/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['apod.nasa.gov', 'images-assets.nasa.gov', 'epic.gsfc.nasa.gov'], // Add the NASA API hostname here
    },
};

export default nextConfig;
