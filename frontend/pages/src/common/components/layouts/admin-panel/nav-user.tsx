"use client"

import { Bell, ChevronsUpDown, LogOut, Settings2, UserIcon } from "lucide-react"

import { useLogout, useProfilePictureUrl, useUser } from "@auth"
import { Avatar, Box, DropdownMenu, Flex, Text } from "@incmix/ui"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
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
              <Avatar
                src={avatarUrl}
                className="h-8 w-8 rounded-app"
                name={user.name}
              />

              <Box className="grid flex-1 text-left text-sm leading-tight">
                <Text size="2" as="span">
                  {user.name}
                </Text>
                <Text size="2" as="span" className="truncate">
                  {user.email}
                </Text>
              </Box>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 scale-icon" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-app"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenu.Label className="p-0 font-normal">
              <Flex align="center" className="gap-2 px-1 py-1.5 text-left">
                <Avatar
                  src={avatarUrl}
                  className="h-8 w-8 rounded-app"
                  name={user.name}
                />
                <Box className="grid flex-1 text-left leading-tight">
                  <Text size="2" as="span">
                    {user.name}
                  </Text>
                  <Text size="2" as="span" className="truncate">
                    {user.email}
                  </Text>
                </Box>
              </Flex>
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
