/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]); // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media.graphassets.com"],
  },
};

module.exports = withTM(nextConfig);
