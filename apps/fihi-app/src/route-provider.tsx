"use client"
import { useAuth } from "@incmix/pages/auth"
import { LoadingPage } from "@incmix/pages/common"
import { buildRouteTree } from "@incmix/pages/route-config"
import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router"
import React, { useEffect, useState } from "react"

const RouteProvider = () => {
  const { authUser, isLoading } = useAuth()
  const [router, setRouter] =
    useState<Awaited<ReturnType<typeof buildRouteTree>>>()
  const [isRouterLoading, setIsRouterLoading] = useState(true)
  useEffect(() => {
    // Only rebuild router when auth state actually changes meaningfully
    buildRouteTree(authUser, isLoading).then((router) => {
      setRouter(router)
      setIsRouterLoading(false)
    })
  }, [authUser?.isSuperAdmin, authUser?.id, isLoading])
  if (!router && !isRouterLoading) return "Failed to build routes"

  if (isRouterLoading || !router) return <LoadingPage />

  return <TanstackRouterProvider router={router} />
}

export default RouteProvider
