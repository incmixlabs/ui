import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/projects",
  component: lazyRouteComponent(() => import("../page")),
  validateSearch: searchParamsSchema,
})
