import {
  Tooltip,
  IconButton
} from "@base"
import {  HelpCircle} from "lucide-react"

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
  const content =  <p className="text-gray-500 text-sm dark:text-white">
  {fieldConfigItem.description}
</p>
  return (
    <>
      {fieldConfigItem?.description && (
          <Tooltip content={content}>
            <IconButton radius="full">
              <HelpCircle/>
            </IconButton>
          </Tooltip>
      )}
    </>
  )
}

export default AutoFormTooltip
