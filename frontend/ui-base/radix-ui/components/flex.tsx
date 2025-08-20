import classNames from "classnames"
import * as React from "react"

import { extractProps } from "../helpers/extract-props"
import { layoutPropDefs } from "../props/layout.props"
import { marginPropDefs } from "../props/margin.props"
import { flexPropDefs } from "./flex.props"
import { Slot } from "./slot"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { LayoutProps } from "../props/layout.props"
import type { MarginProps } from "../props/margin.props"
import type { FlexOwnProps } from "./flex.props"

type FlexElement = React.ElementRef<"div">
interface CommonFlexProps extends MarginProps, LayoutProps, FlexOwnProps {}
type FlexDivProps = { as?: "div" } & ComponentPropsWithout<"div", RemovedProps>
type FlexSpanProps = { as: "span" } & ComponentPropsWithout<
  "span",
  RemovedProps
>
type FlexProps = CommonFlexProps & (FlexSpanProps | FlexDivProps)

const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const {
    className,
    asChild,
    as: Tag = "div",
    ...flexProps
  } = extractProps(props, flexPropDefs, layoutPropDefs, marginPropDefs)
  const Comp = asChild ? Slot : Tag
  return (
    <Comp
      {...flexProps}
      ref={forwardedRef}
      className={classNames("rt-Flex", className)}
    />
  )
})
Flex.displayName = "Flex"

export { Flex }
export type { FlexProps }
