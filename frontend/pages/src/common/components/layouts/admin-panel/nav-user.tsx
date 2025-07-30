import { useLogout, useProfilePictureUrl, useUser } from "@auth"
import { useAppearanceStore } from "@incmix/store"
import { Avatar, Box, DropdownMenu, Flex, Icon, Switch, Text } from "@incmix/ui"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@incmix/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"

export function NavUser({ userId }: { userId: string }) {
  const { isMobile } = useSidebar()
  const { t } = useTranslation("navbar")
  const { handleLogout, isPending: isLogoutLoading } = useLogout()
  const { user } = useUser(userId)
  const profilePictureUrl = useProfilePictureUrl(user?.id ?? "")
  const { appearance, toggleAppearance } = useAppearanceStore()

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
                <Text size="2" as="span" className="capitalize">
                  {user.name}
                </Text>
                <Text size="2" as="span" className="truncate">
                  {user.email}
                </Text>
              </Box>
              <Icon name="ChevronsUpDown" className="ml-auto shrink-0 scale-icon" />
            </SidebarMenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-app px-0 py-1"
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
                  <Text size="2" as="span" className="text-gray-12 capitalize">
                    {user.name}
                  </Text>
                  <Text size="2" as="span" className="truncate text-gray-11">
                    {user.email}
                  </Text>
                </Box>
              </Flex>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item asChild className="px-1.5">
                <Link to="/settings">
                  <Icon name="Settings2"/>
                  {t("settings")}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild className="px-1.5">
                <Link to="/notifications">
                  <Icon name="Bell" />
                  {t("notifications")}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild className="px-1.5">
                <Flex align="center" justify="between">
                  <Text>{t("Theme")}</Text>
                  <Switch
                    checked={appearance === "dark"}
                    onCheckedChange={toggleAppearance}
                  />
                </Flex>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onClick={handleLogout}
              disabled={isLogoutLoading}
              className="px-1.5"
              color="red"
            >
              <Icon name="LogOut" />
              {t("logout")}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
