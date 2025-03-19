// https://github.com/viktorbonino/radix-themes-tw
// need to use above
// /* https://www.youtube.com/watch?v=6zMa4qK63hQ */

import aspectRatio from "@tailwindcss/aspect-ratio"
import containerQueries from "@tailwindcss/container-queries"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import defaultTheme from "tailwindcss/defaultTheme"
import { createPlugin } from "windy-radix-palette"
import windyTypography from "windy-radix-typography"

const colors = createPlugin()
const _config = {
  darkMode: ["class"],
  content: ["./*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 200ms ease-in-out",
        "collapsible-up": "collapsible-up 200ms ease-in-out",
      },
    },
  },
} satisfies Config

// Functions to generate RadixUI Theme tags for tailwind.
// See [https://blog.soards.me/posts/radix-colors-with-tailwind/] for more details.
function generateColorScale(name: string): Record<string, string> {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ]
  }).flat()

  const objScale = Object.fromEntries(scale)

  return objScale
}

const radiusScale: Record<string, string> = {
  1: "var(--radius-1)",
  2: "var(--radius-2)",
  3: "var(--radius-3)",
  4: "var(--radius-4)",
  5: "var(--radius-5)",
  6: "var(--radius-6)",
}

export const incmixTailwindPreset: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  presets: [windyTypography],
  darkMode: ["class"],
  theme: {
    extend: {
      spacing: {
        navbar: "var(--navbar-height)",
        sidebar: "var(--sidebar-width)",
      },
      colors: {
        background: colors.alias("gray.1"),
        foreground: colors.alias("gray.12"),

        muted: {
          DEFAULT: colors.alias("gray.4"),
          foreground: colors.alias("gray.11"),
        },

        card: {
          DEFAULT: colors.alias("gray.1"),
          foreground: colors.alias("gray.12"),
          "file-background": "hsl(var(--file-card-background))",
        },

        popover: {
          DEFAULT: colors.alias("gray.1"),
          foreground: colors.alias("gray.12"),
        },

        input: colors.alias("gray.4"),

        primary: {
          DEFAULT: colors.alias("crimson.10"),
          foreground: colors.alias("crimson.1"),
          1: colors.alias("crimson.1"),
          2: colors.alias("crimson.2"),
          3: colors.alias("crimson.3"),
          4: colors.alias("crimson.4"),
          5: colors.alias("crimson.5"),
          6: colors.alias("crimson.6"),
          7: colors.alias("crimson.7"),
          8: colors.alias("crimson.8"),
          9: colors.alias("crimson.9"),
          10: colors.alias("crimson.10"),
          11: colors.alias("crimson.11"),
          12: colors.alias("crimson.12"),
        },

        secondary: {
          DEFAULT: colors.alias("blue.10"),
          foreground: colors.alias("blue.1"),
          1: colors.alias("blue.1"),
          2: colors.alias("blue.2"),
          3: colors.alias("blue.3"),
          4: colors.alias("blue.4"),
          5: colors.alias("blue.5"),
          6: colors.alias("blue.6"),
          7: colors.alias("blue.7"),
          8: colors.alias("blue.8"),
          9: colors.alias("blue.9"),
          10: colors.alias("blue.10"),
          11: colors.alias("blue.11"),
          12: colors.alias("blue.12"),
        },

        accent: {
          ...generateColorScale("accent"),
          DEFAULT: colors.alias("gray.4"),
          foreground: colors.alias("gray.12"),
        },

        destructive: {
          DEFAULT: colors.alias("red.10"),
          foreground: colors.alias("red.1"),
          1: colors.alias("red.1"),
          2: colors.alias("red.2"),
          3: colors.alias("red.3"),
          4: colors.alias("red.4"),
          5: colors.alias("red.5"),
          6: colors.alias("red.6"),
          7: colors.alias("red.7"),
          8: colors.alias("red.8"),
          9: colors.alias("red.9"),
          10: colors.alias("red.10"),
          11: colors.alias("red.11"),
          12: colors.alias("red.12"),
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",

          // secondary sidebar colors
          "secondary-background": "hsl(var(--sidebar-secondary-background))",
          "secondary-header": "hsl(var(--sidebar-secondary-header))",
          "secondary-muted": "hsl(var(--sidebar-secondary-muted))",
          "secondary-text": "hsl(var(--sidebar-secondary-text))",
          "secondary-active": "hsl(var(--sidebar-secondary-active))",
        },

        border: colors.alias("gray.4"),
        ring: colors.alias("gray.4"),

        // Radix Palette
        gray: generateColorScale("gray"),
        red: generateColorScale("red"),
        blue: generateColorScale("blue"),
      },
      borderRadius: {
        ...radiusScale,
        radius: "0.5rem",
      },
      fontFamily: {
        /*        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"], */
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "collapsible-down": "collapsible-down 200ms ease-in-out",
        "collapsible-up": "collapsible-up 200ms ease-in-out",
      },
    },
  },
  plugins: [
    animate,
    typography,
    forms,
    aspectRatio,
    {
      config: colors.plugin.config ?? {},
      handler: colors.plugin.handler,
    },
    {
      config: containerQueries.config ?? {},
      handler: containerQueries.handler,
    },
  ],
}

export default incmixTailwindPreset
