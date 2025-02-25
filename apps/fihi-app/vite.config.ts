import path from "node:path"
import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env"
// import { sentryVitePlugin } from "@sentry/vite-plugin"
import react from "@vitejs/plugin-react"
import { internalIpV4 } from "internal-ip"
import { defineConfig, type PluginOption } from "vite"
import topLevelAwait from "vite-plugin-top-level-await"
import tsconfigPaths from "vite-tsconfig-paths"
import { visualizer } from "rollup-plugin-visualizer"
import bundlesize from "vite-plugin-bundlesize"

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM)

type WorkerFormat = "es" | "iife"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  optimizeDeps: {
    exclude: ["@electric-sql/pglite"],
  },
  assetsInclude: ["**/*.wasm"],
  worker: { format: "es" as WorkerFormat },
  build: {
    sourcemap: "hidden", // Source map generation must be turned on
    chunkSizeWarningLimit: 4800
  },
  preview: {
    port: 1420,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    bundlesize(),
    react(),
    tsconfigPaths(),
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
