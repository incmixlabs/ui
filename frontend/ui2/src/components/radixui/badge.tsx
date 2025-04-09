import { cn } from "@/lib/utils"
import { Badge as RadixBadge } from "@radix-ui/themes"
import type { BadgeProps } from "@radix-ui/themes"

export type ExtendedColorType = BadgeProps["color"] | "black"

export type CustomBadgeProps = Omit<BadgeProps, "color"> & {
  text?: string
  className?: string
  color?: ExtendedColorType
}

export const Badge = ({
  className,
  children,
  color,
  ...props
}: CustomBadgeProps) => {
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
      color={isBlackColor ? undefined : (color as BadgeProps["color"])}
      {...props}
    >
      {children}
    </RadixBadge>
  )
}
