// Import the `next-pwa` package using ES module syntax
import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public'
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(pwaConfig)(nextConfig);
