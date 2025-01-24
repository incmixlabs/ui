/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@incmix/ui",
    "@incmix/ui",
    "@incmix/utils/i18n",
    "@incmix/store",
    "@incmix/pages",
  ],
}

module.exports = nextConfig
