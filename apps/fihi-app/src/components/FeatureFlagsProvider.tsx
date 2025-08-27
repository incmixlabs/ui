import { loadFeatureFlags } from "@incmix/pages/feature-flags"
import { FeatureFlagsProvider as TTossFeatureFlagsProvider } from "@ttoss/react-feature-flags"
import React, { type ReactNode } from "react"

interface FeatureFlagsProviderProps {
  children: ReactNode
}

export function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  return (
    <TTossFeatureFlagsProvider loadFeatures={loadFeatureFlags}>
      {children}
    </TTossFeatureFlagsProvider>
  )
}
