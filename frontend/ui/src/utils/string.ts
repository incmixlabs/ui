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

export function encodeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
