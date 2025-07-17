import React, { Suspense, useEffect, useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { setDefaultOptions } from "date-fns"

import { useAuth } from "@incmix/pages"
import { LoadingPage } from "@incmix/pages/common"
import { I18n, usei18n } from "@incmix/pages/i18n"
import { database as db } from "@incmix/store"
import {
  useAppearanceStore,
  useThemeStore,
} from "@incmix/store/use-settings-store"
import { Theme, Toaster } from "@incmix/ui"
import type { LanguageOption as Language } from "@incmix/utils/types"
import { Provider as RxdbProvider } from "rxdb-hooks"
import { buildRouteTree } from "./route-builder"
import { translations } from "./translations"

export const dateFNSLocale: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
}

function App() {
  const appearance = useAppearanceStore()
  const {
    accentColor,
    grayColor,
    radius,
    scaling,
    getSidebarColor,
    getDashboardColors,
    getIndicatorColors,
    getPastel,
  } = useThemeStore()

  // Get computed colors from your theme store
  const sidebarColors = getSidebarColor()
  const dashboardColors = getDashboardColors()
  const indicatorColors = getIndicatorColors(getPastel())

  const { language } = appearance
  useQuery({
    queryKey: ["translations"],
    queryFn: () => {
      usei18n(translations)
      return ""
    },
  })

  useEffect(() => {
    if (language) {
      I18n.changeLanguage(language)
      // @ts-ignore
      // TBD typed language map
      setDefaultOptions({ locale: language })
    }
  }, [language])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--sidebar-background", sidebarColors.bg)
    root.style.setProperty("--sidebar-foreground", sidebarColors.fg)

    root.style.setProperty("--dashboard-color-1", dashboardColors.color1)
    root.style.setProperty("--dashboard-text-1", dashboardColors.text1)
    root.style.setProperty("--dashboard-color-2", dashboardColors.color2)
    root.style.setProperty("--dashboard-text-2", dashboardColors.text2)
    root.style.setProperty("--dashboard-color-3", dashboardColors.color3)
    root.style.setProperty("--dashboard-text-3", dashboardColors.text3)
    root.style.setProperty("--dashboard-color-4", dashboardColors.color4)
    root.style.setProperty("--dashboard-text-4", dashboardColors.text4)

    root.style.setProperty("--indicator-danger", indicatorColors.danger)
    root.style.setProperty(
      "--indicator-danger-text",
      indicatorColors.dangerText
    )
    root.style.setProperty("--indicator-warning", indicatorColors.warning)
    root.style.setProperty(
      "--indicator-warning-text",
      indicatorColors.warningText
    )
    root.style.setProperty("--indicator-success", indicatorColors.success)
    root.style.setProperty(
      "--indicator-success-text",
      indicatorColors.successText
    )
    root.style.setProperty("--indicator-info", indicatorColors.info)
    root.style.setProperty("--indicator-info-text", indicatorColors.infoText)
    root.style.setProperty("--indicator-default", indicatorColors.default)
    root.style.setProperty(
      "--indicator-default-text",
      indicatorColors.defaultText
    )
  }, [sidebarColors, dashboardColors, indicatorColors])

  const { authUser, isLoading } = useAuth()

  const router = useMemo(() => {
    return buildRouteTree(authUser, isLoading)
  }, [authUser, isLoading])

  return (
    <Theme
      appearance={appearance.appearance}
      accentColor={accentColor}
      grayColor={grayColor}
      radius={radius}
      scaling={scaling}
    >
      <RxdbProvider db={db}>
        <Suspense fallback={<LoadingPage />}>
          <Toaster />
          <RouterProvider router={router} />
        </Suspense>
      </RxdbProvider>
    </Theme>
  )
}

export default App
