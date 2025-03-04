import React, { Suspense, useEffect, useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { Settings } from "luxon"

import { LoadingPage } from "@incmix/pages/common"
import { I18n, usei18n } from "@incmix/pages/i18n"
import {
  type Language,
  database as db,
  useLanguageStore,
  useThemeStore,
} from "@incmix/store"
import { DashboardPage } from "@incmix/ui/layouts"
import { Theme } from "@radix-ui/themes"
import { Provider as RxdbProvider } from "rxdb-hooks"
import { translations } from "./translations"

const luxonLocale: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
}

// const db = await createDatabase()

import {
  DashboardRoute,
  EmailVerificationRoute,
  ForgotPasswordRoute,
  GoogleAuthCallbackRoute,
  IndexRoute,
  ListUsersRoute,
  LoadingRoute,
  LoginRoute,
  NotFoundRoute,
  NotificationsRoute,
  OrganisationDetailsRoute,
  OrganisationEnvVarsRoute,
  OrganisationUsersRoute,
  OrganisationsRoute,
  ProfileRoute,
  ProjectsRoute,
  ResetPasswordRoute,
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
  DashboardRoute,
  ListUsersRoute,
  TasksRoute,
  ProjectsRoute,
  TranslationsRoute,
])

const router = createRouter({ routeTree })

function App() {
  const { theme } = useThemeStore()
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
      Settings.defaultLocale = luxonLocale[language]
    }
  }, [language])

  const isMock = useMemo(() => {
    const search = window.location.search
    return search.includes("mock")
  }, [])

  return (
    <Theme
      accentColor="indigo"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
      radius="large"
      appearance={theme}
    >
      <RxdbProvider db={db}>
        <Suspense fallback={<LoadingPage />}>
          {isMock ? <DashboardPage /> : <RouterProvider router={router} />}
        </Suspense>
      </RxdbProvider>
    </Theme>
  )
}

export default App
