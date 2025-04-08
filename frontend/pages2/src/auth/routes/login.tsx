"use client"
import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import LoginPage from "../login-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  component: () => <LoginPage />,
})
