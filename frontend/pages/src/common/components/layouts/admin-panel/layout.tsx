import { useEditingStore, useThemeStore } from "@incmix/store"
import {
  Button,
  Separator,
  iconSize,
} from "@incmix/ui"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@incmix/ui/sidebar"
import { Link, useLocation } from "@tanstack/react-router"
import { MoonIcon, SunIcon } from "lucide-react"
import type React from "react"
import { useTranslation } from "react-i18next"
import { AppSidebar } from "./app-sidebar"

type Props = {
  children: React.ReactNode
  breadcrumbItems: {
    label: string
    url: string
  }[]
  navExtras?: React.ReactNode
}
export function DashboardLayout({ children, navExtras }: Props) {
  const { theme, toggleTheme } = useThemeStore()
  const { t } = useTranslation("navbar")
  const { pathname } = useLocation()
  const { isEditing } = useEditingStore()

  const style = `${iconSize} text-gray-12`
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="container mx-auto flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            {pathname.includes("/file-manager") ||
              (pathname.includes("/dashboard") && isEditing && (
                <>
                  <SidebarTrigger
                    isSecondary
                    mobileSidebarTrigger
                    className="-ml-1"
                    aria-label={t("toggleSecondarySidebar")}
                  />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                </>
              ))}
            <Button
              className="ml-auto"
              variant="soft"
              onClick={toggleTheme}
              aria-label={t("toggleTheme")}
            >
              {theme === "dark" ? (
                <SunIcon className={style} />
              ) : (
                <MoonIcon className={style} />
              )}
            </Button>
            {navExtras}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
