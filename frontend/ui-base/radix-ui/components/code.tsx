import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { extractProps } from "../helpers/extract-props"
import { marginPropDefs } from "../props/margin.props"
import { codePropDefs } from "./code.props"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { MarginProps } from "../props/margin.props"
import type { GetPropDefTypes } from "../props/prop-def"

type CodeElement = React.ElementRef<"code">
type CodeOwnProps = GetPropDefTypes<typeof codePropDefs>
interface CodeProps
  extends ComponentPropsWithout<"code", RemovedProps>,
    MarginProps,
    CodeOwnProps {}
const Code = React.forwardRef<CodeElement, CodeProps>((props, forwardedRef) => {
  const { asChild, className, color, ...codeProps } = extractProps(
    props,
    codePropDefs,
    marginPropDefs
  )
  // Code ghost color prop should work as text color by default
  const resolvedColor = props.variant === "ghost" ? color || undefined : color
  const Comp = asChild ? SlotRoot : "code"
  return (
    <Comp
      data-accent-color={resolvedColor}
      {...codeProps}
      ref={forwardedRef}
      className={classNames("rt-reset", "rt-Code", className)}
    />
  )
})
Code.displayName = "Code"

export { Code }
export type { CodeProps }
