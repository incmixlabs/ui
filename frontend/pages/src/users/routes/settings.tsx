"use client"

import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import SettingsPage from "../settings-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/settings",
  component: () => <SettingsPage />,
})
