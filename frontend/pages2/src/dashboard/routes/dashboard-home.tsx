import { RootRoute } from "@/common"
import DashboardHomePage from "@/dashboard/pages/home"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/home",
  component: () => <DashboardHomePage />,
})
