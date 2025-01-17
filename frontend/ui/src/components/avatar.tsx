import { PersonIcon } from "@radix-ui/react-icons"
import {
  Avatar as RadixAvatar,
  type AvatarProps as RadixProps,
} from "@radix-ui/themes"
import { forwardRef } from "react"

type AvatarProps = {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  imageUrl?: string | null
  fullName?: string
  radius?: RadixProps["radius"]
  variant?: RadixProps["variant"]
  className?: string
  style?: React.CSSProperties
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      size = "3",
      imageUrl,
      fullName,
      radius = "full",
      variant = "solid",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const getInitials = (name: string) => {
      const names = name.split(" ")
      const firstInitial = names[0]?.[0] ?? ""
      const lastInitial = names[names.length - 1]?.[0] ?? ""
      return `${firstInitial}${lastInitial}`.toUpperCase()
    }

    const fallback = fullName ? (
      getInitials(fullName)
    ) : (
      <PersonIcon height="33%" width="33%" />
    )

    return (
      <RadixAvatar
        ref={ref}
        style={style}
        className={`overflow-hidden ${className}`}
        size={size}
        src={imageUrl || undefined}
        fallback={fallback}
        alt={fullName}
        radius={radius}
        variant={variant}
        {...props}
      />
    )
  }
)
