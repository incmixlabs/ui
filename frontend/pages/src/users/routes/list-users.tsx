"use client"

import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { searchParamsSchema } from "@incmix/utils/data-table"
import type { z } from "zod"

export type UserListSearchParams = z.infer<typeof searchParamsSchema>
export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/users/list",
  component: lazyRouteComponent(() => import("../list-users-page")),
  validateSearch: searchParamsSchema,
})
