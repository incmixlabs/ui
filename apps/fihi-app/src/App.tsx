import React, { Suspense, useEffect, useMemo } from "react"

import { useQuery } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { Settings } from "luxon"

import { PGliteProvider } from "@electric-sql/pglite-react"
import { LoadingPage } from "@incmix/pages/common"
import { I18n, usei18n } from "@incmix/pages/i18n"
import {
  type Language,
  pgWorkerMain,
  useLanguageStore,
  useThemeStore,
} from "@incmix/store"
import { DashboardPage } from "@incmix/ui/layouts"
import { Theme } from "@radix-ui/themes"
import { router } from "./instrument"
import { translations } from "./translations"

const luxonLocale: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
}

const db = pgWorkerMain()

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
      <PGliteProvider db={db}>
        <Suspense fallback={<LoadingPage />}>
          {isMock ? <DashboardPage /> : <RouterProvider router={router} />}
        </Suspense>
      </PGliteProvider>
    </Theme>
  )
}

export default App
