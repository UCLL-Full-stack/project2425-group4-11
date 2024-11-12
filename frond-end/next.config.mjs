import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@styles'] = path.resolve('styles');
    return config;
  },
};

export default nextConfig;