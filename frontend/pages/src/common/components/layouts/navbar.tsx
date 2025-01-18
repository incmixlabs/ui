import { Link as RouterLink, useNavigate } from "@tanstack/react-router"
import { motion } from "framer-motion"
import type React from "react"

import { useLogout } from "@auth"
import { useSidebarStore, useThemeStore } from "@incmix/store"
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Link,
  TextField,
} from "@incmix/ui"

import {
  BellIcon,
  ExitIcon,
  GearIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons"
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
  const { theme, toggleTheme } = useThemeStore()
  const { t } = useTranslation("navbar")
  return (
    <Button variant="ghost" onClick={toggleTheme} aria-label={t("toggleTheme")}>
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-gray-12" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-12" />
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
  const navigate = useNavigate()
  const { t } = useTranslation("navbar")
  const { handleLogout, isPending: isLogoutLoading } = useLogout()

  return (
    <DropdownMenu
      trigger={
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <IconButton
            variant="ghost"
            className="rounded-full transition-colors duration-200 hover:bg-blue-7"
          >
            <CurrentUserProfileImage size="2" aria-label={t("profile")} />
          </IconButton>
        </motion.div>
      }
      items={[
        {
          icon: <PersonIcon />,
          label: t("profile"),
          onClick: () => navigate({ to: "/profile" }),
        },
        {
          icon: <GearIcon />,
          label: t("settings"),
          onClick: () => navigate({ to: "/settings" }),
          separator: true,
        },
        {
          icon: <ExitIcon />,
          label: t("logout"),
          onClick: handleLogout,
          disabled: isLogoutLoading,
          color: "red",
        },
      ]}
    />
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
          className="h-6 w-6 cursor-pointer text-gray-12"
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
