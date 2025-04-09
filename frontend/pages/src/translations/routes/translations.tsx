import { RootRoute } from "@common"
import { searchParamsSchema } from "@incmix/utils/data-table"
import { createRoute } from "@tanstack/react-router"
import type { z } from "zod"
import TranslationsPage from "../translations-page"

export type TranslationSearchParams = z.infer<typeof searchParamsSchema>
export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/translations",
  component: () => <TranslationsPage />,
  validateSearch: searchParamsSchema,
})
