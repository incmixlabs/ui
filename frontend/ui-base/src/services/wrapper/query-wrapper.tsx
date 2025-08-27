import {
  queryOptions,
  experimental_streamedQuery as streamedQuery,
  useQuery,
} from "@tanstack/react-query"
import { type FC, useEffect, useState } from "react"
import { Spinner } from "@/base"
import { API, secureFetch, endPointDef, type Persistence, type  HttpMethod } from "@incmix/utils/fetch"

export type QueryWrapperProps = endPointDef & {
  queryKey: string
  queryUrl?: string
  queryPath: string
  queryParams?: Record<string, any>
  spin?: boolean
  QuerySpinner?: React.ReactNode
  QueryLoader?: React.ReactNode
  QueryError?: React.ReactNode
  QueryRender: React.FC<{ data: any; lastUpdated: number }>
  method?: HttpMethod
  streaming?: boolean
  sortFn?: (a: any, b: any) => number
  uniqueKey?: string
  mergeFn?: (data: any[]) => any
  transform?: (data: any) => any
  persistFn?: (data: any) => void
}
export function registerURL(_url: string): void {
  // Register the URL for use in the application
}
export function QueryWrapper(props: QueryWrapperProps): FC {
  const {
    queryKey,
    queryUrl,
    persistTypes,
    method = HttpMethod.GET,
    queryPath,
    transform,
    queryParams,
    QueryLoader = <div>Loading...</div>,
    QueryRender,
  } = props
  const url = queryUrl ?? `${BFF_API_URL}${queryPath}`
  const [isReady, setIsReady] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(0)
  const [_recordCount, setRecordCount] = useState(0)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey], // Unique key for this query
    queryFn: async () => {
      // Asynchronous function to fetch data
      // Append queryParams to the URL if present
      const queryString = queryParams
        ? "?" + new URLSearchParams(queryParams).toString()
        : ""
      const response = await secureFetch(url + queryString, {
        method,
      })
      // Type assertion to fix 'unknown' type error
      const res = response as { data: any }
      if (transform) {
        return transform(res.data)
      }
      return res.data
    },
  })

  useEffect(() => {
    if (!isLoading && !isError) {
      setIsReady(true)
      setLastUpdated(Date.now())
      setRecordCount(data?.length || 0)
    }
  }, [isLoading, isError, setIsReady, setLastUpdated])

  if (isLoading) {
    return QueryLoader
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (isReady) {
    return <QueryRender data={data} lastUpdated={lastUpdated} />
  }

  return null
}

export function StreamQueryWrapper(props: QueryWrapperProps) {
  const {
    queryKey,
    queryUrl,
    method = methods.GET,
    queryPath,
    transform,
    queryParams,
    QueryLoader = <div>Loading...</div>,
    QueryRender,
  } = props
  const url = queryUrl ?? `${BFF_API_URL}${queryPath}`
  const [isReady, setIsReady] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(0)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey], // Unique key for this query
    queryFn: async () => {
      // Asynchronous function to fetch data
      const response = await secureFetch(url, {
        method,
        params: queryParams,
      })
      if (transform) {
        return transform(response.data)
      }
      return response.data
    },
  })

  useEffect(() => {
    if (!isLoading && !isError) {
      setIsReady(true)
      setLastUpdated(Date.now())
    }
  }, [isLoading, isError, setLastUpdated, setIsReady])

  if (isLoading) {
    return QueryLoader
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (isReady) {
    return <QueryRender data={data} lastUpdated={lastUpdated} />
  }
}
