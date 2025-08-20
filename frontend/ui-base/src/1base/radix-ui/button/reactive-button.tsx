import type { ButtonProps } from "@/radix-ui"
import { Spinner } from "@/radix-ui/spinner"
import { Check } from "lucide-react"
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
  ...props
}: ReactiveButtonProps) => {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading ? (
        <Spinner className={spinnerClassName} />
      ) : success ? (
        <Check className={successIconClassName} />
      ) : (
        children
      )}
    </Button>
  )
}
