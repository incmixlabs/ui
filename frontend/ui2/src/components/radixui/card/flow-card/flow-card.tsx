
import type { ComponentProps, FC, JSX } from "react"
import { twMerge } from "tailwind-merge"

import type { DeepPartial } from "@/types"
import { mergeDeep } from "@/lib/utils/objects"
import { omit } from "@/lib/utils/objects/omit"
import { type FlowCardTheme, cardTheme } from "./flow-card-theme"
interface CommonCardProps extends ComponentProps<"div"> {
  horizontal?: boolean
  href?: string
  /** Overwrites the theme. Will be merged with the context theme.
   * @default {}
   */
  theme?: DeepPartial<FlowCardTheme>
}

export type FlowCardProps = {
  imgAlt?: string
  imgSrc?: string
  width?: number
  height?: number
  horizontal?: boolean
  renderImage?: (
    theme: DeepPartial<FlowCardTheme>,
    horizontal: boolean
  ) => JSX.Element
  theme?: DeepPartial<FlowCardTheme>
} & CommonCardProps

export const Image: FC<FlowCardProps> = ({ theme = {}, ...props }) => {
  const mergedTheme = mergeDeep(theme, cardTheme)
  if (props.renderImage) {
    return props.renderImage(mergedTheme, props.horizontal ?? false)
  }
  if (props.imgSrc) {
    const horizontalClass = theme?.img?.horizontal
      ? theme.img.horizontal[props.horizontal ? "on" : "off"]
      : ""
    return (
      <img
        data-testid="flowbite-card-image"
        alt={props.imgAlt ?? ""}
        src={props.imgSrc}
        className={twMerge(theme?.img?.base, horizontalClass)}
      />
    )
  }
  return null
}

export const FlowCard: FC<FlowCardProps> = (props) => {
  const { children, className, horizontal, href, theme = {} } = props
  const Component = typeof href === "undefined" ? "div" : "a"
  const theirProps = removeCustomProps(props)
  const customTheme = mergeDeep(theme, cardTheme)

  return (
    <Component
      data-testid="flowbite-card"
      href={href}
      className={twMerge(
        customTheme.root.base,
        customTheme.root.horizontal[horizontal ? "on" : "off"],
        href && customTheme.root.href,
        className
      )}
      {...theirProps}
    >
      <Image {...props} />
      <div className={customTheme.root.children}>{children}</div>
    </Component>
  )
}

const removeCustomProps = omit([
  "renderImage",
  "imgSrc",
  "imgAlt",
  "children",
  "className",
  "horizontal",
  "href",
  "theme",
])

export default FlowCard
