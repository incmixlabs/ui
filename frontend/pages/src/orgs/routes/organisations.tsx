import { createRoute } from "@tanstack/react-router"

import { RootRoute } from "@/common"
import OrganizationsPage from "../organisations-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organizations",
  component: () => <OrganizationsPage />,
})
