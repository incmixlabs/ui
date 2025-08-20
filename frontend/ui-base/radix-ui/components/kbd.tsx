import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { extractProps } from "../helpers/extract-props"
import { marginPropDefs } from "../props/margin.props"
import { kbdPropDefs } from "./kbd.props"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { MarginProps } from "../props/margin.props"
import type { GetPropDefTypes } from "../props/prop-def"

type KbdElement = React.ElementRef<"kbd">
type KbdOwnProps = GetPropDefTypes<typeof kbdPropDefs>
interface KbdProps
  extends ComponentPropsWithout<"kbd", RemovedProps>,
    MarginProps,
    KbdOwnProps {}
const Kbd = React.forwardRef<KbdElement, KbdProps>((props, forwardedRef) => {
  const { asChild, className, ...kbdProps } = extractProps(
    props,
    kbdPropDefs,
    marginPropDefs
  )
  const Comp = asChild ? SlotRoot : "kbd"
  return (
    <Comp
      {...kbdProps}
      ref={forwardedRef}
      className={classNames("rt-reset", "rt-Kbd", className)}
    />
  )
})
Kbd.displayName = "Kbd"

export { Kbd }
export type { KbdProps }
