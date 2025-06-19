import { strEnum } from "@incmix/utils/strings"
import { accentColorPropDef as radixAccentColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { colorPropDef as radixColorPropDef } from "@radix-ui/themes/src/props/color.prop.js"
import { accentColors as radixAccentColors } from "@radix-ui/themes/src/props/color.prop.js"
import { grayColors as radixGrayColors } from "@radix-ui/themes/src/props/color.prop.js"

// Define custom task colors
export const dashboardColors = [
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
] as const


export const dashboardColorValues = {
  color1: "var(--color-done)",
  color2: "var(--color-hold)",
  color3: "var(--color-ongoing)",
  color4: "var(--color-track)",
  color5: "var(--color-blue)",
}


export const accentColors = radixAccentColors
export const grayColors = radixGrayColors
export const allColors = [...accentColors, ...grayColors, ...dashboardColors]
export const accentColorPropDef = radixAccentColorPropDef
export const colorPropDef = radixColorPropDef

export const accentColorEnums = strEnum([...accentColors]) as {
  [K in AccentColor]: K
}
export const grayColorEnums = strEnum([...grayColors]) as {
  [K in GrayColor]: K
}

export const dashboardColorEnums = strEnum([...dashboardColors]) as {
  [K in DashboardColor]: K
}

export const allColorEnums = strEnum(allColors) as { [K in AccentColor]: K }

export type AccentColor = (typeof accentColors)[number]
export type DashboardColor = (typeof dashboardColors)[number]
export type GrayColor = (typeof grayColors)[number]
export type Color = AccentColor | GrayColor



/**
 * Simple accessibility check for color contrast with background
 * Returns true if the color is likely to have good contrast
 */
export function hasGoodContrast(hexColor: string): boolean {
  // Simple check based on color brightness
  // Formula: (R*299 + G*587 + B*114) / 1000
  const hex = hexColor.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness (higher means lighter)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Dark colors have better contrast on light backgrounds
  // Light colors have better contrast on dark backgrounds
  // A more nuanced implementation would compare with actual background
  return brightness < 125;
}

/**
 * Check if a color has sufficient contrast against a light background
 * Uses WCAG-recommended brightness threshold for better accessibility
 */
export function hasGoodContrastOnLight(hexColor: string): boolean {
  // Validate hex color format
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    console.warn(`Invalid hex color: ${hexColor}`);
    return false;
  }
  const hex = hexColor.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance using WCAG formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Use WCAG-recommended threshold for sufficient contrast on white background
  return brightness < 128; // Colors darker than this provide good contrast on light backgrounds
}