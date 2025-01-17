"use client"
import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import SignupPage from "../signup-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/signup",
  component: () => <SignupPage />,
})
