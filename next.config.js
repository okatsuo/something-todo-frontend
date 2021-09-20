/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    JWT_ENCODED: process.env.JWT_ENCODED
  }
}
