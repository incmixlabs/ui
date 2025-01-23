"use client";
import { useEffect, useState } from "react"

export function useRunOnce(callback: () => void, deps: unknown[] = []) {
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (!hasRun) {
      callback()
      setHasRun(true)
    }
  }, [hasRun, callback, ...deps])
}
