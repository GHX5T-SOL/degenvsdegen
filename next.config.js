/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add transpile packages for Solana wallet adapters if needed
  transpilePackages: ['@solana/wallet-adapter-base', '@solana/wallet-adapter-react', '@solana/wallet-adapter-wallets'],
  // Configure webpack for better module resolution
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  // Enable experimental features for production
  experimental: {
    // Enable server actions if needed
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
  },
  // Optimize for production
  output: 'standalone',
  // Configure images
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable compression
  compress: true,
}

module.exports = nextConfig
