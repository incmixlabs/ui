import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/organizations",
  component: lazyRouteComponent(() => import("../organisations-page")),
})
