/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 图片所在域名白名单设置
    domains: ['img1.mukewang.com']
  }
}

const removeImports = require('next-remove-imports')()

module.exports = removeImports(nextConfig)
