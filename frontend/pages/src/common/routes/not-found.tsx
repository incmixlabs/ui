"use client"
import { createRoute } from "@tanstack/react-router"
import { RootRoute } from "."
import NotFoundPage from "../not-found-page"
export default createRoute({
  getParentRoute: () => RootRoute,
  path: "*",
  component: NotFoundPage,
})
