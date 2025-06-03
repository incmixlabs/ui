import { ChevronsUpDown, Layers } from "lucide-react"
import * as React from "react"

import { useOrganizationStore } from "@incmix/store"
import { DropdownMenu } from "@incmix/ui"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
import { useOrganizations } from "@orgs/utils"
import { projects } from "../../../../../../ui/src/components/projects/data"

export function ProjectsSwitcher() {
  const { isMobile } = useSidebar()
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
              <div className="flex items-center gap-2 text-left text-sm leading-tight">
                <Layers size={16} />
                <span className="truncate">Projects</span>
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
            <DropdownMenu.Label className="px-2 text-muted-foreground text-sm">
              Projects
            </DropdownMenu.Label>
            {projects.map((project, _index) => (
              <DropdownMenu.Item
                key={project.id}
                // onClick={() => setSelectedOrganisation(org)}
                className="gap-2 p-2"
                // shortcut={` ${index + 1}`}
              >
                {project.title}
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
