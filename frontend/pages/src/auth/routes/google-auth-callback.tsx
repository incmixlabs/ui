"use client"
import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import GoogleAuthCallbackPage from "../google-auth-callback-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/google/callback",
  component: () => <GoogleAuthCallbackPage />,
  validateSearch: (search: Record<string, unknown>) => ({
    state: (search["state"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
