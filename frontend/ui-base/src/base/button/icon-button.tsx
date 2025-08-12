import {
  type IconButtonProps,
  IconButton as RadixIconButton,
} from "@/radix-ui/icon-button"
export type { IconButtonProps }
export { iconButtonPropDefs } from "@/radix-ui/icon-button.props.js"

export const IconButton = ({
  children,
  className,
  disabled,
  variant,
  ...props
}: IconButtonProps) => {
  const defaultClassName = `${disabled ? "cursor-not-allowed" : "cursor-pointer"} `

  return (
    <RadixIconButton
      {...props}
      variant={variant || "soft"}
      className={`${defaultClassName}${className}`}
      disabled={disabled}
    >
      {children}
    </RadixIconButton>
  )
}
