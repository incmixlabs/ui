import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { extractProps } from "../helpers/extract-props"
import { marginPropDefs } from "../props/margin.props"
import { headingPropDefs } from "./heading.props"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { MarginProps } from "../props/margin.props"
import type { GetPropDefTypes } from "../props/prop-def"

type HeadingElement = React.ElementRef<"h1">
type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>
interface HeadingProps
  extends ComponentPropsWithout<"h1", RemovedProps>,
    MarginProps,
    HeadingOwnProps {}

const Heading = React.forwardRef<HeadingElement, HeadingProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      asChild,
      as: Tag = "h1",
      color,
      ...headingProps
    } = extractProps(props, headingPropDefs, marginPropDefs)
    return (
      <SlotRoot
        data-accent-color={color}
        {...headingProps}
        ref={forwardedRef}
        className={classNames("rt-Heading", className)}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </SlotRoot>
    )
  }
)
Heading.displayName = "Heading"

export { Heading }
export type { HeadingProps }
