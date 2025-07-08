import { nanoid } from "nanoid"

export function generateBrowserUniqueId(prefix?: string): string {
  const id = nanoid()
  return prefix ? `${prefix}-${id}` : id
}

export function getCurrentTimestamp(): number {
  return Date.now()
}

export function generateUniqueId(prefix?: string, length = 10): string {
  const randomId = nanoid(length)
  return prefix ? `${prefix}-${randomId}` : randomId
}