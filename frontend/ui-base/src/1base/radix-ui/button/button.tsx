import {
  Button as RadixButton,
  type ButtonProps as RadixButtonProps,
} from "@/radix-ui/button"
// eslint-disable-next-line react-refresh/only-export-components
export { buttonPropDefs } from "@/radix-ui//button.props"

export type ButtonProps = RadixButtonProps & {
  icon?: React.ReactNode
  srLabel?: string
  isSecondary?: boolean
  mobileSidebarTrigger?: boolean
  variant?: RadixButtonProps["variant"]
}
export const Button = ({
  children,
  className = "",
  disabled,
  variant,
  ...props
}: ButtonProps) => {
  const defaultClassName = disabled ? "cursor-not-allowed " : "cursor-pointer"
  return (
    <RadixButton
      {...props}
      variant={variant}
      className={`${defaultClassName}${className}`}
      disabled={disabled}
    >
      {children}
    </RadixButton>
  )
}
Button.displayName = "Button"
