// https://lucide.dev/guide/packages/lucide-react
import dynamicIconImports from "lucide-react/dynamicIconImports"
import { Suspense, lazy } from "react"

export type LucideIconName = keyof typeof dynamicIconImports
export type LucideIconType = {
  name: LucideIconName
  color?: string
  size?: number
}

export const LucideIcon = ({ name, color, size }: LucideIconType) => {
  const IconComponent = lazy(dynamicIconImports[name])
  return (
    <Suspense fallback={null}>
      <IconComponent color={color} size={size} />
    </Suspense>
  )
}

export type LucideIconCompType = typeof LucideIcon
export default LucideIcon
