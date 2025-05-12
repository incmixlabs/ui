import type { LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"
import { Suspense, lazy } from "react"

const fallbackIconComp = (
  <div style={{ background:"var(--color-primary)", width: 24, height: 24 }} />
)

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports
  fallback?: typeof fallbackIconComp
}

export const LazyIcon = ({
  name,
  fallback = fallbackIconComp,
  ...props
}: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  )
}

export default LazyIcon
