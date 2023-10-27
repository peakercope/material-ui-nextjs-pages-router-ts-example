const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    esmExternals: true,
    externalDir: true,
  },
  swcMinify: true,
  i18n,
};
