import { INTL_API_URL } from "@incmix-fe/ui/constants"
import i18n, { type Resource, type InitOptions } from "i18next"
import ChainedBackend, {
  type ChainedBackendOptions,
} from "i18next-chained-backend"
import HttpBackend from "i18next-http-backend"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next"

export async function usei18n<T extends InitOptions["resources"]>(
  resources?: T,
  defaultLang = "en"
): Promise<void> {
  await i18n
    .use(ChainedBackend)
    .use(initReactI18next)
    .init<ChainedBackendOptions>({
      debug: false,
      lng: defaultLang,
      fallbackLng: defaultLang,
      partialBundledLanguages: true,
      defaultNS: "common",
      ns: ["common"],
      backend: {
        backends: [HttpBackend, resourcesToBackend(resources as Resource)],
        backendOptions: [
          {
            loadPath: `${INTL_API_URL}/messages/namespaces/{{lng}}/{{ns}}`,
            crossDomain: true,
          },
        ],
      },
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    })
}
export const I18n = i18n
