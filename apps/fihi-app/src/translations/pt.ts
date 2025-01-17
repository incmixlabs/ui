import { ptTranslations as baseTranslations } from "@jsprtmnn/utils/i18n"
import { ptTranslations as authTranslations } from "@jsprtmnn/utils/i18n/auth"
import { ptTranslations as commonTranslations } from "@jsprtmnn/utils/i18n/common"
import type { I18nTranslations } from "@jsprtmnn/utils/i18n/core"
import { ptTranslations as dashboardTranslations } from "@jsprtmnn/utils/i18n/dashboard"
import { ptTranslations as layoutTranslations } from "@jsprtmnn/utils/i18n/layouts"
import { ptTranslations as orgsTranslations } from "@jsprtmnn/utils/i18n/orgs"
import { ptTranslations as userTranslations } from "@jsprtmnn/utils/i18n/users"

export const pt: I18nTranslations = {
  ...baseTranslations,
  ...layoutTranslations,
  ...commonTranslations,
  ...authTranslations,
  ...orgsTranslations,
  ...userTranslations,
  ...dashboardTranslations,
}
