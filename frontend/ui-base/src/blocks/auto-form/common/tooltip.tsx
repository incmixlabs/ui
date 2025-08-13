import { IconButton, Tooltip } from "@/base"
import { HelpCircle } from "lucide-react"

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
function AutoFormTooltip({ fieldConfigItem }: { fieldConfigItem: any }) {
  return (
    <>
      {fieldConfigItem?.description && (
        <Tooltip
          content={<p className="text-sm">{fieldConfigItem.description}</p>}
        >
          <IconButton variant="ghost">
            <HelpCircle />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

export default AutoFormTooltip
