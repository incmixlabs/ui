import { enTranslations as baseTranslations } from "@incmix/utils/i18n"
import { enTranslations as authTranslations } from "@incmix/utils/i18n/auth"
import { enTranslations as commonTranslations } from "@incmix/utils/i18n/common"
import type { I18nTranslations } from "@incmix/utils/i18n/core"
import { enTranslations as dashboardTranslations } from "@incmix/utils/i18n/dashboard"
import { enTranslations as layoutTranslations } from "@incmix/utils/i18n/layouts"
import { enTranslations as orgsTranslations } from "@incmix/utils/i18n/orgs"
import { enTranslations as userTranslations } from "@incmix/utils/i18n/users"

export const en: I18nTranslations = {
  ...baseTranslations,
  ...layoutTranslations,
  ...commonTranslations,
  ...authTranslations,
  ...orgsTranslations,
  ...userTranslations,
  ...dashboardTranslations,
}
