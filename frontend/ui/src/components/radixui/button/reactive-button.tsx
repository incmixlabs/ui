import type { ButtonProps } from "@radix-ui/themes"
import { Spinner } from "@radix-ui/themes"
import { Check } from "lucide-react"
import React from "react"
import { Button } from "./button"

export type ReactiveButtonProps = ButtonProps & {
  loading?: boolean
  success?: boolean
  spinnerClassName?: string
  successIconClassName?: string
}

export const ReactiveButton = React.forwardRef<
  HTMLButtonElement,
  ReactiveButtonProps
>(function ReactiveButton(
  {
    children,
    loading,
    success,
    disabled,
    spinnerClassName,
    successIconClassName,
    ...props
  },
  ref
) {
  return (
    <Button {...props} ref={ref} disabled={loading || disabled}>
      {loading ? (
        <Spinner className={spinnerClassName} />
      ) : success ? (
        <Check className={successIconClassName} />
      ) : (
        children
      )}
    </Button>
  )
})

ReactiveButton.displayName = "ReactiveButton"
