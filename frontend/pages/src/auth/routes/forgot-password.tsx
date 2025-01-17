"use client"
import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import ForgotPasswordPage from "../forgot-password-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/forgot-password",
  component: () => <ForgotPasswordPage />,
})
