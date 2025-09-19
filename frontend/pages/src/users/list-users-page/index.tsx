"use client"
import { useOrganizationStore } from "@incmix/store"

import { useAuth } from "@auth"
import { I18n } from "@incmix/pages/i18n"
import { Flex, Spinner } from "@incmix/ui"
import { Callout } from "@incmix/ui"
import { PERMISSIONS_API_URL, USERS_API_URL } from "@incmix/ui/constants"
import { createAbilityFromPermissions } from "@incmix/utils/casl"
import type { AppAbility, Permission } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useQuery } from "@tanstack/react-query"
import { InfoIcon } from "lucide-react"
import AdminUsersTable from "./admin-users-table"
import OrgUsersTable from "./org-users-table"

const ListUsersPage = () => {
  const { selectedOrganisation } = useOrganizationStore()
  const { authUser } = useAuth()
  const { data, isLoading } = useQuery<{ permissions: Permission[] }>({
    enabled: !!authUser?.id,
    queryKey: ["user-permissions", selectedOrganisation?.id],
    queryFn: async () => {
      const searchParams = new URLSearchParams()

      if (selectedOrganisation?.id) {
        if (!authUser?.isSuperAdmin)
          searchParams.append("orgId", selectedOrganisation?.id)
      }

      const res = await fetch(
        `${PERMISSIONS_API_URL}/user?${searchParams.toString()}`,
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
      <DashboardLayout>
        <Flex
          className="h-[calc((100vh-var(--navbar-height))-3rem)]"
          align="center"
          justify="center"
        >
          <Spinner className="size-10" />
        </Flex>
      </DashboardLayout>
    )

  const ability = createAbilityFromPermissions(data?.permissions ?? [])

  return (
    <DashboardLayout>
      <UserTable ability={ability} />
    </DashboardLayout>
  )
}

const UserTable: React.FC<{ ability: AppAbility }> = ({ ability }) => {
  if (ability.can("read", "all")) {
    console.log("AdminUsersTable")
    return <AdminUsersTable />
  }

  if (ability.can("read", "Member")) {
    return <OrgUsersTable />
  }

  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <InfoIcon />
      </Callout.Icon>
      <Callout.Text>
        You do not have the necessary permissions to view this page.
      </Callout.Text>
    </Callout.Root>
  )
}

export default ListUsersPage
