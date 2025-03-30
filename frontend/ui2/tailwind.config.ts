import { incmixTailwindPreset } from "./src/style/preset"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "!./node_modules/**",
  ],
  presets: [incmixTailwindPreset],
}

export default config
