import { PersonIcon } from "@radix-ui/react-icons"
import {
  Avatar as RadixAvatar,
  type AvatarProps as RadixProps,
} from "@radix-ui/themes"
import { forwardRef } from "react"

export type AvatarProps = {
  id: string
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  src?: string | null
  name?: string
  radius?: RadixProps["radius"]
  variant?: RadixProps["variant"]
  className?: string
  style?: React.CSSProperties
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      id,
      size = "3",
      name,
      radius = "full",
      variant = "solid",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const getInitials = (name: string) => name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()

    const fallback = name ? (
      getInitials(name)
    ) : (
      <PersonIcon height="24px" width="24px" />
    )
    debugger;
    return (
      <RadixAvatar
        data-user-id={id}
        ref={ref}
        style={style}
        className={`overflow-hidden ${className}`}
        size={size}
        fallback={fallback}
        alt={name}
        radius={radius}
        variant={variant}
        {...props}
      />
    )
  }
)
