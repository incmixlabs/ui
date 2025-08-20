import {
  Avatar as RadixAvatar,
  type AvatarProps as RadixProps,
} from "@/radix-ui/avatar"
import { User as PersonIcon } from "lucide-react"
import { type ExtendSize, extendIconWidth } from "../../types"

// Local utility function to generate initials from a name
const getInitials = (name: string): string => {
  if (!name || typeof name !== "string") {
    return ""
  }

  return name
    .trim()
    .split(/\s+/) // Split by whitespace
    .map((word) => word.charAt(0).toUpperCase()) // Get first letter of each word and uppercase
    .join("")
    .slice(0, 2) // Limit to 2 characters for better display
}

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
  name = "Unkown User",
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
