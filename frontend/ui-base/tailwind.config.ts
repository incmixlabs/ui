import type { Config } from "tailwindcss"
import incmixTailwindPreset from "./src/preset"
const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./shadcn/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx}",
    "./stories/**/*.{mdx}",
  ],
  presets: [incmixTailwindPreset],
} satisfies Config

export default config
