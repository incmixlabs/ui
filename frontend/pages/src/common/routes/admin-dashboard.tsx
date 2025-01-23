"use client"
import { AdminPage } from "@common/components/layouts/admin-panel"
import { createRoute } from "@tanstack/react-router"
import { RootRoute } from "."

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/admin-dashboard",
  component: () => <AdminPage />,
})
