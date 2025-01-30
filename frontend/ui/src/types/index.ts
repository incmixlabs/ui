export type Side = "left" | "right"
export type Direction = "ltr" | "rtl"
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
export interface BooleanComp {
  off: string
  on: string
}

export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : K]: T[K]
}

export type DynamicStringEnum<T> = T | (string & {})

export type DynamicStringEnumKeysOf<T extends object> = DynamicStringEnum<
  keyof RemoveIndexSignature<T>
>

export interface StateColors {
  info: string
  failure: string
  success: string
  warning: string
}

export interface Colors extends StateColors {
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

export interface Sizes {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  "2xl": string
  "3xl": string
  "4xl": string
  "5xl": string
  "6xl": string
  "7xl": string
}
