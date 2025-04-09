/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

type TODO = any

function toVal(mix: TODO) {
  // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let k,
    y,
    str = ""

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      const len = mix.length
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          if ((y = toVal(mix[k]))) {
            // Changed assignment to conditional expression
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            str && (str += " ")
            str += y
          }
        }
      }
    } else {
      for (y in mix) {
        if (mix[y]) {
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          str && (str += " ")
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

  // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
  let i = 0,
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    tmp,
    x,
    str = ""
  for (; i < len; i++) {
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    if ((tmp = inputs[i])) {
      // Changed assignment to conditional expression
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      if ((x = toVal(tmp))) {
        // Changed assignment to conditional expression
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        str && (str += " ")
        str += x
      }
    }
  }
  return str
}

export default clsx
