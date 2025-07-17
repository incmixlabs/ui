import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organization/$orgHandle/users",
  component: lazyRouteComponent(() => import("../users-page")),
})
