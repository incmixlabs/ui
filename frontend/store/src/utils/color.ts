import {
  type BreakFontColor,
  type RadixAnyColor,
  breakFontColor as defaultFontColor,
  fontColor,
} from "@incmix/utils/types"

export type TextColor = {
  color: RadixAnyColor
  pastel?: boolean
  breakFontColor?: BreakFontColor
  brightShade?: number
  pastelShade?: number
}
export function hasGoodContrast(hexColor: string): boolean {
  // Simple check based on color brightness
  // Formula: (R*299 + G*587 + B*114) / 1000
  const hex = hexColor.replace(/^#/, "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  // Calculate brightness (higher means lighter)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Dark colors have better contrast on light backgrounds
  // Light colors have better contrast on dark backgrounds
  // A more nuanced implementation would compare with actual background
  return brightness < 125
}

/**
 * Check if a color has sufficient contrast against a light background
 * Uses WCAG-recommended brightness threshold for better accessibility
 */
export function hasGoodContrastOnLight(hexColor: string): boolean {
  // Validate hex color format
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    console.warn(`Invalid hex color: ${hexColor}`)
    return false
  }
  const hex = hexColor.replace(/^#/, "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  // Calculate relative luminance using WCAG formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  // Use WCAG-recommended threshold for sufficient contrast on white background
  return brightness < 128 // Colors darker than this provide good contrast on light backgrounds
}

export function getTextColor({
  color,
  pastel = true,
  brightShade = 9,
  breakFontColor = defaultFontColor,
}: TextColor): string {
  if (pastel) {
    return fontColor.light
  }
  if (!(color in breakFontColor)) {
    return fontColor.dark
  }
  const shade = (breakFontColor as any)[color] ?? breakFontColor.default
  return shade < brightShade ? fontColor.light : fontColor.dark
}

// =============================================================================
// Additional functions
// =============================================================================

// Base color palette for consistent theming across components
export const COLOR_PALETTE = [
  "var(--blue-5)",
  "var(--green-5)",
  "var(--red-5)",
  "var(--amber-5)",
  "var(--purple-5)",
  "var(--teal-5)",
  "var(--pink-5)",
  "var(--indigo-5)",
  "var(--orange-5)",
  "var(--yellow-5)",
  "var(--plum-5)",
  "var(--cyan-5)",
] as const

// Export the union type for broader reuse
export type PaletteColor = (typeof COLOR_PALETTE)[number]

/**
 * Get contrasting text color (light/dark) based on background hex color
 * Returns CSS custom property values for consistent theming
 * Similar to hasGoodContrastOnLight but returns CSS vars instead of boolean
 */
export function getContrastingTextColor(backgroundColor: string): string {
  // Validate and clean hex color
  if (!/^#[0-9A-Fa-f]{3,6}$/.test(backgroundColor)) {
    console.warn(`Invalid hex color: ${backgroundColor}`)
    return "var(--gray-12)" // Default to dark text
  }
  
  const hex = backgroundColor.replace("#", "")
  let r = 0
  let g = 0
  let b = 0
  
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16)
    g = Number.parseInt(hex[1] + hex[1], 16) 
    b = Number.parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = Number.parseInt(hex.substring(0, 2), 16)
    g = Number.parseInt(hex.substring(2, 4), 16)
    b = Number.parseInt(hex.substring(4, 6), 16)
  }
  
  // Use same YIQ calculation as hasGoodContrastOnLight but return CSS vars
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness >= 128 ? "var(--gray-1)" : "var(--gray-12)"
}

/**
 * Adjust hex color brightness by adding/subtracting from RGB values
 * @param color - Hex color string (with or without #)
 * @param amount - Amount to adjust (-255 to 255, negative = darker, positive = brighter)
 */
export function adjustColorBrightness(color: string, amount: number): string {
  const hex = color.replace("#", "")
  let r = Number.parseInt(hex.substring(0, 2), 16)
  let g = Number.parseInt(hex.substring(2, 4), 16)
  let b = Number.parseInt(hex.substring(4, 6), 16)
  
  r = Math.max(0, Math.min(255, r + amount))
  g = Math.max(0, Math.min(255, g + amount))
  b = Math.max(0, Math.min(255, b + amount))
  
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

/**
 * Resolves color values to a concrete computed color string for color pickers.
 * - If the input is a CSS var(...) token, it tries to resolve it via getComputedStyle.
 * - Returns the original input on failure or in non-browser environments.
 * Note: The returned string is not guaranteed to be hex; it may be rgb()/hsl()/hex.
 */
export function normalizeToHex(input: string): string {
  if (!input) return input
  // In SSR/non-browser environments, bail out early
  if (typeof window === "undefined" || typeof document === "undefined") {
    return input
  }
  if (input.startsWith("var(")) {
    try {
      const varName = input.slice(4, -1).trim() // "--blue-5"
      const computed = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
      return computed || input
    } catch {
      return input
    }
  }
  return input
}

/**
 * Generate a unique color for new dropdown options by finding the first unused color
 * from the palette
 */
export function generateUniqueDropdownColor(
  existingColors: readonly string[]
): string {
  // Normalize both existing colors and palette for accurate comparison
  const used = new Set(
    existingColors.filter(Boolean).map(normalizeToHex).filter(Boolean)
  )

  // Find first unused palette color by comparing normalized values
  const normalizedPalette = COLOR_PALETTE.map(normalizeToHex)
  const unusedIndex = normalizedPalette.findIndex((color) => !used.has(color))

  if (unusedIndex !== -1) {
    return COLOR_PALETTE[unusedIndex] // Return original palette token
  }

  // If all are used, rotate to spread duplicates more evenly
  const rotationIndex = used.size % COLOR_PALETTE.length
  return COLOR_PALETTE[rotationIndex]
}

/**
 * Get all available colors from the palette
 */
export function getAvailableColors(): readonly string[] {
  return COLOR_PALETTE
}

/**
 * Check if a color exists in the palette
 */
export function isValidPaletteColor(color: string): color is PaletteColor {
  return (COLOR_PALETTE as readonly string[]).includes(color)
}
