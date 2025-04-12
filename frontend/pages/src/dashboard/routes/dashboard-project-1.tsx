import { RootRoute } from "@/common"
import { createRoute } from "@tanstack/react-router"
import DashboardProject1 from "../pages/project-1"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/project-1",
  component: () => <DashboardProject1 />,
})
