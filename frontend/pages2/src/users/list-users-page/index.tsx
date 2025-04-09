"use client"
import { useOrganizationStore } from "@incmix/store"

import { I18n } from "@incmix/pages/i18n"
import { USERS_API_URL } from "@incmix/ui/constants"
import { Flex, Spinner } from "@incmix/ui2"
import { Callout } from "@incmix/ui2"
import { createAbilityFromPermissions } from "@incmix/utils/casl"
import type { AppAbility, Permission } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
import { Info } from "lucide-react"
import AdminUsersTable from "./admin-users-table"
import OrgUsersTable from "./org-users-table"

const ListUsersPage = () => {
  const { selectedOrganisation } = useOrganizationStore()

  const { data: permissions, isLoading } = useQuery<Permission[]>({
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
  if (isLoading)
    return (
      <DashboardLayout
        breadcrumbItems={[{ label: "Users", url: "/users/list" }]}
      >
        <Flex
          className="h-[calc((100vh-var(--navbar-height))-3rem)]"
          align="center"
          justify="center"
        >
          <Spinner className="size-10" />
        </Flex>
      </DashboardLayout>
    )

  const ability = createAbilityFromPermissions(permissions ?? [])

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Users", url: "/users/list" }]}>
      <UserTable ability={ability} />
    </DashboardLayout>
  )
}

const UserTable: React.FC<{ ability: AppAbility }> = ({ ability }) => {
  if (ability.can("read", "User")) {
    return <AdminUsersTable />
  }

  if (ability.can("read", "Member")) {
    return <OrgUsersTable />
  }

  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <Info />
      </Callout.Icon>
      <Callout.Text>
        You do not have the necessary permissions to view this page.
      </Callout.Text>
    </Callout.Root>
  )
}

export default ListUsersPage
