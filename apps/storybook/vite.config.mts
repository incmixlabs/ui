import react from "@vitejs/plugin-react"
import { PluginOption, defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

type WorkerFormat = "es" | "iife"
// https://vitejs.dev/config/
export default defineConfig(() => ({
  worker: {
    format: "es" as WorkerFormat,
  },
  plugins: [react(), tsconfigPaths()] as PluginOption[],
}))
