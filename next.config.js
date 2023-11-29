/**
 * @type {import('next').NextConfig}
 */

var nextConfig = {
  experimental: {
    largePageDataBytes: 512 * 1000,
    // workerThreads: false,
    cpus: 4,
  },
  staticPageGenerationTimeout: 600,
  async rewrites() {
    return {
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/static-api/:slug*',
          destination: `/404.json`,
        },
      ],
    };
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.lsl$/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
