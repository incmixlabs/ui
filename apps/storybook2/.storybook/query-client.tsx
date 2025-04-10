import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = React.useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  }, [])
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
