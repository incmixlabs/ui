import { Badge as RadixBadge, type BadgeProps } from "@radix-ui/themes"
import { cn } from "@utils"

type ExtendedColorType = BadgeProps["color"] | "black"

export type CustomBadgeProps = Omit<BadgeProps, "color"> & {
    text?: string
    className?: string
    color?: ExtendedColorType
}

export const Badge = ({
    text,
    className,
    children,
    color,
    ...props
}: CustomBadgeProps) => {
    const isBlackColor = color === "black"

    return (
        <RadixBadge
            className={cn('', className, isBlackColor && 'bg-gray-3 text-black')}
            color={isBlackColor ? undefined : color as BadgeProps["color"]}
            {...props}
        >
            {children}
        </RadixBadge>
    )
}