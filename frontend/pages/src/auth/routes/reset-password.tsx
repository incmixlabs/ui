"use client"
import RootRoute from "../../common/routes/root"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/reset-password",
  component: lazyRouteComponent(() => import("../reset-password-page")),
  validateSearch: (search: Record<string, string>) => ({
    email: (search["email"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
