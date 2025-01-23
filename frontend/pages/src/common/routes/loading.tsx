"use client"
import { LoadingPage, RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/loading",
  component: () => <LoadingPage />,
})
