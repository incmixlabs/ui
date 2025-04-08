import { createRoute, redirect } from "@tanstack/react-router"

import { RootRoute } from "@/common"
import OrganisationUsersRoute from "./users"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organization/$orgHandle",
  loader: () => redirect({ to: OrganisationUsersRoute.fullPath }),
})
