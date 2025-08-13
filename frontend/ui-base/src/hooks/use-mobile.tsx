import { useSidebarStore } from "@incmix/store/use-settings-store"
import * as React from "react"
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const sidebar = useSidebarStore()
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobile)
      sidebar.setIsMobile(isMobile)
    }
    mql.addEventListener("change", onChange)
    const initialIsMobile = window.innerWidth < MOBILE_BREAKPOINT
    setIsMobile(initialIsMobile)
    sidebar.setIsMobile(initialIsMobile)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
