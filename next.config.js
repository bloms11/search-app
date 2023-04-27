/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    distDir: "build",
    output: 'standalone'
  },
}

module.exports = nextConfig
