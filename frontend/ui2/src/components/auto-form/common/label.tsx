import { Form } from "@/components/shadcn"
import { cn } from "@/lib/utils"

/**
 * Renders a form label with an optional required indicator.
 *
 * Displays the given label text inside a styled FormLabel. When the "isRequired" flag is true,
 * an asterisk is appended to indicate that the associated form field is mandatory. Additional
 * CSS classes can be applied via the "className" prop.
 *
 * @param label - The text to display as the label.
 * @param isRequired - Indicates if a required marker should be shown.
 * @param className - Optional additional CSS classes for custom styling.
 *
 * @example
 * <AutoFormLabel label="Username" isRequired className="custom-class" />
 */
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
      <Form.Label className={cn("mt-2 w-[140px] space-y-0", className)}>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </Form.Label>
    </>
  )
}

export default AutoFormLabel
