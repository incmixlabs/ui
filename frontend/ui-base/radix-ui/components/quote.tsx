import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { extractProps } from "../helpers/extract-props"
import { quotePropDefs } from "./quote.props"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { GetPropDefTypes } from "../props/prop-def"

type QuoteElement = React.ElementRef<"q">
type QuoteOwnProps = GetPropDefTypes<typeof quotePropDefs>
interface QuoteProps
  extends ComponentPropsWithout<"q", RemovedProps>,
    QuoteOwnProps {}
const Quote = React.forwardRef<QuoteElement, QuoteProps>(
  (props, forwardedRef) => {
    const { asChild, className, ...quoteProps } = extractProps(
      props,
      quotePropDefs
    )
    const Comp = asChild ? SlotRoot : "q"
    return (
      <Comp
        {...quoteProps}
        ref={forwardedRef}
        className={classNames("rt-Quote", className)}
      />
    )
  }
)
Quote.displayName = "Quote"

export { Quote }
export type { QuoteProps }
