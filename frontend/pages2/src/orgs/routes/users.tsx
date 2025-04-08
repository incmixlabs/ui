import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import OrganisationUsersPage from "../users-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organization/$orgHandle/users",
  component: () => <OrganisationUsersPage />,
})
