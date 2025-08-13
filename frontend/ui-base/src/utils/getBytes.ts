export const getBytes = (file: { size: { value: number; unit: string } }) => {
  const { value, unit } = file.size
  if (value === undefined || unit === undefined) {
    return 0
  }
  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  }
  const multiplier = multipliers[unit.toUpperCase()] || 1
  return value * multiplier
}
