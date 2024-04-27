/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    //   appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
      missingSuspenseWithCSRBailout: false,
    },
    images: {
      domains: ['lh3.googleusercontent.com', 'vwit7toqwgm70frp.public.blob.vercel-storage.com', '0unldvgdvx5ijs8h.public.blob.vercel-storage.com', 'ppltnutovrupswkx.public.blob.vercel-storage.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig