"use client"
import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/signup",
  component: lazyRouteComponent(() => import("../signup-page")),
})
