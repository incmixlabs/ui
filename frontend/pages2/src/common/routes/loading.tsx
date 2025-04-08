"use client"
import { LoadingPage, RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/loading",
  component: () => <LoadingPage />,
})
