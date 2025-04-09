export type TranslationMessage = {
  id: number
  locale: string
  key: string
  value: string
  namespace: string
  type: "frag" | "label"
}

export type Locale = {
  code: string
  isDefault: boolean
}
