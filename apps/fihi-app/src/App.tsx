import React, { CSSProperties, Suspense, useEffect, useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { setDefaultOptions } from "date-fns"

import { LoadingPage } from "@incmix/pages/common"
import { I18n, usei18n } from "@incmix/pages/i18n"
import {
  type Language,
  database as db,
  useLanguageStore,
  useThemeStore,
} from "@incmix/store"
import { Theme, Toaster, useBaseThemeStore } from "@incmix/ui"
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

const router = createRouter({ routeTree })

function App() {
  const { theme } = useThemeStore()
  const baseTheme = useBaseThemeStore()
  const { language } = useLanguageStore()
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

  const _isMock = useMemo(() => {
    const search = window.location.search
    return search.includes("mock")
  }, [])

  return (
    <Theme
    appearance={baseTheme.appearance}
  accentColor={baseTheme.accentColor}
  grayColor={baseTheme.grayColor}
  radius={baseTheme.radius}
  scaling={baseTheme.scaling}
  style={{
    '--sidebar-bg'         : baseTheme.sidebarBg,
    '--secondary-sidebar-bg': baseTheme.secondarySidebarBg,
    '--main-bg'            : baseTheme.mainBackground,
    '--dashboard-multi'    : baseTheme.dashboardMulti,
    '--dashboard-mono-1'   : baseTheme.dashboardMono1,
    '--dashboard-mono-2'   : baseTheme.dashboardMono2,
  } as CSSProperties}
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
