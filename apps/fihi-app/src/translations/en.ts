import { enTranslations as baseTranslations } from "@jsprtmnn/utils/i18n"
import { enTranslations as authTranslations } from "@jsprtmnn/utils/i18n/auth"
import { enTranslations as commonTranslations } from "@jsprtmnn/utils/i18n/common"
import type { I18nTranslations } from "@jsprtmnn/utils/i18n/core"
import { enTranslations as dashboardTranslations } from "@jsprtmnn/utils/i18n/dashboard"
import { enTranslations as layoutTranslations } from "@jsprtmnn/utils/i18n/layouts"
import { enTranslations as orgsTranslations } from "@jsprtmnn/utils/i18n/orgs"
import { enTranslations as userTranslations } from "@jsprtmnn/utils/i18n/users"

export const en: I18nTranslations = {
  ...baseTranslations,
  ...layoutTranslations,
  ...commonTranslations,
  ...authTranslations,
  ...orgsTranslations,
  ...userTranslations,
  ...dashboardTranslations,
}
