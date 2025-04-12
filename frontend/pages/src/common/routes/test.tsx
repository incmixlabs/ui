"use client"

import { RootRoute, TestPage } from "@/common"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/test",
  component: () => <TestPage />,
})
