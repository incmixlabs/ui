import type { Organization } from "@incmix/utils/types"
// utils/organization-table-utils.tsx
import { ChevronRight } from "lucide-react"
import React from "react"

/**
 * DataTable column definitions for organizations
 */
export const getOrganizationColumns = (t: (key: string) => string) => [
  {
    headingName: t("common:name"),
    type: "String" as const,
    accessorKey: "name",
    enableSorting: true,
  },
  {
    headingName: t("common:members"),
    type: "Number" as const,
    accessorKey: "members" as const,
    enableSorting: true,
    // Custom renderer to display the length of members array
    renderer: (_value: any, row: Organization) => row.members.length,
  },
]

/**
 * Generate row actions for organization table
 * Note: This is now a string instead of JSX to avoid issues
 */
export const getOrganizationRowActions = (
  navigate: (handle: string) => void
) => {
  return (org: Organization) => [
    {
      label: "View Organization",
      onClick: () => navigate(org.handle),
      // Using a string icon instead of JSX to avoid parsing issues
      icon: "→",
    },
  ]
}
