import {
  Tooltip,

} from "@/components/radixui/tooltip"
import { IconButton } from "@/components/radixui/button"
import { HelpCircle } from "lucide-react"

import { width, size, radius, variant, type Size, Radius, Variant} from "@/components/types"
import React from "react"
export type AutoFormTooltipProps = {
  content?: string | React.ReactNode
  Icon?: React.ReactNode
  size?: Size
  radius?: Radius
  variant?: Variant
}

function AutoFormTooltip({ content, Icon=HelpCircle, size=size.sm, radius=radius.full, variant=variant.ghost}: { fieldConfigItem: any }) {
  const description = fieldConfigItem?.description
  return (
    <>
      {description && (
        <Tooltip content={description}>
          <IconButton radius={radius} size={size} variant={variant}>
            <Icon width={width[size]} height={width[size]} />
          </IconButton>
        </Tooltip>)
      }
    </>
  )
}

export default AutoFormTooltip
