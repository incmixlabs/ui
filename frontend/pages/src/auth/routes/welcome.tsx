"use client"
import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import WelcomePage from "../welcome-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/welcome",
  component: WelcomePage,
  validateSearch: (search: Record<string, unknown>) => ({
    email: (search["email"] as string) || "",
  }),
})
