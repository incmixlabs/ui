"use client"
import { NotFoundPage, RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "*",
  component: () => <NotFoundPage />,
})
