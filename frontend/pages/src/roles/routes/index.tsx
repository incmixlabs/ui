"use client"

import { createRoute } from "@tanstack/react-router"

import { RootRoute } from "@common"
import RolesPage from "../roles-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/roles",
  component: () => <RolesPage />,
})
