"use client"

import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/profile",
  component: lazyRouteComponent(() => import("../profile-page")),
})
