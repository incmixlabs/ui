import {
  type BreakFontColor,
  type RadixAnyColor,
  breakFontColor as defaultFontColor,
  fontColor,
} from "@incmix/utils/types"

/**
  breakFontColor as defaultFontColor,
  fontColor,
} from "@incmix/utils/types"
 * Simple accessibility check for color contrast with background
 * Returns true if the color is likely to have good contrast
 */

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
  // @ts-ignore
  if (breakFontColor?.[color] === undefined) {
    return fontColor.dark
  }
  // @ts-ignore
  const shade = breakFontColor[color] ?? breakFontColor.default
  return shade < brightShade ? fontColor.light : fontColor.dark
}
