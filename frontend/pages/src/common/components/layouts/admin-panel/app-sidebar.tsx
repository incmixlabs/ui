import React, { useEffect } from "react"

import { useAuth } from "@auth"
import {
  useDashboardStore,
  useEditingStore,
  useOrganizationStore,
} from "@incmix/store"
import { DashboardSidebar, ScrollArea, Text } from "@incmix/ui"
import { USERS_API_URL } from "@incmix/ui/constants"
import {
  SecondarySidebar,
  SidebarErrorFallback,
} from "@incmix/ui/secondary-sidebars"
import { FileFolder } from "@incmix/ui/secondary-sidebars/file-folder"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarRail,
  useSidebar,
} from "@incmix/ui/sidebar"
import { useLocation } from "@tanstack/react-router"
import { ErrorBoundary } from "react-error-boundary"
import { useTranslation } from "react-i18next"
import { buildSidebarItems } from "route-config"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { OrgSwitcher } from "./org-switcher"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation(["common", "sidebar"])
  const { isMobile } = useSidebar()

  const { pathname } = useLocation()
  const { authUser: user } = useAuth()
  const { isEditing } = useEditingStore()

  const dashboards = useDashboardStore((state) => state.dashboards)
  const initialized = useDashboardStore((state) => state.initialized)
  const initialize = useDashboardStore((state) => state.initialize)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialize, initialized])

  const navItems = React.useMemo(() => {
    // const dashboardSubItems = [
    //   {
    //     title: t("sidebar:home"),
    //     url: "/dashboard/home",
    //     isSelected: pathname === "/dashboard/home",
    //   },
    //   ...(dashboards.length > 0
    //     ? dashboards.map((dashboard) => ({
    //         title:
    //           dashboard.dashboardName || `Project ${dashboard.dashboardId}`,
    //         url: `/dashboard/${dashboard.dashboardId}`,
    //         isSelected: pathname === `/dashboard/${dashboard.dashboardId}`,
    //       }))
    //     : []),
    // ]

    // return [
    //   {
    //     title: t("sidebar:dashboard"),
    //     url: "/dashboard",
    //     icon: LayoutDashboardIcon,
    //     isSelected: pathname.includes("/dashboard"),
    //     isActive:
    //       pathname.startsWith("/dashboard") ||
    //       pathname.includes("/dashboard/home") ||
    //       dashboards.some((dashboard) =>
    //         pathname.includes(`/dashboard/${dashboard.id}`)
    //       ),
    //     items: ability.can("read", "Member")
    //       ? dashboardSubItems
    //       : dashboardSubItems,
    //   },
    //   {
    //     title: "Projects",
    //     url: "/projects",
    //     icon: Layers,
    //     items: [
    //       {
    //         title: "All Projects",
    //         url: "/projects",
    //         isSelected: pathname.includes("/projects"),
    //       },
    //       {
    //         title: "Tasks",
    //         url: "/tasks",
    //         isSelected: pathname.includes("/tasks"),
    //       },
    //       {
    //         title: "Users",
    //         url: "/users",
    //         isSelected: pathname.includes("/users"),
    //       },
    //     ],
    //   },
    //   {
    //     title: "File Manager",
    //     url: "/file-manager",
    //     icon: FolderClosed,
    //     isSelected: pathname.includes("/file-manager"),
    //   },
    //   {
    //     title: "Notes",
    //     url: "/notes",
    //     icon: Notebook,
    //     isSelected: pathname.includes("/notes"),
    //   },
    //   // {
    //   //   title: t("common:users"),
    //   //   url: "/users/list",
    //   //   icon: UserIcon,
    //   //   isActive:
    //   //     pathname.startsWith("/users") ||
    //   //     pathname.includes("/profile") ||
    //   //     pathname.includes("/settings"),
    //   //   items: ability.can("read", "Member")
    //   //     ? [
    //   //         {
    //   //           title: t("sidebar:usersList"),
    //   //           url: "/users/list",
    //   //           isSelected: pathname.includes("/users/list"),
    //   //         },
    //   //         {
    //   //           title: t("sidebar:profile"),
    //   //           url: "/profile",
    //   //           isSelected: pathname.includes("/profile"),
    //   //         },
    //   //         {
    //   //           title: t("sidebar:feed"),
    //   //           url: "/users/feed",
    //   //           isSelected: pathname.includes("/users/feed"),
    //   //         },
    //   //         {
    //   //           title: t("sidebar:settings"),
    //   //           url: "/settings",
    //   //           isSelected: pathname.includes("/settings"),
    //   //         },
    //   //       ]
    //   //     : [
    //   //         {
    //   //           title: t("sidebar:profile"),
    //   //           url: "/profile",
    //   //           isSelected: pathname.includes("/profile"),
    //   //         },
    //   //         {
    //   //           title: t("sidebar:feed"),
    //   //           url: "/users/feed",
    //   //           isSelected: pathname.includes("/users/feed"),
    //   //         },
    //   //         {
    //   //           title: t("sidebar:settings"),
    //   //           url: "/settings",
    //   //           isSelected: pathname.includes("/settings"),
    //   //         },
    //   //       ],
    //   // },
    //   // {
    //   //   title: t("sidebar:pages"),
    //   //   url: "/pages",
    //   //   icon: FileTextIcon,
    //   //   isSelected: pathname.includes("/pages"),
    //   // },
    //   // {
    //   //   title: t("sidebar:authentication"),
    //   //   url: "/auth",
    //   //   icon: LockIcon,
    //   //   isSelected: pathname.includes("/auth"),
    //   // },
    //   {
    //     title: t("sidebar:organizations"),
    //     url: "/organizations",
    //     icon: BoxIcon,
    //     isSelected: pathname.includes("/organizations"),
    //   },
    //   ...(isSuperAdmin
    //     ? [
    //         {
    //           title: "Roles and Permissions",
    //           url: "/roles",
    //           icon: LockIcon,
    //           isSelected: pathname.includes("/roles"),
    //         },
    //       ]
    //     : []),
    //   // {
    //   //   title: t("sidebar:docs"),
    //   //   url: "/docs",
    //   //   icon: TextIcon,
    //   //   isSelected: pathname.includes("/docs"),
    //   // },
    //   // {
    //   //   title: t("sidebar:components"),
    //   //   url: "/components",
    //   //   icon: ComponentIcon,
    //   //   isSelected: pathname.includes("/components"),
    //   // },
    //   // {
    //   //   title: "Translations",
    //   //   url: "/translations",
    //   //   icon: LanguagesIcon,
    //   // },
    //   {
    //     title: t("sidebar:help"),
    //     url: "/help",
    //     icon: HelpCircle,
    //     isSelected: pathname.includes("/help"),
    //   },
    // ]
    return buildSidebarItems(user?.userType, dashboards, t)
  }, [t, dashboards, user?.userType])

  return (
    <>
      <Sidebar
        isDefaultMobile={true}
        collapsible="icon"
        {...props}
        className="bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)]"
      >
        <SidebarHeader>
          <OrgSwitcher />
          <SidebarHeaderLabel asChild>
            <div>
              <img
                className="inline-block h-8 w-8"
                src="/incmix.svg"
                alt="Incmix logo"
              />
              <Text as="span" className="group-data-[collapsible=icon]:hidden">
                Incmix
              </Text>
            </div>
          </SidebarHeaderLabel>
        </SidebarHeader>
        <SidebarContent className="overflow-visible group-data-[collapsible=icon]:overflow-visible">
          <ScrollArea className="!overflow-visible main-nav h-full">
            <NavMain items={navItems} dashboards={dashboards} />
          </ScrollArea>
        </SidebarContent>
        {user && (
          <SidebarFooter className="transition-colors duration-300">
            <NavUser userId={user.id} />
          </SidebarFooter>
        )}
        <SidebarRail className="" />
        {isMobile && (
          <>
            {pathname.includes("/file-manager") && (
              <ErrorBoundary
                fallback={<SidebarErrorFallback message="secondary sidebar" />}
              >
                <SecondarySidebar>
                  <FileFolder />
                </SecondarySidebar>
              </ErrorBoundary>
            )}

            {pathname.includes("/dashboard") && isEditing && (
              <ErrorBoundary
                fallback={<SidebarErrorFallback message="dashboard sidebar" />}
              >
                <SecondarySidebar>
                  <DashboardSidebar />
                </SecondarySidebar>
              </ErrorBoundary>
            )}
          </>
        )}
      </Sidebar>
      {!isMobile && (
        <>
          {pathname.includes("/file-manager") && (
            <ErrorBoundary
              fallback={<SidebarErrorFallback message="secondary sidebar" />}
            >
              <SecondarySidebar>
                <FileFolder />
              </SecondarySidebar>
            </ErrorBoundary>
          )}

          {pathname.includes("/dashboard") && isEditing && (
            <ErrorBoundary
              fallback={<SidebarErrorFallback message="dashboard sidebar" />}
            >
              <SecondarySidebar>
                <DashboardSidebar />
              </SecondarySidebar>
            </ErrorBoundary>
          )}
        </>
      )}
    </>
  )
}
