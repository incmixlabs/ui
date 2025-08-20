import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { requireReactElement } from "../helpers/require-react-element"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"

interface ResetProps
  extends ComponentPropsWithout<typeof SlotRoot, RemovedProps> {}
const Reset = React.forwardRef<HTMLElement, ResetProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <SlotRoot
        {...props}
        ref={forwardedRef}
        className={classNames("rt-reset", className)}
      >
        {requireReactElement(children)}
      </SlotRoot>
    )
  }
)
Reset.displayName = "Reset"

export { Reset }
export type { ResetProps }
