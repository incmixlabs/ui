"use client"

import {
  CheckboxIndicator,
  Root as CheckboxRoot,
} from "@radix-ui/react-checkbox"
import classNames from "classnames"
import * as React from "react"
import { useControllableState } from "./_internal/internal.js"

import { extractProps } from "../helpers/extract-props.js"
import { marginPropDefs } from "../props/margin.props.js"
import { checkboxPropDefs } from "./checkbox.props.js"
import { ThickCheckIcon, ThickDividerHorizontalIcon } from "./icons.js"

import type { ComponentPropsWithout } from "../helpers/component-props.js"
import type { MarginProps } from "../props/margin.props.js"
import type { GetPropDefTypes } from "../props/prop-def.js"

type CheckboxElement = React.ElementRef<typeof CheckboxRoot>
type CheckboxOwnProps = GetPropDefTypes<typeof checkboxPropDefs>
interface CheckboxProps
  extends ComponentPropsWithout<
      typeof CheckboxRoot,
      "asChild" | "color" | "defaultValue" | "children"
    >,
    MarginProps,
    CheckboxOwnProps {}
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  (props, forwardedRef) => {
    const {
      className,
      color,
      checked: checkedProp,
      defaultChecked: defaultCheckedProp,
      onCheckedChange,
      ...checkboxProps
    } = extractProps(props, checkboxPropDefs, marginPropDefs)

    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultCheckedProp ?? false,
      onChange: onCheckedChange,
    })

    return (
      <CheckboxRoot
        data-accent-color={color}
        {...checkboxProps}
        defaultChecked={defaultCheckedProp}
        checked={checked}
        onCheckedChange={setChecked}
        asChild={false}
        ref={forwardedRef}
        className={classNames(
          "rt-reset",
          "rt-BaseCheckboxRoot",
          "rt-CheckboxRoot",
          className
        )}
      >
        <CheckboxIndicator
          asChild
          className="rt-BaseCheckboxIndicator rt-CheckboxIndicator"
        >
          {checked === "indeterminate" ? (
            <ThickDividerHorizontalIcon />
          ) : (
            <ThickCheckIcon />
          )}
        </CheckboxIndicator>
      </CheckboxRoot>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
export type { CheckboxProps }
