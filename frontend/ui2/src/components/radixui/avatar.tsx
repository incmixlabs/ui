import {
  Avatar as RadixAvatar,
  type AvatarProps as RadixProps,
} from "@radix-ui/themes"
/* eslint-disable react-refresh/only-export-components */
import { User as PersonIcon } from "lucide-react"
export { avatarPropDefs } from "@radix-ui/themes/src/components/avatar.props.js"
import { getInitials } from "@/lib/strings"
import type { ExtendSize } from "@/types"
export type AvatarProps = {
  id?: string
  size?: ExtendSize
  src?: string
  name?: string
  radius?: RadixProps["radius"]
  variant?: RadixProps["variant"]
  className?: string
  style?: React.CSSProperties
}

export const Avatar = (
  {
    id,
    size = "3",
    name,
    radius = "full",
    variant = "solid",
    className,
    src,
    style,
    ...props
  }: AvatarProps
) => {
  const fallback = name ? (
    getInitials(name)
  ) : (
    <PersonIcon height="24px" width="24px" />
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
