import {
  type IconButtonProps,
  IconButton as RadixIconButton,
} from "@radix-ui/themes"
import React from "react"
export type { IconButtonProps }
export { iconButtonPropDefs } from "@radix-ui/themes/src/components/icon-button.props.js"

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { children, className, disabled, variant, ...props },
    ref
  ) {
    const defaultClassName = `${disabled ? "cursor-not-allowed" : "cursor-pointer"} `

    return (
      <RadixIconButton
        {...props}
        variant={variant || "soft"}
        className={`${defaultClassName}${className}`}
        ref={ref}
        disabled={disabled}
      >
        {children}
      </RadixIconButton>
    )
  }
)

IconButton.displayName = "IconButton"
