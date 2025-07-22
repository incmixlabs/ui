"use client"
import { createRoute } from "@tanstack/react-router"
import NotFoundPage from "../not-found-page"
import RootRoute from "./root"
export default createRoute({
  getParentRoute: () => RootRoute,
  path: "*",
  component: NotFoundPage,
})
