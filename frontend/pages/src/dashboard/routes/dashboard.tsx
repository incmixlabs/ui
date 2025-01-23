import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import DashboardPage from "../dashboard-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard",
  component: () => <DashboardPage />,
})
