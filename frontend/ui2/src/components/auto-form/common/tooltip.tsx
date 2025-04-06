import { IconButton } from "@/components/radixui/button"
import { Tooltip } from "@/components/radixui/tooltip"
import { HelpCircle } from "lucide-react"
import type React from "react"

import {
  buttonVariant,
  iconWidth,
  radius as radiusConst,
  size as sizeConst,
} from "@/types"
import type { ButtonVariant, Radius, Size } from "@/types"

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
  variant = buttonVariant.ghost as ButtonVariant,
}: AutoFormTooltipProps) {
  return (
    <>
      {content && (
        <Tooltip content={content}>
          <IconButton radius={radius} size={size} variant={variant}>
            <Icon width={iconWidth[size]} height={iconWidth[size]} />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

export default AutoFormTooltip
