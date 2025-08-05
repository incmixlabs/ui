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
import { useOrganizationMemberAbility } from "@orgs/utils"
import { useLocation } from "@tanstack/react-router"
import { ErrorBoundary } from "react-error-boundary"
import { useTranslation } from "react-i18next"
import { buildSidebarItems } from "../../../../route-config"
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

  const { selectedOrganisation } = useOrganizationStore()

  const { ability } = useOrganizationMemberAbility(selectedOrganisation?.handle)

  const navItems = React.useMemo(() => {
    return buildSidebarItems(
      user?.isSuperAdmin ?? false,
      ability,
      dashboards,
      t
    )
  }, [t, dashboards, user?.isSuperAdmin])

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
            <NavMain items={navItems} />
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
