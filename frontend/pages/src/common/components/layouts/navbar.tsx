import { Link as RouterLink, useNavigate } from "@tanstack/react-router"
import { motion } from "motion/react"
import type React from "react"

import { useLogout } from "@auth"
import { useSidebarStore, useThemeStore } from "@incmix/store"
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  iconSize,
  Link,
  Text,
  TextField,
} from "@incmix/ui"

import {
  Bell as BellIcon,
  LogOut as ExitIcon,
  Settings as GearIcon,
  Menu as HamburgerMenuIcon,
  Search as MagnifyingGlassIcon,
  Moon as MoonIcon,
  User as PersonIcon,
  Sun as SunIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { CurrentUserProfileImage } from "../user-profile-image"
import OrgDropdown from "./org-dropdown"

type NavbarMainProps = {
  extraIcons?: React.ReactNode
}

const NavbarLogo: React.FC = () => (
  <Link asChild href="/">
    <Flex align="center">
      <svg
        className="mr-2 h-8 w-8 text-blue-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <title>IncMix</title>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <Box as="span" className="font-semibold text-gray-12 text-xl">
        IncMix
      </Box>
    </Flex>
  </Link>
)

const SearchBar: React.FC = () => {
  const { t } = useTranslation("navbar")
  return (
    <Box position="relative">
      <TextField.Root placeholder={t("search")} className="rounded-4 bg-gray-7">
        <TextField.Slot />
        <TextField.Slot>
          <MagnifyingGlassIcon className="text-gray-11" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  )
}

const ThemeToggle: React.FC = () => {
  const { theme} = useThemeStore()
  const { t } = useTranslation("navbar")
  const style = `${iconSize} text-gray-12`
  return (
    <Button variant="ghost" aria-label={t("toggleTheme")}>
      {theme === "dark" ? (
        <SunIcon className={style} />
      ) : (
        <MoonIcon className={style} />
      )}
    </Button>
  )
}

const NavbarExtraIcons: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  if (!children) return null

  return (
    <Flex align="center" gap="4" className="mr-4 border-gray-6 border-r pr-4">
      {children}
    </Flex>
  )
}

const ProfileDropdown: React.FC = () => {
  const { t } = useTranslation("navbar")
  const { handleLogout, isPending: isLogoutLoading } = useLogout()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <IconButton
            variant="ghost"
            className="rounded-full transition-colors duration-200 hover:bg-blue-7"
          >
            <CurrentUserProfileImage size="2" aria-label={t("profile")} />
          </IconButton>
        </motion.div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item asChild>
          <Link asChild href="/settings">
            <Flex align="center" gap="2">
              <GearIcon />
              <Text>{t("settings")}</Text>
            </Flex>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleLogout} disabled={isLogoutLoading}>
          <Flex align="center" gap="2">
            <ExitIcon />
            <Text>{t("logout")}</Text>
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const NavbarIcons: React.FC<{ extraIcons?: React.ReactNode }> = ({
  extraIcons,
}) => {
  const { t } = useTranslation("navbar")
  return (
    <Flex align="center" gap="4">
      <NavbarExtraIcons>{extraIcons}</NavbarExtraIcons>
      <ThemeToggle />
      <RouterLink to="/notifications">
        <BellIcon
          className={`${iconSize} cursor-pointer text-gray-12`}
          aria-label={t("notifications")}
        />
      </RouterLink>
      <ProfileDropdown />
    </Flex>
  )
}

export function NavbarMain({ extraIcons }: NavbarMainProps) {
  const { t } = useTranslation("navbar")
  const { toggleOpen } = useSidebarStore()

  return (
    <Flex
      asChild
      direction="column"
      justify="center"
      className="z-50 h-navbar w-full border-gray-6 border-b bg-gray-3 text-white"
    >
      <nav>
        <Box className="px-4 py-3">
          <Flex justify="between" align="center" className="h-full">
            <Flex align="center" gap="4">
              <Button
                variant="ghost"
                onClick={toggleOpen}
                aria-label={t("toggleSidebar")}
              >
                <HamburgerMenuIcon className="h-6 w-6 text-gray-12 transition-colors duration-200 hover:text-white" />
              </Button>
              <NavbarLogo />
              <SearchBar />
            </Flex>
            <OrgDropdown />
            <NavbarIcons extraIcons={extraIcons} />
          </Flex>
        </Box>
      </nav>
    </Flex>
  )
}
