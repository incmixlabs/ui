import {
  Avatar as RadixAvatar,
  type AvatarProps as RadixProps,
} from "@/radix-ui/avatar"
import { getInitials } from "@incmix/utils/strings"
import { User as PersonIcon } from "lucide-react"
import { type ExtendSize, extendIconWidth } from "../types"

export type AvatarProps = {
  email?: string
  id?: string
  size?: ExtendSize
  src?: string
  name?: string
  radius?: RadixProps["radius"]
  variant?: RadixProps["variant"]
  className?: string
  style?: React.CSSProperties
}

export const Avatar = ({
  id,
  size = "3",
  name,
  radius = "full",
  variant = "solid",
  className,
  src,
  style,
  ...props
}: AvatarProps) => {
  const fallback = name ? (
    getInitials(name)
  ) : (
    <PersonIcon height={extendIconWidth[size]} width={extendIconWidth[size]} />
  )
  return (
    <RadixAvatar
      data-user-id={id}
      src={src}
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
