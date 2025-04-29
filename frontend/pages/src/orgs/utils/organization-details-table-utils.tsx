import { Flex, Text } from "@incmix/ui/base"
import type { MemberDetails, UserRole } from "@incmix/utils/types"
import type { TFunction } from "i18next"
import type React from "react"
import { UserProfileImage } from "../../common/components/user-profile-image"

/**
 * Get column definitions for the organization details members table
 */
export const getOrganizationDetailsMembersColumns = (
  t: TFunction,
  currentUserId: string | undefined,
  ability: any,
  // Render functions for different parts of the table
  renderRole: (role: UserRole, member: MemberDetails) => React.ReactNode,
  renderActions?: (member: MemberDetails) => React.ReactNode
) => {
  // Start with the always-present columns
  const columns = [
    {
      headingName: t("organizationDetails:name"),
      type: "String" as const,
      accessorKey: "userId",
      enableSorting: true,
      renderer: (userId: string, member: MemberDetails) => (
        <Flex align="center" gap="2">
          <UserProfileImage size="2" userId={userId} />
          <Text>
            {member.fullName}
            {userId === currentUserId && ` (${t("common:you")})`}
          </Text>
        </Flex>
      ),
    },
    {
      headingName: t("organizationDetails:email"),
      type: "String" as const,
      accessorKey: "email",
      enableSorting: true,
      renderer: (email: string) => (
        <Flex align="center" className="h-full">
          {email}
        </Flex>
      ),
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
      renderer: (_: string, member: MemberDetails) => renderActions?.(member),
    })
  }

  return columns
}
