"use client"
import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import ResetPasswordPage from "../reset-password-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/reset-password",
  component: () => <ResetPasswordPage />,
  validateSearch: (search: Record<string, string>) => ({
    email: (search["email"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
