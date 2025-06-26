// useStore.ts
import { useEffect, useState } from "react"

const useStore = <T, F>(
  store: (callback: (state: T) => F) => () => void,
  callback: (state: T) => F
) => {
  const [data, setData] = useState<F>()

  useEffect(() => {
    const unsubscribe = store((state) => {
      const result = callback(state)
      setData(result)
      return result
    })

    return unsubscribe
  }, [store, callback])

  return data
}

export default useStore
