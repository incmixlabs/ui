import type { CSSProperties } from "react"

import { cva } from "@/lib/cva"
import { cn } from "@utils/cn"
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types"
export type DropIndicatorProps = {
  /**
   * The `edge` to draw a drop indicator on.
   *
   * `edge` is required as for the best possible performance
   * outcome you should only render this component when it needs to do something
   *
   * @example {closestEdge && <DropIndicator edge={closestEdge} />}
   */
  edge: Edge
  /**
   * `gap` allows you to position the drop indicator further away from the drop target.
   * `gap` should be the distance between your drop targets
   * a drop indicator will be rendered halfway between the drop targets
   * (the drop indicator will be offset by half of the `gap`)
   *
   * `gap` should be a valid CSS length.
   * @example "8px"
   * @example "var(--gap)"
   */
  gap?: string
}

type Orientation = "horizontal" | "vertical"

// }

const edgeToOrientationMap: Record<Edge, Orientation> = {
  top: "horizontal",
  bottom: "horizontal",
  left: "vertical",
  right: "vertical",
}

const orientationVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "right-0 left-1 h-1",
      vertical: "top-1 bottom-0 w-1",
    },
    edge: {
      top: "top-[var(--local-line-offset)]",
      right: "right-[var(--local-line-offset)]",
      bottom: "bottom-[var(--local-line-offset)]",
      left: "left-[var(--local-line-offset)]",
    },
  },
})

export function DropIndicator({ edge, gap = "0px" }: DropIndicatorProps) {
  /**
   * To clearly communicate the resting place of a draggable item during a drag operation,
   * the drop indicator should be positioned half way between draggable items.
   */
  const lineOffset = `calc(-0.5 * (${gap} + 4px))`

  const orientation = edgeToOrientationMap[edge]

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-10 h-1 bg-blue-5",
        orientationVariants({ edge, orientation })
      )}
      style={{ "--local-line-offset": lineOffset } as CSSProperties}
    />
  )
}

export default DropIndicator
