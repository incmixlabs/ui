import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/shadcn": path.resolve(__dirname, "./src/components/base/shadcn"),
      "@/ui": path.resolve(__dirname, "./src/components/base/shadcn"),
      "@/base": path.resolve(__dirname, "./src/components/base"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/utils": path.resolve(__dirname, "./src/lib/utils"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/hooks": path.resolve(__dirname, "./src/hooks")
    }
    /*alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@/shadcn', replacement: path.resolve(__dirname, './src/components/base/shadcn') },
      { find: '@/ui', replacement: path.resolve(__dirname, './src/components/base/shadcn') },
      { find: '@/base', replacement: path.resolve(__dirname, './src/components/base') },
      { find: '@/components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@/utils', replacement: path.resolve(__dirname, './src/lib/utils') },
      { find: '@/lib', replacement: path.resolve(__dirname, './src/lib') },
      { find: '@/hooks', replacement: path.resolve(__dirname, './src/hooks') }
    ]*/
  }
})
