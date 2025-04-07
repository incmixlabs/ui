import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import DashboardProject2 from "../pages/project-2"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/project-2",
  component: () => <DashboardProject2 />,
})
