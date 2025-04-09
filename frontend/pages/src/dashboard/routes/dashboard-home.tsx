import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import DashboardHomePage from "../pages/home"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/home",
  component: () => <DashboardHomePage />,
})
