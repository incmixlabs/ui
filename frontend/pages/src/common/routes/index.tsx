"use client"
import { HomePage, RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"

export const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: () => <HomePage />,
})

export { default as RootRoute } from "./root"
export { default as TestRoute } from "./test"
export { default as NotFoundRoute } from "./not-found"
export { default as LoadingRoute } from "./loading"
