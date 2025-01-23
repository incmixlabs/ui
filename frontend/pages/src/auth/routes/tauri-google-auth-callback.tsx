"use client"
import { RootRoute } from "@incmix/pages/common"
import { createRoute } from "@tanstack/react-router"
import TauriGoogleAuthCallbackPage from "../tauri-google-auth-callback-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "auth/google/tauri-callback",
  component: () => <TauriGoogleAuthCallbackPage />,
  validateSearch: (search: Record<string, unknown>) => ({
    state: (search["state"] as string) || "",
    code: (search["code"] as string) || "",
  }),
})
