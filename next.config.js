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
      'i.pravatar.cc',
      'firebasestorage.googleapis.com'
    ],
  },
  env : {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESAGGINSENDERID: process.env.MESAGGINSENDERID,
    APPID: process.env.APPID
  }
}

module.exports = nextConfig