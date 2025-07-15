"use client"
import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/email-verification",
  component: lazyRouteComponent(() => import("../email-verification-page")),
  validateSearch: (search: Record<string, string>) => ({
    email: (search["email"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
