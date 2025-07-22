"use client"
import { createRoute } from "@tanstack/react-router"
import RootRoute from "./root"
import LoadingPage from "../loading-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/loading",
  component: LoadingPage,
})
