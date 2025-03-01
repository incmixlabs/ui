"use client"

import { Bell, ChevronsUpDown, LogOut, Settings2, UserIcon } from "lucide-react"

import { useLogout, useProfilePictureUrl, useUser } from "@auth"
import { Avatar } from "@incmix/ui"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
import { DropdownMenu } from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"

export function NavUser({
  userId,
}: {
  userId: string
}) {
  const { isMobile } = useSidebar()
  const { t } = useTranslation("navbar")
  const { handleLogout, isPending: isLogoutLoading } = useLogout()
  const { user } = useUser(userId)
  const profilePictureUrl = useProfilePictureUrl(user?.id ?? "")

  const avatarUrl = profilePictureUrl || user?.avatar || undefined

  if (!user) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar src={avatarUrl} className="h-8 w-8 rounded-lg" />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenu.Label className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar src={avatarUrl} className="h-8 w-8 rounded-lg" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            {/* <DropdownMenu.Group>
              <DropdownMenu.Item>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator /> */}
            <DropdownMenu.Group>
              <DropdownMenu.Item asChild>
                <Link to="/profile">
                  <UserIcon />
                  {t("profile")}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/settings">
                  <Settings2 />
                  {t("settings")}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/notifications">
                  <Bell />
                  {t("notifications")}
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onClick={handleLogout}
              disabled={isLogoutLoading}
            >
              <LogOut />
              {t("logout")}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
