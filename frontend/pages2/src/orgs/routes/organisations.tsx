import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import OrganizationsPage from "../organisations-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organizations",
  component: () => <OrganizationsPage />,
})
