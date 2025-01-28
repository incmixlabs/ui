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
