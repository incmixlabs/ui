"use client"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import RootRoute from "../../common/routes/root"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/welcome",
  component: lazyRouteComponent(() => import("../welcome-page")),
  validateSearch: (search: Record<string, unknown>) => ({
    email: (search["email"] as string) || "",
  }),
})
