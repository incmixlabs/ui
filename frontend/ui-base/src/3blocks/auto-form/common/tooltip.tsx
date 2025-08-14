import { IconButton, Tooltip } from "@/src/1base"
import { HelpCircle } from "lucide-react"
import type { FieldConfigItem } from "../types"
/**
 * Renders a tooltip icon with descriptive text for a form field if a description is provided.
 *
 * When the given field configuration object includes a 'description', a help icon is displayed
 * that triggers a tooltip containing the description text with specific styling. If no description
 * is present, nothing is rendered.
 *
 * @param fieldConfigItem - The configuration object for a form field, potentially including a 'description'.
 *
 * @returns A JSX element with a tooltip if a description exists; otherwise, an empty fragment.
 */

/**
 * Renders a tooltip icon with descriptive text for a form field if a description is provided.
 */
function AutoFormTooltip({
  fieldConfigItem,
}: {
  fieldConfigItem: Pick<FieldConfigItem, "description">
}) {
  const description = fieldConfigItem?.description
  if (!description) return null
  return (
    <Tooltip content={<p className="text-sm">{description}</p>}>
      <IconButton variant="ghost" aria-label="Show help" title="Show help">
        <HelpCircle className="h-4 w-4" />
      </IconButton>
    </Tooltip>
  )
}

export default AutoFormTooltip
