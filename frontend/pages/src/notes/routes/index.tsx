"use client"

import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/notes",
  component: lazyRouteComponent(() => import("../page")),
  validateSearch: searchParamsSchema,
})
