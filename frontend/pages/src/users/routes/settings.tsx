"use client"

import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/settings",
  component: lazyRouteComponent(() => import("../settings-page")),
})
