import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organization/$orgHandle/env-vars",
  component: lazyRouteComponent(() => import("../env-vars-page")),
})
