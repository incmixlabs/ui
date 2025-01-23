"use client"
import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import EmailVerificationPage from "../email-verification-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/email-verification",
  component: () => <EmailVerificationPage />,
  validateSearch: (search: Record<string, string>) => ({
    email: (search["email"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
