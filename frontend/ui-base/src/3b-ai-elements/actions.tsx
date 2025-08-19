"use client"
import { IconButton, Tooltip } from "@/base"
import { cn } from "@/utils/cn"
import React, { useState } from "react"
import type { ComponentProps } from "react"
export type ActionsProps = ComponentProps<"div">

export const Actions = ({ className, children, ...props }: ActionsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
)

export type ActionProps = ComponentProps<typeof IconButton> & {
  tooltip?: string
  label?: string
  fillColor?: string
  toggle?: boolean
}

export const Action = ({
  tooltip,
  children,
  label,
  variant = "ghost",
  size = "1",
  fillColor,
  toggle,
  ...props
}: ActionProps) => {
  const { onClick } = props
  // # TBD use store accent
  const [fill, setFill] = useState<string | undefined>(undefined)
  const childrenArray = React.Children.toArray(children)
  const filledIcon =
    childrenArray.length > 0 && fill
      ? React.isValidElement(childrenArray[0])
        ? React.cloneElement(childrenArray[0] as React.ReactElement<any>, {
            fill,
          })
        : childrenArray[0]
      : childrenArray[0]
  const button = (
    <IconButton
      size={size}
      variant={variant}
      onClick={(event) => {
        if (fillColor) {
          if (fill) {
            if (toggle) {
              setFill(undefined)
            }
          } else {
            setFill(fillColor)
          }
        }
        onClick?.(event)
      }}
      {...props}
    >
      {filledIcon}
      <span className="sr-only">{label || tooltip}</span>
    </IconButton>
  )

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>
  }

  return button
}
