"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import type { Dashboard } from "@incmix/store"
import { ContextMenu, useModalStore } from "@incmix/ui"
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
import { ProjectsSwitcher } from "./projects-switcher"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  isSelected?: boolean
  notificationCount?: number
  items?: {
    title: string
    url: string
    isSelected?: boolean
  }[]
}

export function NavMain({
  items,
  dashboards,
}: {
  items: NavItem[]
  dashboards: Dashboard[]
}) {
  const openCreateDashboardModal = useModalStore(
    (state) => state.openDashboardCreate
  )

  console.log(dashboards)

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
    isSelected: boolean
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
          className="cursor-pointer px-2 py-1 text-sm "
          onSelect={openCreateDashboardModal}
        >
          Create Dashboard
        </ContextMenu.Item>
      )
    }
    // For exact "/projects" root
    if (isProjectsRoot(item)) {
      console.log("Returning projects root context menu")
      return (
        <ContextMenu.Item
          color="indigo"
          className="cursor-pointer px-2 py-1 text-sm"
          onSelect={() => console.log("Create Project")}
        >
          Create Project
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
    // if (subItem.url === "/tasks") {
    //   return (
    //     <>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("View Project Details", subItem.title)}
    //       >
    //         Create Tasks
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Edit Tasks", subItem.title)}
    //       >
    //         Edit Tasks
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Duplicate Tasks", subItem.title)}
    //       >
    //         Duplicate Tasks
    //       </ContextMenu.Item>
    //       <ContextMenu.Separator className="my-1 border-neutral-200 border-t dark:border-neutral-700" />
    //       <ContextMenu.Item
    //         color="red"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Delete Tasks", subItem.title)}
    //       >
    //         Delete Tasks
    //       </ContextMenu.Item>
    //     </>
    //   )
    // }
    // if (subItem.url === "/file-manager") {
    //   console.log("Returning project dynamic context menu for:", subItem.title)
    //   return (
    //     <>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("View Project Details", subItem.title)}
    //       >
    //         Create File Manager
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Edit File Manager", subItem.title)}
    //       >
    //         Edit File Manager
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() =>
    //           console.log("Duplicate File Manager", subItem.title)
    //         }
    //       >
    //         Duplicate File Manager
    //       </ContextMenu.Item>
    //       <ContextMenu.Separator className="my-1 border-neutral-200 border-t dark:border-neutral-700" />
    //       <ContextMenu.Item
    //         color="red"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Delete File Manager", subItem.title)}
    //       >
    //         Delete File Manager
    //       </ContextMenu.Item>
    //     </>
    //   )
    // }
    // if (subItem.url === "/notes") {
    //   return (
    //     <>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("View Notes", subItem.title)}
    //       >
    //         Create Notes
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Edit Notes", subItem.title)}
    //       >
    //         Edit Notes
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Duplicate Notes", subItem.title)}
    //       >
    //         Duplicate Notes
    //       </ContextMenu.Item>
    //       <ContextMenu.Separator className="my-1 border-neutral-200 border-t dark:border-neutral-700" />
    //       <ContextMenu.Item
    //         color="red"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Delete Notes", subItem.title)}
    //       >
    //         Delete Notes
    //       </ContextMenu.Item>
    //     </>
    //   )
    // }
    // if (subItem.url === "/users") {
    //   console.log("Returning project dynamic context menu for:", subItem.title)
    //   return (
    //     <>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Add User", subItem.title)}
    //       >
    //         Add User
    //       </ContextMenu.Item>
    //       <ContextMenu.Item
    //         color="indigo"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Edit User", subItem.title)}
    //       >
    //         Edit User
    //       </ContextMenu.Item>
    //       <ContextMenu.Separator className="my-1 border-neutral-200 border-t dark:border-neutral-700" />
    //       <ContextMenu.Item
    //         color="red"
    //         className="cursor-pointer px-2 py-1 text-sm"
    //         onSelect={() => console.log("Delete User", subItem.title)}
    //       >
    //         Delete User
    //       </ContextMenu.Item>
    //     </>
    //   )
    // }
    if (subItem.url === "/dashboard/home") {
      return (
        <>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={openCreateDashboardModal}
          >
            Create Dashboard
          </ContextMenu.Item>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={() => console.log("Copy Dashboard", subItem.title)}
          >
            Copy Dashboard
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
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={openCreateDashboardModal}
          >
            Create Dashboard
          </ContextMenu.Item>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={() => console.log("Edit Dashboard", subItem.title)}
          >
            Edit Dashboard
          </ContextMenu.Item>
          <ContextMenu.Item
            color="indigo"
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={() => console.log("Copy Dashboard", subItem.title)}
          >
            Copy Dashboard
          </ContextMenu.Item>
          <ContextMenu.Separator className="my-1 border-neutral-200 border-t dark:border-neutral-700" />
          <ContextMenu.Item
            color="red"
            className="cursor-pointer px-2 py-1 text-sm "
            onSelect={() => console.log("Delete Dashboard", subItem.title)}
          >
            Delete Dashboard
          </ContextMenu.Item>
        </>
      )
    }

    return null
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
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
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <SidebarMenuSub className="px-0.5">
                    {item.items.map((subItem) => {
                      const subItemContent = (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isSelected={subItem.isSelected}
                            asChild
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )

                      // Check if this sub-item needs a context menu
                      const subItemContextMenu = getSubItemContextMenu(subItem)

                      return subItemContextMenu ? (
                        <ContextMenu.Root key={subItem.title}>
                          <ContextMenu.Trigger>
                            {subItemContent}
                          </ContextMenu.Trigger>
                          <ContextMenu.Content className="z-50 min-w-[150px] rounded-md bg-white p-1 shadow-md dark:bg-neutral-900">
                            {subItemContextMenu}
                          </ContextMenu.Content>
                        </ContextMenu.Root>
                      ) : (
                        subItemContent
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              {item.url === "/projects" ? (
                <ProjectsSwitcher />
              ) : (
                <SidebarMenuButton
                  isSelected={item.isSelected}
                  tooltip={item.title}
                  asChild
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.notificationCount && (
                      <div className="ml-auto rounded-md bg-[hsl(var(--sidebar-foreground))] px-1.5 font-normal text-[10px] text-[hsl(var(--sidebar-background))] transition-transform duration-200">
                        {item.notificationCount}
                      </div>
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
              <ContextMenu.Content className="z-50 min-w-[150px] rounded-md bg-white p-1 shadow-md dark:bg-neutral-900">
                {mainItemContextMenu}
              </ContextMenu.Content>
            </ContextMenu.Root>
          ) : (
            content
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
