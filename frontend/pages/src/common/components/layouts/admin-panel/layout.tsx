import { useEditingStore, useThemeStore } from "@incmix/store"
import { Button, Separator, iconSize } from "@incmix/ui"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@incmix/ui/sidebar"
import type React from "react"
import { AppSidebar } from "./app-sidebar"

type Props = {
  children: React.ReactNode
}
export function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
