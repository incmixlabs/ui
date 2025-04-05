import { forwardRef } from "react"
import { type SVGIconProps, SvgIcon } from "./svg-icon"

const LoaderCircle = forwardRef<SVGSVGElement, SVGIconProps>(
  ({ className, ...props }, ref) => (
    <SvgIcon ref={ref} className={className} {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </SvgIcon>
  )
)

LoaderCircle.displayName = "LoaderCircle"

export default LoaderCircle
