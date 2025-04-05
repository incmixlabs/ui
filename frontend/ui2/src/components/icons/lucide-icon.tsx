// https://lucide.dev/guide/packages/lucide-react
import { icons } from "lucide-react"

export type LucideIconName = keyof typeof icons
export type LucideIconType = {
  name: LucideIconName
  color?: string
  size?: number
}
const LucideIcon = ({ name, color, size }: LucideIconType) => {
  const LucideIcon = icons[name]

  return <LucideIcon color={color} size={size} />
}
export type LucideIconCompType = typeof LucideIcon
export default LucideIcon
