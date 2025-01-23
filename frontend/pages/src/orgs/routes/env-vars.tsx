import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import OrganisationEnvVarsPage from "../env-vars-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organization/$orgId/env-vars",
  component: () => <OrganisationEnvVarsPage />,
})
