// utils/organization-members-table-utils.tsx
import type React from "react"
import { Flex, Text } from "@incmix/ui/base"
import type { MemberDetails, UserRole } from "@incmix/utils/types"
import type { TFunction } from "i18next"

/**
 * Get column definitions for the organization members table
 */
export const getOrganizationMembersColumns = (
  t: TFunction,
  currentUserId: string | undefined,
  ability: any,
  // Instead of passing components, we'll pass render functions
  renderUserName: (
    userId: string,
    fullName: string,
    isCurrentUser: boolean
  ) => React.ReactNode,
  renderEmail: (email: string) => React.ReactNode,
  renderRole: (role: UserRole, member: MemberDetails) => React.ReactNode,
  renderActions: (member: MemberDetails) => React.ReactNode
) => {
  // Start with the always-present columns
  const columns = [
    {
      headingName: t("common:name"),
      type: "String" as const,
      accessorKey: "userId",
      enableSorting: true,
      renderer: (userId: string, member: MemberDetails) =>
        renderUserName(userId, member.fullName, userId === currentUserId),
    },
    {
      headingName: t("common:email"),
      type: "String" as const,
      accessorKey: "email",
      enableSorting: true,
      renderer: (email: string) => renderEmail(email),
    },
    {
      headingName: t("organizationDetails:role"),
      type: "String" as const,
      accessorKey: "role",
      enableSorting: true,
      renderer: (role: UserRole, member: MemberDetails) =>
        renderRole(role, member),
    },
  ]

  // Conditionally add the actions column based on permissions
  if (ability.can("update", "Member") || ability.can("delete", "Member")) {
    columns.push({
      headingName: t("organizationDetails:actions"),
      type: "String" as const,
      accessorKey: "userId",
      enableSorting: false,
      renderer: (_: string, member: MemberDetails) => renderActions(member),
    })
  }

  return columns
}
