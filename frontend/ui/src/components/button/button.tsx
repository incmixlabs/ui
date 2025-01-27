import {
  Button as RadixButton,
  type ButtonProps as RadixButtonProps,
} from "@radix-ui/themes"
import React from "react"
export { buttonPropDefs } from "@radix-ui/themes/src/components/button.props.js"

export type ButtonProps = RadixButtonProps
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, variant, ...props }, ref) => {
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
