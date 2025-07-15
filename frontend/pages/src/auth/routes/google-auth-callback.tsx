"use client"
import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/google/callback",
  component: lazyRouteComponent(() => import("../google-auth-callback-page")),
  validateSearch: (search: Record<string, unknown>) => ({
    state: (search["state"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
