import { useSyncExternalStore } from "react"

export function useWindowSize() {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("resize", onStoreChange)
      return () => window.removeEventListener("resize", onStoreChange)
    },
    () => ({ width: window.innerWidth, height: window.innerHeight })
  )
}
