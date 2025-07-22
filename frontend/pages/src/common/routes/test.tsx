"use client"

import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import RootRoute from "./root"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/test",
  component: lazyRouteComponent(() => import("../test-page")),
})
