import {
  type IconButtonProps,
  IconButton as RadixIconButton,
} from "@radix-ui/themes"
import React from "react"

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, disabled, variant, ...props }, ref) => {
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
