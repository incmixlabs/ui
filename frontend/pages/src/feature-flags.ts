import { FEATURE_FLAGS_API_URL } from "@incmix/ui/constants"

// Define feature flag keys
export const FEATURE_FLAGS = {
  DASHBOARD_ENABLED: "enable-dashboard",
}

// Function to load feature flags (required by the package API)
export const loadFeatureFlags = async () => {
  const env = import.meta.env.MODE
  const res = await fetch(`${FEATURE_FLAGS_API_URL}?env=${env}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  const data = (await res.json()) as string[]
  return data
}
