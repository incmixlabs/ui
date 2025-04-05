import React from "react"
import {
  Tooltip,
} from "@/components/radixui/tooltip"
import { IconButton } from "@/components/radixui/button"
import { HelpCircle } from "lucide-react"

import { iconWidth, size as sizeConst, radius as radiusConst, buttonVariant } from "@/types"
import type { Size, Radius, ButtonVariant } from "@/types"

export type AutoFormTooltipProps = {
  content?: string | React.ReactNode
  Icon?: React.ComponentType<{ width?: number; height?: number }>
  size?: Size
  radius?: Radius
  variant?: ButtonVariant
}

function AutoFormTooltip({ 
  content, 
  Icon = HelpCircle, 
  size = sizeConst.sm as Size, 
  radius = radiusConst.full as Radius, 
  variant = buttonVariant.ghost as ButtonVariant
}: AutoFormTooltipProps) {
  return (
    <>
      {content && (
        <Tooltip content={content}>
          <IconButton radius={radius} size={size} variant={variant}>
            <Icon width={iconWidth[size]} height={iconWidth[size]} />
          </IconButton>
        </Tooltip>)
      }
    </>
  )
}

export default AutoFormTooltip
