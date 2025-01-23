"use client"
import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import ForgotPasswordPage from "../forgot-password-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/forgot-password",
  component: () => <ForgotPasswordPage />,
})
