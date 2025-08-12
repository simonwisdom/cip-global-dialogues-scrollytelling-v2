const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // Generate a static export to `out/` for static hosting providers
  output: 'export',
  images: {
    // Required for static export when using next/image
    unoptimized: true,
    domains: ["lab.basement.studio"],
  },
};

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
  ];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
