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

/**
 * Generate a unique color for new dropdown options by finding the first unused color
 * from the palette
 */
export function generateUniqueDropdownColor(existingColors: string[]): string {
  const unusedColor = COLOR_PALETTE.find(
    (color) => !existingColors.includes(color)
  )
  return unusedColor || COLOR_PALETTE[0] // Fallback to first color if all are used
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
export function isValidPaletteColor(color: string): boolean {
  return COLOR_PALETTE.includes(color as any)
}
