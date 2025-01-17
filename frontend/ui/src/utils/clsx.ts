type TODO = ClassValue

function toVal(mix: TODO) {
  let k: number
  let y: keyof TODO | string
  let str = ""

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix
  } else if (typeof mix === "object" && mix != null) {
    if (Array.isArray(mix)) {
      const len = mix.length
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          y = toVal(mix[k])
          if (y) {
            // Changed assignment to conditional expression
            if (str) str += " "

            str += y
          }
        }
      }
    } else {
      for (y in mix) {
        if (mix[y]) {
          if (str) str += " "
          str += y
        }
      }
    }
  }

  return str
}

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

export function clsx(...inputs: ClassValue[]): string {
  const len = inputs.length // Changed 'let' to 'const'

  let i = 0
  let tmp: (typeof inputs)[number]
  let x: unknown
  let str = ""
  for (; i < len; i++) {
    tmp = inputs[i]
    if (tmp) {
      // Changed assignment to conditional expression
      x = toVal(tmp)
      if (x) {
        // Changed assignment to conditional expression
        if (str) str += " "
        str += x
      }
    }
  }
  return str
}

export default clsx
