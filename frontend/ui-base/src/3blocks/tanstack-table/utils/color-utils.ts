/**
 * Shared color utilities for tanstack-table components
 * Provides consistent color palette and utility functions
 */

// Base color palette - matches the unified ColorPicker component
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
