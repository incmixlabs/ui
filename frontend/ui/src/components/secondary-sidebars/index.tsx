"use client"

import { cn } from "@incmix/ui"
import { FC, type JSX } from "react"
import { useSidebar } from "../sidebar"
export type SecondarySidebarProps = {
  children: JSX.Element
}
export * from "./fallback"
export function SecondarySidebar({
  children,
}: SecondarySidebarProps): JSX.Element {
  const { isMobile, open, secondaryOpen, openMobile } = useSidebar()
  return (
    <div
      className={cn(
        "relative z-30 h-screen w-[270px] transition-all duration-200 ease-linear",
        isMobile
          ? `min-w-[270px] ${open && "hidden"} ${!openMobile && "hidden"}`
          : `${secondaryOpen ? "flex min-w-[270px]" : "hidden w-0"}`
      )}
    >
      <div
        className={cn(
          "fixed top-0 z-10 flex h-screen w-[270px] flex-col border border-y-0 border-r-gray-6 border-l-0 bg-gray-4 transition-[left,opacity] duration-300 ease-in-out",
          open
            ? "left-[calc(var(--sidebar-width))] z-30"
            : "left-[calc(var(--sidebar-width-icon))]",
          isMobile
            ? `min-w-[270px] ${open && "hidden"} ${!openMobile && "hidden"}`
            : `${secondaryOpen ? "flex min-w-[270px]" : "hidden w-0"}`
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
