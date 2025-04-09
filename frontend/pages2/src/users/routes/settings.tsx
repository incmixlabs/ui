"use client"

import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import SettingsPage from "../settings-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/settings",
  component: () => <SettingsPage />,
})
