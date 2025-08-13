import { type SVGIconProps, SvgIcon } from "./svg-icon"

export default function CheckIcon({ className, ...props }: SVGIconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </SvgIcon>
  )
}
