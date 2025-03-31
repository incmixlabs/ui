import type { Config } from "tailwindcss"
import { incmixTailwindPreset } from "./src/style/preset"

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "!./node_modules/**"],
  presets: [incmixTailwindPreset],
}

export default config
