import path from "node:path"
import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env"
// import { sentryVitePlugin } from "@sentry/vite-plugin"
import react from "@vitejs/plugin-react"
import { internalIpV4 } from "internal-ip"
import { visualizer } from "rollup-plugin-visualizer"
import { type PluginOption, defineConfig } from "vite"
import bundlesize from "vite-plugin-bundlesize"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"
import topLevelAwait from "vite-plugin-top-level-await"
import tsconfigPaths from "vite-tsconfig-paths"
// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM)

type WorkerFormat = "es" | "iife"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  worker: { format: "es" as WorkerFormat },
  build: {
    // using hidden sourcemap to avoid the vscode type error
    sourcemap: "hidden" as unknown as boolean, // Source map generation must be turned on
    chunkSizeWarningLimit: 4800,
    rollupOptions: {
      treeshake: true,
    },
  },

  preview: {
    port: 1420,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["events"],
  },
  plugins: [
    bundlesize({ limits: [{ name: "**/*", limit: "4 mB" }] }),
    react(),
    tsconfigPaths(),
    chunkSplitPlugin(),
    visualizer({ open: true }) as PluginOption,
    ValidateEnv({
      VITE_BFF_API_URL: Schema.string(),
    }),
    topLevelAwait(),
    // sentryVitePlugin({
    //   org: "incmix",
    //   project: process.env.SENTRY_PROJECT,
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    // }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: mobile ? "0.0.0.0" : false,
    hmr: mobile
      ? {
          protocol: "ws",
          host: await internalIpV4(),
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}))
