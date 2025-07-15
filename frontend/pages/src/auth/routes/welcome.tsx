"use client"
import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/welcome",
  component: lazyRouteComponent(() => import("../welcome-page")),
  validateSearch: (search: Record<string, unknown>) => ({
    email: (search["email"] as string) || "",
  }),
})
