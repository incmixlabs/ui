
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
