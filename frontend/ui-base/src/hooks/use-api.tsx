import axios from "axios"
import { useEffect, useState } from "react"
import { useRunOnce } from "./use-run-once"

export const useApi = (url: string, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, options)
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, JSON.stringify(options)])

  return { data, loading, error }
}

export default useApi
