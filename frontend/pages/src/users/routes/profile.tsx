"use client"

import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import ProfilePage from "../profile-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/profile",
  component: () => <ProfilePage />,
})
