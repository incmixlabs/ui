import { Badge as RadixBadge, type BadgeProps } from "@radix-ui/themes"
import { cn } from "@utils"

export type ExtendedColorType = BadgeProps["color"] | "black"

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
    const { variant } = props;
    return (
        <RadixBadge
            className={cn('', className, isBlackColor && 'dark:bg-gray-7 bg-gray-5 text-black dark:text-white', isBlackColor && variant === "solid" && "dark:bg-black bg-white dark:text-white text-black")}
            color={isBlackColor ? undefined : color as BadgeProps["color"]}
            {...props}
        >
            {children}
        </RadixBadge>
    )
}