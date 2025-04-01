export function camelize(str: string) {
  return str.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    (match: string, index: number) => {
      if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    }
  )
}

export function capitalize(str: string) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

export function strEnum<T extends string>(o: T[]): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}

// console.log(camelToCapitalize('camelCaseString')); // Output: CAMEL CASE STRING
export function camelToCapitalized(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase())
}

// console.log(capitalizedToCamel("This Is A Capitalized Sentence"); // Output: thisIsACapitalizedSentence
export function capitalizedToCamel(str: string): string {
  const words = str.trim().split(" ")
  const camelCase = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("")
  return camelCase
}

export function encodeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
