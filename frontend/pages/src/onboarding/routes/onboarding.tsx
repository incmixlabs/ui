import { RootRoute } from "@common"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/onboarding",
  component: lazyRouteComponent(() => import("../pages/onboarding-page")),
})
