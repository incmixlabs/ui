import { API } from "@incmix/utils/env"

export const BFF_API_URL: string = getBffApiUrl()
export const VITE_SENTRY_DSN: string = import.meta.env.VITE_SENTRY_DSN || ""
export const INTL_API_URL = `${BFF_API_URL}${API.INTL}`
export const AUTH_API_URL = `${BFF_API_URL}${API.AUTH}`
export const USERS_API_URL = `${BFF_API_URL}${API.USERS}`
export const ORG_API_URL = `${BFF_API_URL}${API.ORG}`
export const TASKS_API_URL = `${BFF_API_URL}${API.TASKS}`
export const PROJECTS_API_URL = `${BFF_API_URL}${API.PROJECTS}`
export const EMAIL_API_URL = `${BFF_API_URL}${API.EMAIL}`
export const FILES_API_URL = `${BFF_API_URL}${API.FILES}`
export const LOCATION_API_URL = `${BFF_API_URL}${API.LOCATION}`

export const GENAI_API_URL = `${BFF_API_URL}${API.GENAI}`
export const PERMISSIONS_API_URL = `${BFF_API_URL}${API.PERMISSIONS}`

function getBffApiUrl(): string {
  const url = import.meta.env["VITE_BFF_API_URL"] || ""
  if (!url) {
    console.error("VITE_BFF_API_URL is not configured")
    throw new Error("BFF API URL is not configured")
  }
  return url
}
export function isMock(): boolean {
  return import.meta.env["REACT_APP_MOCK"] === "true"
}
