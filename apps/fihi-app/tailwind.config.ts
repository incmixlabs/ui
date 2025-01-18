import { incmixTailwindPreset } from "@incmix/ui/preset"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../frontend/ui/src/**/*.{ts,tsx}",
    "../../frontend/layouts/**/*.{ts,tsx}",
    "../../frontend/pages/**/*.{ts,tsx}",
    "!./node_modules/**",
  ],
  presets: [incmixTailwindPreset],
}

export default config
