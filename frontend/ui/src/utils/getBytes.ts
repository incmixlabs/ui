export const getBytes = (file: any) => {
  const { value, unit } = file.size
  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  }
  return value * (multipliers[unit] || 1)
}
