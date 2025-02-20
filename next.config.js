/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'krisii0327-food-ordering-app.s3.amazonaws.com',
          },
        ],
    },
}

module.exports = nextConfig
