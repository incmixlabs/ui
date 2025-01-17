"use client"

import { createRoute } from "@tanstack/react-router"

import { RootRoute } from "@common"
import { searchParamsSchema } from "@jsprtmnn/utils/data-table"
import TasksPage from "../tasks-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/tasks",
  component: () => <TasksPage />,
  validateSearch: searchParamsSchema,
})
