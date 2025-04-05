import { icons } from "lucide-react"

export type IconType = { name: keyof typeof icons; color: string; size: number }
export const Icon = ({ name, color, size }: IconType) => {
  const LucideIcon = icons[name]

  return <LucideIcon color={color} size={size} />
}

export default Icon
export const iconSize = "w-4 h-4"
