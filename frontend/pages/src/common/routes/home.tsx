"use client"
import { createRoute } from "@tanstack/react-router"
import HomePage from "../home-page"
import RootRoute from "./root"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: () => <HomePage />,
})
