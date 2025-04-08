export function camelToCapitalized(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}
export const getInitials = (name: string) => {
  if (!name) return ""
  return (
    name
      .match(/(\b\S)?/g)
      ?.join("")
      .match(/(^\S|\S$)?/g)
      ?.join("")
      .toUpperCase() || ""
  )
}
