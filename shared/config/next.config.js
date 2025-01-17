/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@incmix-fe/ui",
    "@incmix-fe/ui",
    "@jsprtmnn/utils/i18n",
    "@incmix-fe/store",
    "@incmix-fe/pages",
  ],
}

module.exports = nextConfig
