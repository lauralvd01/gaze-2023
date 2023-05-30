/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './supabase-image-loader.js',
  },
}

module.exports = nextConfig

