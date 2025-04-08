"use client"

import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"

import { searchParamsSchema } from "@incmix/utils/data-table"
import type { z } from "zod"
import ListUsersPage from "../list-users-page"

export type UserListSearchParams = z.infer<typeof searchParamsSchema>
export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/users/list",
  component: () => <ListUsersPage />,
  validateSearch: searchParamsSchema,
})
