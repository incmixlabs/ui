import type { AvatarProps } from "@/src/1base"
import type { Direction, ExtendSize, SortOrder } from "@/src/types"
export const layouts = ["spread", "stack"] as const
export type Layout = (typeof layouts)[number]

export type AvatarGroupProps = {
  users: AvatarProps[]
  maxVisible?: number
  size?: ExtendSize
  layout?: Layout
  direction?: Direction
  stackOrder?: SortOrder
}
