import { Box, ContextMenu, Flex, Text, useModalStore } from "@incmix/ui"
import { ReusableAddProject, useAddProject } from "@incmix/ui"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@incmix/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@incmix/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { ProjectSwitcher } from "./project-switcher"
import type { NavItem } from "route-config"
import React from "react"

function generateHoverContent(item: NavItem) {
  return (
    <Box className="min-w-[200px] p-2">
      <Flex align={"center"} gap={"2"} className="px-2 py-1.5 font-medium">
        {item.icon && <item.icon className="h-4 w-4" />}
        <Text size="2" weight="medium">
          {item.title}
        </Text>
        {item.notificationCount && (
          <Box className="ml-auto w-fit rounded-md bg-[var(--sidebar-foreground)] px-1 py-0.5 text-center font-semibold text-[10px] text-[var(--sidebar-background)]">
            {item.notificationCount}
          </Box>
        )}
      </Flex>

      {item.items && item.items.length > 0 && (
        <Box className="mt-2 border-gray-6 border-t pt-2">
          {item.items.map((subItem) => {
            // Check if we need to show ProjectSwitcher for this subItem
            const showProjectSwitcher = subItem.title.toLowerCase() === "tasks"

            return (
              <Box key={subItem.title} className="w-full">
                {showProjectSwitcher && (
                  <Box className="mb-2 w-full px-2">
                    <ProjectSwitcher className="!w-full !h-fit !p-2" />
                  </Box>
                )}
                <Link
                  to={subItem.url}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-gray-3"
                >
                  <Box className="w-4" />
                  <Text
                    size="2"
                    className={subItem.isSelected ? "font-medium" : ""}
                  >
                    {subItem.title}
                  </Text>
                </Link>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export function NavMain({ items }: { items: NavItem[] }) {
  const openCreateDashboardModal = useModalStore(
    (state) => state.openDashboardCreate
  )

  // Add Project dialog state
  const { isOpen, openAddProject, closeAddProject } = useAddProject()

  function isProjectsRoot(item: NavItem): boolean {
    console.log(
      "isProjectsRoot check:",
      item.url,
      "result:",
      item.url === "/projects"
    )
    return item.url === "/projects"
  }

  function isDashboardRoot(item: NavItem): boolean {
    return item.url === "/dashboard"
  }

  function isDynamicDashboard(item: {
    isSelected?: boolean
    title: string
    url: string
  }): boolean {
    return item?.url?.startsWith("/dashboard/") && item?.url !== "/dashboard"
  }

  // function isDynamicProject(item: {
  //   isSelected: boolean
  //   title: string
  //   url: string
  // }): boolean {
  //   const result =
  //     item?.url?.startsWith("/projects/") && item?.url !== "/projects"
  //   console.log("isDynamicProject check:", item.url, "result:", result)
  //   return result
  // }

  // Get context menu for main items (parent level)
  function getMainItemContextMenu(item: NavItem) {
    // For exact "/dashboard" root
    if (isDashboardRoot(item)) {
      return (
        <ContextMenu.Item
          color="indigo"
          className="cursor-pointer px-2 py-1 "
          onSelect={openCreateDashboardModal}
        >
          <Text size="2" as="span">
            Create Dashboard
          </Text>
        </ContextMenu.Item>
      )
    }
    // For exact "/projects" root
    if (isProjectsRoot(item)) {
      return (
        <ContextMenu.Item
          color="indigo"
          className="cursor-pointer px-2 py-1"
          onSelect={openAddProject}
        >
          <Text size="2" as="span">
            Create Project
          </Text>
        </ContextMenu.Item>
      )
    }
    return null
  }

  // Get context menu for sub items
  function getSubItemContextMenu(subItem: {
    title: string
    url: string
    isSelected?: boolean
  }) {
    if (subItem.url === "/dashboard/home") {
      return (
        <>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1"
            onSelect={openCreateDashboardModal}
          >
            <Text size="2" as="span">
              Create Dashboard
            </Text>
          </ContextMenu.Item>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={() => console.log("Copy Dashboard", subItem.title)}
          >
            <Text size="2" as="span">
              Copy Dashboard
            </Text>
          </ContextMenu.Item>
        </>
      )
    }
    // For dashboard sub-items
    if (isDynamicDashboard(subItem)) {
      return (
        <>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1"
            onSelect={openCreateDashboardModal}
          >
            <Text size="2" as="span">
              Create Dashboard
            </Text>
          </ContextMenu.Item>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1"
            onSelect={() => console.log("Edit Dashboard", subItem.title)}
          >
            <Text size="2" as="span">
              Edit Dashboard
            </Text>
          </ContextMenu.Item>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1"
            onSelect={() => console.log("Copy Dashboard", subItem.title)}
          >
            <Text size="2" as="span">
              Copy Dashboard
            </Text>
          </ContextMenu.Item>
          <ContextMenu.Separator className="my-1 border-neutral-200 border-t dark:border-neutral-700" />
          <ContextMenu.Item
            color="red"
            className="cursor-pointer px-2 py-1"
            onSelect={() => console.log("Delete Dashboard", subItem.title)}
          >
            <Text size="2" as="span">
              Delete Dashboard
            </Text>
          </ContextMenu.Item>
        </>
      )
    }

    return null
  }

  return (
    <>
      {/* Add Project dialog */}
      <ReusableAddProject isOpen={isOpen} onClose={closeAddProject} />

      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) => {
            const hoverContent = generateHoverContent(item)
            console.log(hoverContent)
            const content = item.items?.length ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isSelected={item.isSelected}
                      isSubMenuSelected={item.isActive}
                      tooltip={item.title}
                      hoverContent={hoverContent}
                      className="active:bg-[var(--sidebar-background)] active:text-[var(--sidebar-foreground)]"
                    >
                      {item.icon && <item.icon className="scale-icon" />}
                      <Text size="2" as="span">
                        {item.title}
                      </Text>
                      <ChevronRight className="group-data-[state=open]/collapsible:transform-x-90 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub className="px-0 py-1">
                      {item.items.map((subItem) => {
                        const switcher =
                          subItem.title.toLowerCase() === "tasks" ? (
                            <ProjectSwitcher
                              key={`project-switcher-${subItem.title}`}
                            />
                          ) : null
                        const subItemContent = (
                          <>
                            {switcher}
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                isSelected={subItem.isSelected}
                                asChild
                              >
                                <Link to={subItem.url}>
                                  <Text size="2" as="span">
                                    {subItem.title}
                                  </Text>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </>
                        )

                        // Check if this sub-item needs a context menu
                        const subItemContextMenu =
                          getSubItemContextMenu(subItem)

                        return subItemContextMenu ? (
                          <ContextMenu.Root key={subItem.title}>
                            <ContextMenu.Trigger>
                              {subItemContent}
                            </ContextMenu.Trigger>
                            <ContextMenu.Content className="z-50 min-w-[150px] rounded-md border border-gray-5 bg-popover p-1 shadow-md">
                              {subItemContextMenu}
                            </ContextMenu.Content>
                          </ContextMenu.Root>
                        ) : (
                          <React.Fragment key={subItem.title}>
                            {subItemContent}
                          </React.Fragment>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                {item.url === "/projects" ? (
                  <ProjectSwitcher />
                ) : (
                  <SidebarMenuButton
                    isSelected={item.isSelected}
                    tooltip={item.title}
                    asChild
                  >
                    <Link to={item.url}>
                      {item.icon && <item.icon className="scale-icon" />}
                      <Text size="2" as="span">
                        {item.title}
                      </Text>
                      {item.notificationCount && (
                        <Box className="ml-auto min-w-[16px] rounded-md bg-[var(--sidebar-foreground)] px-1 py-0.5 text-center font-semibold text-[10px] text-[var(--sidebar-background)] transition-transform duration-200">
                          {item.notificationCount}
                        </Box>
                      )}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )

            // Get context menu for main item
            const mainItemContextMenu = getMainItemContextMenu(item)

            return mainItemContextMenu ? (
              <ContextMenu.Root key={item.title}>
                <ContextMenu.Trigger>{content}</ContextMenu.Trigger>
                <ContextMenu.Content className="z-50 min-w-[150px] rounded-md border border-gray-5 bg-popover p-1 shadow-md">
                  {mainItemContextMenu}
                </ContextMenu.Content>
              </ContextMenu.Root>
            ) : (
              content
            )
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
