"use client"

import { createRoute } from "@tanstack/react-router"

import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"
import ProjectsPage from "../projects-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/projects",
  component: () => <ProjectsPage />,
  validateSearch: searchParamsSchema,
})
