import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import type { z } from "zod"

export type TranslationSearchParams = z.infer<typeof searchParamsSchema>
export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/translations",
  component: lazyRouteComponent(() => import("../translations-page")),
  validateSearch: searchParamsSchema,
})
