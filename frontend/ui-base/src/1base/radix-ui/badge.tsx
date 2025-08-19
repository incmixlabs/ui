import { Badge as RadixBadge } from "@/radix-ui"
import type { BadgeProps as RBadgeProps } from "@/radix-ui"
// TBD validate badge
import { cn } from "@/utils/cn"
import type { Shade } from "../theme"
export type ExtendedColorType = RBadgeProps["color"] | "black"

export type BadgeProps = Omit<RBadgeProps, "color"> & {
  text?: string
  className?: string
  color?: ExtendedColorType
  shade?: Shade
}

export const Badge = ({ className, children, color, ...props }: BadgeProps) => {
  const isBlackColor = color === "black"
  const { variant } = props
  return (
    <RadixBadge
      className={cn(
        "",
        className,
        isBlackColor && "bg-gray-5 text-black dark:bg-gray-7 dark:text-white",
        isBlackColor &&
          variant === "solid" &&
          "bg-white text-black dark:bg-black dark:text-white"
      )}
      color={
        !isBlackColor
          ? (color as Exclude<BadgeProps["color"], "black">)
          : undefined
      }
      {...props}
    >
      {children}
    </RadixBadge>
  )
}
