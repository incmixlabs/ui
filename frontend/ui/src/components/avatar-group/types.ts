import type { UserProfile } from "@incmix/utils/types"
import type { AvatarProps } from "../avatar"

export const sizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const
export const layouts = ["spread", "stack"] as const
export const directions = ["left", "right"] as const
export const stackOrders = ["ascending", "descending"] as const

export type Sizes = (typeof sizes)[number]
export type Layout = (typeof layouts)[number]
export type Direction = (typeof directions)[number]
export type StackOrder = (typeof stackOrders)[number]

export type User = UserProfile

export type AvatarGroupProps = {
  users: AvatarProps[]
  maxVisible?: number
  size?: Sizes
  layout?: Layout
  direction?: Direction
  stackOrder?: StackOrder
}
