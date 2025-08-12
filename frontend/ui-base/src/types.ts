import type { SVGProps } from "react"
export type Side = "left" | "right"
export const side = {
  left: "left",
  right: "right",
}
export type Direction = "ltr" | "rtl"
export const direction = {
  ltr: "ltr",
  rtl: "rtl",
}

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: string | number
  color?: string
}
export const iconWidth = {
  "1": "15px",
  "2": "18px",
  "3": "22px",
  "4": "24px",
}
export type Size = "1" | "2" | "3" | "4"
export const size = {
  sm: "1",
  md: "2",
  lg: "3",
  xl: "4",
  default: "2",
}
export type ExtendSize = Size | "5" | "6" | "7" | "8" | "9"
export const extendedSize = {
  ...size,
  xl: "5",
  "1x": "6",
  "2x": "7",
  "3x": "8",
  "4x": "9",
}
export const extendIconWidth = {
  ...iconWidth,
  "5": "28px",
  "6": "32px",
  "7": "36px",
  "8": "40px",
  "9": "44px",
}
export type Orientation = "horizontal" | "vertical"
export const orientation = {
  horizontal: "horizontal",
  vertical: "vertical",
}
export type Radius = "none" | "small" | "medium" | "large" | "full"
export const radius = {
  none: "none",
  small: "small",
  medium: "medium",
  large: "large",
  full: "full",
}
export type Variant = "classic" | "surface" | "soft"
export const variant = {
  classic: "classic",
  surface: "surface",
  soft: "soft",
}
export type ButtonVariant = Variant | "outline" | "solid" | "ghost"
export const buttonVariant = {
  ...variant,
  outline: "outline",
  solid: "solid",
  ghost: "ghost",
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
export type BooleanComp = "off" | "on"
export const booleanComp = {
  off: "off",
  on: "on",
}
export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : K]: T[K]
}

export type DynamicStringEnum<T> = T | (string & {})

export type DynamicStringEnumKeysOf<T extends object> = DynamicStringEnum<
  keyof RemoveIndexSignature<T>
>

export type StateColor = {
  info: string
  failure: string
  success: string
  warning: string
}
export interface Colors extends StateColor {
  [key: string]: string
  blue: string
  cyan: string
  dark: string
  gray: string
  green: string
  indigo: string
  light: string
  lime: string
  pink: string
  purple: string
  red: string
  teal: string
  yellow: string
}
