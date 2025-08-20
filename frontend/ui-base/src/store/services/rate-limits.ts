import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const services = ["auth", "intl", "org", "users", "todo", "location"] as const
type Services = (typeof services)[number]
export type RateLimtItems = {
  [key in Services]?: { time: number; limit: number }
}

interface RateLimitStore {
  rateLimits: RateLimtItems
  setRateLimits: (rateLimits: RateLimtItems) => void
}

const rateLimitStore = create<RateLimitStore>()(
  persist(
    (set) => {
      return {
        rateLimits: {},
        setRateLimits: (rateLimits: RateLimtItems) => set({ rateLimits }),
      }
    },
    {
      name: "rate-limit-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useRateLimitStore = () =>
  rateLimitStore((state) => ({
    rateLimits: state.rateLimits,
    setRateLimits: state.setRateLimits,
  }))
