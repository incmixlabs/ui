"use client"

import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"
import { createRoute } from "@tanstack/react-router"
import NotesPage from "../page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/notes",
  component: () => <NotesPage />,
  validateSearch: searchParamsSchema,
})
