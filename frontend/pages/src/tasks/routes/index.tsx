"use client"

import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/tasks",
  component: lazyRouteComponent(() => import("../tasks-page")),
  validateSearch: searchParamsSchema,
})
