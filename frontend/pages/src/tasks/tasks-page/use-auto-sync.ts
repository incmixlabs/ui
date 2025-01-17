import { usePGlite } from "@electric-sql/pglite-react"
import type { PGliteWithLive } from "@electric-sql/pglite/live"
import { useCallback, useEffect, useRef } from "react"

export const useAutoSync = (
  syncFunction: (db: PGliteWithLive) => Promise<void>
) => {
  const intervalRef = useRef<number | null>(null)
  const db = usePGlite()
  // Function to start the sync timer
  const startSyncTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(async () => {
        if (navigator.onLine) {
          await syncFunction(db)
        }
      }, 30000) // 30 Secs
    }
  }, [db, syncFunction])

  // Function to stop the sync timer
  const stopSyncTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    const performInitialSync = async () => {
      if (navigator.onLine) {
        console.log("Page refresh detected. Performing initial sync...")
        await syncFunction(db) // Sync immediately on page refresh if online
        startSyncTimer() // Start periodic sync after the initial sync
      } else {
        console.log("User is offline. Sync will resume when online.")
      }
    }

    // Sync immediately on mount (page refresh)
    performInitialSync()
    // Sync immediately when coming online
    const handleOnline = () => {
      console.log("User is online. Syncing now...")
      syncFunction(db)
      startSyncTimer() // Restart the timer when online
    }

    const handleOffline = () => {
      console.log("User is offline. Stopping sync timer.")
      stopSyncTimer()
    }

    // Listen for online/offline events
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Start the sync timer if the user is online
    if (navigator.onLine) {
      startSyncTimer()
    }

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      stopSyncTimer()
    }
  }, [syncFunction, db, startSyncTimer, stopSyncTimer]) // Rerun the effect if syncFunction changes

  return null // This hook doesn't render anything
}
