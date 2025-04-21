import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import DynamicDashboardPage from "../pages/dynamic-dashboard-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/project/$projectId",
  component: () => <DynamicDashboardPage />,
})
