import { ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { useOrganizationStore } from "@incmix/store"
import { DropdownMenu } from "@incmix/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
import { useOrganizations } from "@orgs/utils"
import { useTranslation } from "react-i18next"

export function OrgSwitcher() {
  const { isMobile } = useSidebar()
  const { t } = useTranslation(["common", "sidebar"])
  const { organizations, isLoading } = useOrganizations()
  const { selectedOrganisation, setSelectedOrganisation } =
    useOrganizationStore()

  React.useEffect(() => {
    if (!selectedOrganisation) setSelectedOrganisation(organizations?.[0])
    else {
      const found = organizations?.find((o) => o.id === selectedOrganisation.id)
      if (!found) setSelectedOrganisation(organizations?.[0])
    }
  }, [selectedOrganisation, organizations, setSelectedOrganisation])

  if (isLoading) return <div>Loading...</div>
  if (!selectedOrganisation) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {selectedOrganisation.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenu.Label className="text-muted-foreground text-xs">
              {t("organizations")}
            </DropdownMenu.Label>
            {organizations.map((org, index) => (
              <DropdownMenu.Item
                key={org.name}
                onClick={() => setSelectedOrganisation(org)}
                className="gap-2 p-2"
                shortcut={`⌘${index + 1}`}
              >
                {org.name}
              </DropdownMenu.Item>
            ))}
            {/* <DropdownMenu.Separator /> */}
            {/* <DropdownMenu.Item className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenu.Item> */}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
