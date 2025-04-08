import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import OrganisationEnvVarsPage from "../env-vars-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organization/$orgHandle/env-vars",
  component: () => <OrganisationEnvVarsPage />,
})
