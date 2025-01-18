import type { Config } from "tailwindcss"
import incmixTailwindPreset from "./src/preset"
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
  ],
  presets: [incmixTailwindPreset],
} satisfies Config

export default config
