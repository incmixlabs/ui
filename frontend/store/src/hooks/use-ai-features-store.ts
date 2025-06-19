import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AIFeaturesState {
  useAI: boolean
  setUseAI: (value: boolean) => void
  // AIFLAG: add more feature flags here later if needed
}

export const useAIFeaturesStore = create<AIFeaturesState>()(
  persist(
    (set) => ({
      useAI: false,
      setUseAI: (value) => set({ useAI: value }),
    }),
    {
      name: "ai-features-storage", // localStorage key
    }
  )
)
