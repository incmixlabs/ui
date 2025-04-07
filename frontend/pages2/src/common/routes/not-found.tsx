"use client"
import { NotFoundPage, RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "*",
  component: () => <NotFoundPage />,
})
