/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'i.pravatar.cc'
    ],
  },
}

module.exports = nextConfig