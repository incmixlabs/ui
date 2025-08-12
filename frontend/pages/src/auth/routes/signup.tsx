"use client"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import RootRoute from "../../common/routes/root"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/signup",
  component: lazyRouteComponent(() => import("../signup-page")),
})
