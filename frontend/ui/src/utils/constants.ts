import { API } from "@incmix/utils/env"
export const BFF_API_URL: string = import.meta.env["VITE_BFF_API_URL"] || ""
export const VITE_SENTRY_DSN: string = import.meta.env.VITE_SENTRY_DSN || ""
export const INTL_API_URL = `${BFF_API_URL}${API.INTL}`
export const AUTH_API_URL = `${BFF_API_URL}${API.AUTH}`
export const USERS_API_URL = `${AUTH_API_URL}/users`
export const ORG_API_URL = `${BFF_API_URL}${API.ORG}`
export const PROJECTS_API_URL = `${BFF_API_URL}${API.PROJECTS}`
export const TASKS_API_URL = `${PROJECTS_API_URL}/tasks`
export const EMAIL_API_URL = `${BFF_API_URL}${API.EMAIL}`
export const FILES_API_URL = `${BFF_API_URL}${API.FILES}`
export const LOCATION_API_URL = `${BFF_API_URL}${API.LOCATION}`

export const GENAI_API_URL = `${BFF_API_URL}${API.GENAI}`
export const PERMISSIONS_API_URL = `${ORG_API_URL}/permissions`
