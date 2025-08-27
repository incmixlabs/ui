import { API } from "@incmix/utils/fetch"

export const VITE_CHECK_INTERVAL : number = Number(import.meta.env.VITE_CHECK_INTERVAL ?? 60000)
export const VITE_IDLE_TIME : number = Number(import.meta.env.VITE_IDLE_TIME ?? 5)
export const VITE_LOCAL_DB : string = import.meta.env.VITE_LOCAL_DB || "incmix-db"

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

function getBffApiUrl(): string {
  const url = import.meta.env["VITE_BFF_API_URL"] || ""
  if (!url) {
    console.error("VITE_BFF_API_URL is not configured")
    throw new Error("BFF API URL is not configured")
  }
  return url
}
export function isMock(): boolean {
  return import.meta.env["VITE_APP_MOCK_DATA"] === "true"
}
export const isMockData = isMock()
