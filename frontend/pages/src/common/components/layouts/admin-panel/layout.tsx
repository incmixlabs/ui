import { SidebarInset, SidebarProvider } from "@incmix/ui/sidebar"
import type React from "react"
import { AppSidebar } from "./app-sidebar"

type Props = {
  children: React.ReactNode
}

export function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/*
        FIX:
        1. SidebarInset already renders the <main> tag, so we pass children directly.
        2. `overflow-x-hidden` is added. This is the key change that prevents
           the main content area from ever expanding horizontally beyond the viewport.
      */}
      <SidebarInset className="flex flex-1 flex-col overflow-x-hidden px-5">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
