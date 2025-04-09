/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@incmix/ui2",
    "@incmix/ui2",
    "@incmix/utils/i18n",
    "@incmix/store",
    "@incmix/pages",
  ],
}

module.exports = nextConfig
