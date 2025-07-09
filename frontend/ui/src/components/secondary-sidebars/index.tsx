"use client"
import { cn } from "@incmix/ui"
import { Box, Flex } from "@incmix/ui"
import type { JSX } from "react"
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
    <Box
      className={cn(
        "relative h-screen md:w-[240px] w-fit transition-all duration-200 ease-linear xl:w-[270px]",
        isMobile
          ? `fixed left-16 z-30 min-w-[270px] bg-gray-2 ${open && "hidden"} ${!openMobile && "hidden"}`
          : `${secondaryOpen ? "flex w-[250px] xl:min-w-[270px]" : "hidden w-0"}`
      )}
    >
      <Box
        className={cn(
          "fixed top-0 flex h-screen w-[270px] flex-col border border-y-0 border-r-gray-6 border-l-0 bg-sidebar-background transition-[left,opacity] duration-300 ease-in-out",
          open
            ? "left-[calc(var(--sidebar-width))] z-30"
            : "left-[calc(var(--sidebar-width-icon))]",
          isMobile
            ? `min-w-[270px] ${open && "hidden"} ${!openMobile && "hidden"}`
            : `${secondaryOpen ? "flex w-[250px] xl:min-w-[270px]" : "hidden w-0"}`
        )}
      >
        <Flex direction={"column"} className="h-full">
          {children}
        </Flex>
      </Box>
    </Box>
  )
}
