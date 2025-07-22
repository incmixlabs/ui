"use client"
import HomePage from "../home-page"
import RootRoute from "./root"
import { createRoute } from "@tanstack/react-router"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: () => <HomePage />,
})
