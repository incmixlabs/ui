import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import DashboardPage from "../page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard",
  component: () => <DashboardPage />,
})
