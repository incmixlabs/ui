import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { Text } from "./text"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { MarginProps } from "../props/margin.props"
import type { GetPropDefTypes } from "../props/prop-def"
import type { blockquotePropDefs } from "./blockquote.props"

type BlockquoteElement = React.ElementRef<"blockquote">
type BlockQuoteOwnProps = GetPropDefTypes<typeof blockquotePropDefs>
interface BlockquoteProps
  extends ComponentPropsWithout<"blockquote", RemovedProps>,
    MarginProps,
    BlockQuoteOwnProps {}
const Blockquote = React.forwardRef<BlockquoteElement, BlockquoteProps>(
  (props, forwardedRef) => {
    const { asChild, children, className, ...blockquoteProps } = props
    const Comp = asChild ? SlotRoot : "blockquote"
    return (
      <Text
        asChild
        {...blockquoteProps}
        ref={forwardedRef}
        className={classNames("rt-Blockquote", className)}
      >
        <Comp>{children}</Comp>
      </Text>
    )
  }
)
Blockquote.displayName = "Blockquote"

export { Blockquote }
export type { BlockquoteProps }
