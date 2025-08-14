import type { StorybookConfig } from "@storybook/react-vite"

import { dirname, join, resolve } from "node:path"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-onboarding"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@/src": resolve(__dirname, "../src"),
        "@/base": resolve(__dirname, "../src/1base"),
        "@/blocks": resolve(__dirname, "../src/3blocks"),
        "@/elements": resolve(__dirname, "../src/2elements"),
        "@/radix-ui": resolve(__dirname, "../radix-ui/components"),
        "@/shadcn-ui": resolve(__dirname, "../shadcn/components/ui"),
        "@/shadcn": resolve(__dirname, "../shadcn")
      }
    }
    return config
  },
}
export default config
