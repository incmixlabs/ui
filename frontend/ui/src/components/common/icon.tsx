import { icons } from "lucide-react"

export type IconType = { 
  name: keyof typeof icons; 
  className?: string;
  color?: string; 
  size?: number 
}

export const Icon = ({ 
  name, 
  className = "w-4 h-4", 
  color = "currentColor", 
  size 
}: IconType) => {
  const LucideIcon = icons[name]
  if (!LucideIcon) return null
  return <LucideIcon className={className} color={color} size={size} />
}

export const iconSize = "w-4 h-4"
