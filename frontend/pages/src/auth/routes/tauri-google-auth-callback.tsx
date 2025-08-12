"use client"
import RootRoute from "../../common/routes/root"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/google/tauri-callback",
  component: lazyRouteComponent(
    () => import("../tauri-google-auth-callback-page")
  ),
  validateSearch: (search: Record<string, unknown>) => ({
    state: (search["state"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
