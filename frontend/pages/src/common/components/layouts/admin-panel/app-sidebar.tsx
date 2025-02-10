"use client"

import {
  BackpackIcon,
  BoxIcon,
  ComponentIcon,
  FileTextIcon,
  HelpCircle,
  InboxIcon,
  LayoutDashboardIcon,
  LockIcon,
  TextIcon,
  UserIcon,
} from "lucide-react"

import React from "react"

import { useAuth, useCurrentUser } from "@auth"
import { useOrganizationStore } from "@incmix/store"
import { USERS_API_URL } from "@incmix/ui/constants"
import { createAbilityFromPermissions } from "@incmix/utils/casl"
import type { Permission } from "@incmix/utils/types"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useRouter } from "@tanstack/react-router"
import { I18n } from "i18n"
import { useTranslation } from "react-i18next"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { OrgSwitcher } from "./org-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarRail,
} from "./sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation(["common", "sidebar"])
  const { pathname } = useLocation()
  const { authUser: user } = useAuth()

  const { selectedOrganisation } = useOrganizationStore()

  const { data: permissions } = useQuery<Permission[]>({
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

  const ability = createAbilityFromPermissions(permissions ?? [])

  const navItems = React.useMemo(() => {
    return [
      {
        title: t("sidebar:dashboard"),
        url: "/dashboard",
        icon: LayoutDashboardIcon,
        isSelected: pathname.includes("/dashboard"),
      },
      {
        title: t("sidebar:inbox"),
        url: "/inbox",
        icon: InboxIcon,
        isSelected: pathname.includes("/inbox"),
      },
      {
        title: t("sidebar:ecommerce"),
        url: "/e-commerce",
        icon: BackpackIcon,
        isSelected: pathname.includes("/e-commerce"),
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: FileTextIcon,
        isSelected: pathname.includes("/tasks"),
        notificationCount: 8,
      },
      {
        title: t("common:users"),
        url: "/users/list",
        icon: UserIcon,
        isActive:
          pathname.startsWith("/users") ||
          pathname.includes("/profile") ||
          pathname.includes("/settings"),
        items: ability.can("read", "Member")
          ? [
              {
                title: t("sidebar:usersList"),
                url: "/users/list",
                isSelected: pathname.includes("/users/list"),
              },
              {
                title: t("sidebar:profile"),
                url: "/profile",
                isSelected: pathname.includes("/profile"),
              },
              {
                title: t("sidebar:feed"),
                url: "/users/feed",
                isSelected: pathname.includes("/users/feed"),
              },
              {
                title: t("sidebar:settings"),
                url: "/settings",
                isSelected: pathname.includes("/settings"),
              },
            ]
          : [
              {
                title: t("sidebar:profile"),
                url: "/profile",
                isSelected: pathname.includes("/profile"),
              },
              {
                title: t("sidebar:feed"),
                url: "/users/feed",
                isSelected: pathname.includes("/users/feed"),
              },
              {
                title: t("sidebar:settings"),
                url: "/settings",
                isSelected: pathname.includes("/settings"),
              },
            ],
      },
      {
        title: t("sidebar:pages"),
        url: "/pages",
        icon: FileTextIcon,
        isSelected: pathname.includes("/pages"),
      },
      {
        title: t("sidebar:authentication"),
        url: "/auth",
        icon: LockIcon,
        isSelected: pathname.includes("/auth"),
      },
      {
        title: t("sidebar:organizations"),
        url: "/organizations",
        icon: BoxIcon,
        isSelected: pathname.includes("/organizations"),
      },
      {
        title: t("sidebar:docs"),
        url: "/docs",
        icon: TextIcon,
        isSelected: pathname.includes("/docs"),
      },
      {
        title: t("sidebar:components"),
        url: "/components",
        icon: ComponentIcon,
        isSelected: pathname.includes("/components"),
      },
      {
        title: t("sidebar:help"),
        url: "/help",
        icon: HelpCircle,
        isSelected: pathname.includes("/help"),
      },
    ]
  }, [t, pathname, ability])

  return (
    <Sidebar  isDefaultMobile={false} collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher />
        <SidebarHeaderLabel asChild>
          <div>
            <img
              className="inline-block h-8 w-8"
              src="/tauri.svg"
              alt="Incmix logo"
            />
            <span className="group-data-[collapsible=icon]:hidden">Incmix</span>
          </div>
        </SidebarHeaderLabel>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser userId={user.id} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
