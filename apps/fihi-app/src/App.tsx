import React, { type CSSProperties, Suspense, useEffect, useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { setDefaultOptions } from "date-fns"

import { LoadingPage, NotFoundPage } from "@incmix/pages/common"
import { I18n, usei18n } from "@incmix/pages/i18n"
import { database as db } from "@incmix/store"
import {
  useAppearanceStore,
  useThemeStore,
} from "@incmix/store/use-settings-store"
import { Theme, Toaster } from "@incmix/ui"
import type { LanguageOption as Language } from "@incmix/utils/types"
import { Provider as RxdbProvider } from "rxdb-hooks"
import { translations } from "./translations"

export const dateFNSLocale: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
}

// const db = await createDatabase()

import {
  DashboardHomeRoute,
  DynamicDashboard,
  EmailVerificationRoute,
  FileManagerRoute,
  ForgotPasswordRoute,
  GoogleAuthCallbackRoute,
  IndexRoute,
  ListUsersRoute,
  LoadingRoute,
  LoginRoute,
  NotFoundRoute,
  NotesRoute,
  NotificationsRoute,
  OnboardingRoute,
  OrganisationDetailsRoute,
  OrganisationEnvVarsRoute,
  OrganisationUsersRoute,
  OrganisationsRoute,
  ProfileRoute,
  ProjectsRoute,
  ResetPasswordRoute,
  RolesRoute,
  RootRoute,
  SettingsRoute,
  SignupRoute,
  TasksRoute,
  TauriGoogleAuthCallbackRoute,
  TestRoute,
  TranslationsRoute,
  WelcomeRoute,
} from "@incmix/pages"

const routeTree = RootRoute.addChildren([
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  EmailVerificationRoute,
  SignupRoute,
  IndexRoute,
  WelcomeRoute,
  GoogleAuthCallbackRoute,
  TauriGoogleAuthCallbackRoute,
  ProfileRoute,
  SettingsRoute,
  TestRoute,
  OrganisationsRoute,
  OrganisationDetailsRoute,
  OrganisationUsersRoute,
  OrganisationEnvVarsRoute,
  NotificationsRoute,
  NotFoundRoute,
  LoadingRoute,
  FileManagerRoute,
  DashboardHomeRoute,
  NotesRoute,
  DynamicDashboard,
  ListUsersRoute,
  TasksRoute,
  ProjectsRoute,
  TranslationsRoute,
  RolesRoute,
  OnboardingRoute,
])

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
})

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

  return (
    <Theme
      appearance={appearance.appearance}
      accentColor={accentColor}
      grayColor={grayColor}
      radius={radius}
      scaling={scaling}
      style={
        {
          "--sidebar-background": sidebarColors.bg,
          "--sidebar-foreground": sidebarColors.text,

          "--dashboard-color-1": dashboardColors.color1,
          "--dashboard-text-1": dashboardColors.text1,
          "--dashboard-color-2": dashboardColors.color2,
          "--dashboard-text-2": dashboardColors.text2,
          "--dashboard-color-3": dashboardColors.color3,
          "--dashboard-text-3": dashboardColors.text3,
          "--dashboard-color-4": dashboardColors.color4,
          "--dashboard-text-4": dashboardColors.text4,

          "--indicator-danger": indicatorColors.danger,
          "--indicator-danger-text": indicatorColors.dangerText,
          "--indicator-warning": indicatorColors.warning,
          "--indicator-warning-text": indicatorColors.warningText,
          "--indicator-success": indicatorColors.success,
          "--indicator-success-text": indicatorColors.successText,
          "--indicator-info": indicatorColors.info,
          "--indicator-info-text": indicatorColors.infoText,
          "--indicator-default": indicatorColors.default,
          "--indicator-default-text": indicatorColors.defaultText,
        } as CSSProperties
      }
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
