"use client"
import { createRoute } from "@tanstack/react-router"
import LoadingPage from "../loading-page"
import RootRoute from "./root"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/loading",
  component: LoadingPage,
})
