import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import OrganizationsPage from "../organisations-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organizations",
  component: () => <OrganizationsPage />,
})
