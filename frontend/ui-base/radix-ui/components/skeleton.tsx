import classNames from "classnames"
import * as React from "react"
import { SlotRoot } from "./slot"

import { extractProps } from "../helpers/extract-props"
import { inert } from "../helpers/inert"
import { marginPropDefs } from "../props/margin.props"
import { skeletonPropDefs } from "./skeleton.props"

import type {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props"
import type { MarginProps } from "../props/margin.props"
import type { GetPropDefTypes } from "../props/prop-def"

type SkeletonElement = React.ElementRef<"span">
type SkeletonOwnProps = GetPropDefTypes<typeof skeletonPropDefs>
interface SkeletonProps
  extends ComponentPropsWithout<"span", RemovedProps>,
    MarginProps,
    SkeletonOwnProps {}
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>(
  (props, forwardedRef) => {
    const { children, className, loading, ...skeletonProps } = extractProps(
      props,
      skeletonPropDefs,
      marginPropDefs
    )

    if (!loading) return children

    const Tag = React.isValidElement(children) ? SlotRoot : "span"

    return (
      <Tag
        ref={forwardedRef}
        aria-hidden
        className={classNames("rt-Skeleton", className)}
        data-inline-skeleton={React.isValidElement(children) ? undefined : true}
        tabIndex={-1}
        // @ts-expect-error
        inert={inert}
        {...skeletonProps}
      >
        {children}
      </Tag>
    )
  }
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
export type { SkeletonProps }
