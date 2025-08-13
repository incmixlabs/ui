export const copyToClipboard = (str: string) => {
  return navigator.clipboard.writeText(str)
}
