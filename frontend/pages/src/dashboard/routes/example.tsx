import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import ExampleDashboardPage from "../pages/example-dashboard"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/demo/example",
  component: () => <ExampleDashboardPage />,
})
