// https://lucide.dev/guide/packages/lucide-react
import { Suspense, lazy } from "react"
import { type LucideProps, icons, Icon } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

export type LucideIconName = keyof typeof icons
export type LucideIconType = {
  name: LucideIconName
  color?: string
  size?: number
}
export const LucideIcon = ({ name, color, size=18 }: LucideIconType) => {
  const IconComp = icons[name]

  return <IconComp color={color} size={size} />
}
export type LucideIconCompType = typeof LucideIcon
export {Icon}
export type IconType = typeof Icon

export const FallbackIcon = (
  <div style={{ background: "#ddd", width: 24, height: 24 }} />
)
export type FallbackIconType = typeof FallbackIcon
export interface LazyIconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports
  fallback?: FallbackIconType
}

export const LazyIcon = ({
  name,
  fallback = FallbackIcon,
  ...props
}: LazyIconProps) => {
  const IconComp = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <IconComp {...props} />
    </Suspense>
  )
}
export {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react"
