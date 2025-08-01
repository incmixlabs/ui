import { createRoute } from "@tanstack/react-router"
import RootRoute from "../../common/routes/root"
import DashboardHomePage from "../pages/home"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard/home",
  component: DashboardHomePage,
})
