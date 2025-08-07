import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
    coverage: {
      include: ["src"],
    },
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
})
