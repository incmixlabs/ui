"use client"

import { createRoute } from "@tanstack/react-router"

import { RootRoute } from "@/common"
import { searchParamsSchema } from "@incmix/utils/data-table"
import FileManagerPage from "../page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/file-manager",
  component: () => <FileManagerPage />,
  validateSearch: searchParamsSchema,
})
