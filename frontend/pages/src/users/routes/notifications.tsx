"use client"

import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import NotificationsPage from "../notifications-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/notifications",
  component: () => <NotificationsPage />,
})
