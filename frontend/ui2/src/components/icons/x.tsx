import { type SVGIconProps, SvgIcon } from "./svg-icon"

export default function X({ className, ...props }: SVGIconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgIcon>
  )
}
