import { I18n } from "@incmix/pages/i18n"
import { useOrganizationStore, useSidebarStore } from "@incmix/store"
import { USERS_API_URL } from "@incmix/ui/constants"
import { Sidebar, SidebarItem, SidebarSubItem } from "@incmix/ui/sidebar"
import { createAbilityFromPermissions } from "@incmix/utils/casl"
import type { Permission } from "@incmix/utils/types"
import {
  BackpackIcon,
  ComponentInstanceIcon,
  CubeIcon,
  DashboardIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
  LockClosedIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
} from "@radix-ui/react-icons"
import { Flex } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

export function AppSidebar() {
  const { state, isMinified, toggleMinified } = useSidebarStore()
  const { t } = useTranslation(["sidebar", "common"])

  const { selectedOrganisation } = useOrganizationStore()

  const { data: permissions } = useQuery<Permission[]>({
    queryKey: ["user-permissions", selectedOrganisation?.id],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (selectedOrganisation?.id)
        searchParams.append("orgId", selectedOrganisation?.id)

      const res = await fetch(
        `${USERS_API_URL}/permissions?${searchParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "accept-language": I18n.language ?? "en" },
        }
      )

      return await res.json()
    },
  })

  const ability = createAbilityFromPermissions(permissions ?? [])

  return (
    <Sidebar
      minified={isMinified}
      state={state}
      onMinifyChange={toggleMinified}
    >
      <Flex direction="column" gap="1" p="2">
        <SidebarItem
          icon={<DashboardIcon />}
          label={t("dashboard")}
          to="/dashboard"
        />
        <SidebarItem
          icon={<EnvelopeClosedIcon />}
          label={t("inbox")}
          to="/inbox"
          badge={3}
        />
        <SidebarItem
          icon={<BackpackIcon />}
          label={t("ecommerce")}
          to="/e-commerce"
        />
        <SidebarItem icon={<FileTextIcon />} label="Tasks" to="/tasks" />
        <SidebarItem icon={<PersonIcon />} label={t("common:users")}>
          {ability.can("read", "Member") && (
            <SidebarSubItem label={t("usersList")} to="/users/list" />
          )}

          <SidebarSubItem label={t("profile")} to="/profile" />
          <SidebarSubItem label={t("feed")} to="/users/feed" />
          <SidebarSubItem label={t("settings")} to="/settings" />
        </SidebarItem>
        <SidebarItem icon={<FileTextIcon />} label={t("pages")} to="/pages" />
        <SidebarItem
          icon={<LockClosedIcon />}
          label={t("authentication")}
          to="/auth"
        />
        <SidebarItem
          icon={<CubeIcon />}
          label={t("organizations")}
          to="/organizations"
        />
        <SidebarItem icon={<ReaderIcon />} label={t("docs")} to="/docs" />
        <SidebarItem
          icon={<ComponentInstanceIcon />}
          label={t("components")}
          to="/components"
        />
        <SidebarItem
          icon={<QuestionMarkCircledIcon />}
          label={t("help")}
          to="/help"
        />
      </Flex>
    </Sidebar>
  )
}
