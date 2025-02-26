import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"
import { HelpCircle } from "lucide-react"

function AutoFormTooltip({ fieldConfigItem }: { fieldConfigItem: any }) {
  return (
    <>
      {fieldConfigItem?.description && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="ml-[1px] size-4 text-gray-500 dark:text-white" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-gray-500 text-sm dark:text-white">
                {fieldConfigItem.description}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}

export default AutoFormTooltip
