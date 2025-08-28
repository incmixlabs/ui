import React, { Suspense, useEffect } from "react"

import { useQuery } from "@tanstack/react-query"
import { setDefaultOptions } from "date-fns"

import { LoadingPage } from "@incmix/pages/common"
import { I18n, usei18n } from "@incmix/pages/i18n"
import { database as db } from "@incmix/store"
import {
  useAppearanceStore,
  useThemeStore,
} from "@incmix/store/use-settings-store"
import { Theme, Toaster } from "@incmix/ui"
import { Provider as RxdbProvider } from "rxdb-hooks"

import { FeatureFlagsProvider } from "./components/FeatureFlagsProvider"
import RouteProvider from "./route-provider"
import { translations } from "./translations"

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
    getRadiusValue,
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

    // Sidebar colors
    root.style.setProperty("--sidebar-background", sidebarColors.bg)
    root.style.setProperty("--sidebar-foreground", sidebarColors.fg)

    // Dashboard colors
    root.style.setProperty("--dashboard-color-1", dashboardColors.color1)
    root.style.setProperty("--dashboard-text-1", dashboardColors.text1)
    root.style.setProperty("--dashboard-color-2", dashboardColors.color2)
    root.style.setProperty("--dashboard-text-2", dashboardColors.text2)
    root.style.setProperty("--dashboard-color-3", dashboardColors.color3)
    root.style.setProperty("--dashboard-text-3", dashboardColors.text3)
    root.style.setProperty("--dashboard-color-4", dashboardColors.color4)
    root.style.setProperty("--dashboard-text-4", dashboardColors.text4)

    // Indicator colors
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

    // App radius
    root.style.setProperty("--app-radius", getRadiusValue(radius))
  }, [sidebarColors, dashboardColors, indicatorColors, radius])

  return (
    <FeatureFlagsProvider>
      <Theme
        appearance={appearance.appearance}
        accentColor={accentColor}
        grayColor={grayColor}
        radius={radius}
        scaling={scaling}
      >
        <RxdbProvider db={db as any}>
          <Suspense fallback={<LoadingPage />}>
            <Toaster />
            <RouteProvider />
          </Suspense>
        </RxdbProvider>
      </Theme>
    </FeatureFlagsProvider>
  )
}

export default App
