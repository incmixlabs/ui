// Define feature flag keys
export const FEATURE_FLAGS = {
  DASHBOARD_ENABLED: "dashboard_enabled",
}

export type FeatureFlagConfig = {
  name: string
  enabled: boolean
  metadata: Record<string, string>
}

// Feature flag configuration
// For now, hardcoded - can be pulled from backend later
const featureFlagsConfig: FeatureFlagConfig[] = [
  {
    name: FEATURE_FLAGS.DASHBOARD_ENABLED,
    // Only enable dashboard in local development
    enabled: import.meta.env.MODE === "development",
    // Additional metadata can be added here
    metadata: {
      description: "Controls access to the dashboard page",
      environment: import.meta.env.MODE || "development",
    },
  },
]

// Function to load feature flags (required by the package API)
export const loadFeatureFlags = async () => {
  // For now, return hardcoded config
  // Later this can be replaced with an API call to backend
  return featureFlagsConfig.filter((f) => f.enabled).map((f) => f.name)
}
