import { icons } from "lucide-react"

export type IconType = { name: keyof typeof icons; color: string; size: number }
const Icon = ({ name, color, size }: IconType) => {
  const LucideIcon = icons[name]

  return <LucideIcon color={color} size={size} />
}

export default Icon
