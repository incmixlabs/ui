import { CheckIcon } from "@radix-ui/react-icons"
import type { ButtonProps } from "@radix-ui/themes"
import { Spinner } from "@radix-ui/themes"
import React from "react"
import { Button } from "./button"

export type ReactiveButtonProps = ButtonProps & {
  loading?: boolean
  success?: boolean
  spinnerClassName?: string
  successIconClassName?: string
}

export const ReactiveButton = ({
  children,
  loading,
  success,
  disabled,
  spinnerClassName,
  successIconClassName,
  ref,
  ...props
}: ReactiveButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    return (
      <Button {...props} ref={ref} disabled={loading || disabled}>
        {loading ? (
          <Spinner className={spinnerClassName} />
        ) : success ? (
          <CheckIcon className={successIconClassName} />
        ) : (
          children
        )}
      </Button>
    )
  }
)

ReactiveButton.displayName = "ReactiveButton"
