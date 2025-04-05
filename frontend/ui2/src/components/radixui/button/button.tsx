import {
  Button as RadixButton,
  type ButtonProps as RadixButtonProps,
} from "@radix-ui/themes"
import React from "react"
export { buttonPropDefs } from "@radix-ui/themes/src/components/button.props.js"

export type ButtonProps = RadixButtonProps & {
  icon?: React.ReactNode
  srLabel?: string
  isSecondary?: boolean
  mobileSidebarTrigger?: boolean
  variant?: RadixButtonProps["variant"] | "naked"
}
export const Button = ({ 
  children, 
  className, 
  disabled, 
  variant, 
  ref,
  ...props 
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    const defaultClassName = `${disabled ? "cursor-not-allowed" : "cursor-pointer"} `
    return (
      <RadixButton
        {...props}
        variant={variant}
        className={`${defaultClassName}${className}`}
        ref={ref}
        disabled={disabled}
      >
        {children}
      </RadixButton>
    )
  }
)

Button.displayName = "Button"
