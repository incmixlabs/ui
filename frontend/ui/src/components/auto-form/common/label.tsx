import { FormLabel } from "@/components/form"
import { cn } from "@utils/cn"

function AutoFormLabel({
  label,
  isRequired,
  className,
}: {
  label: string
  isRequired: boolean
  className?: string
}) {
  return (
    <>
      <FormLabel className={cn("mt-2 w-[140px] space-y-0", className)}>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
    </>
  )
}

export default AutoFormLabel
