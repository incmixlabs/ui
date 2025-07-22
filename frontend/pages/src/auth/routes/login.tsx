"use client"
import RootRoute from "../../common/routes/root"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  component: lazyRouteComponent(() => import("../login-page")),
})
