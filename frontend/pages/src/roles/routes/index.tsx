"use client"

import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { RootRoute } from "@common"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/roles",
  component: lazyRouteComponent(() => import("../roles-page")),
})
