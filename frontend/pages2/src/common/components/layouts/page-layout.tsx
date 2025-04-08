import { Toaster } from "@incmix/ui2"
import { Box, Flex, ScrollArea } from "@incmix/ui2"
import type { FC, ReactNode } from "react"

import { AppSidebar as Sidebar } from "./admin-panel/app-sidebar"
import { NavbarMain } from "./navbar"

interface PageLayoutProps {
  children: ReactNode
  navbar?: ReactNode
  sidebar?: ReactNode
  showSidebar?: boolean
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  navbar,
  sidebar,
  showSidebar = true,
}) => {
  return (
    <Flex direction="column" className="min-h-screen overflow-hidden">
      {navbar ?? <NavbarMain />}
      <Flex className="flex-1 overflow-hidden">
        {showSidebar && (
          <Box className="h-[calc(100vh-64px)]">{sidebar ?? <Sidebar />}</Box>
        )}
        <ScrollArea
          scrollbars="vertical"
          className="h-[calc(100vh-64px)] flex-1"
        >
          <Box className="min-h-full bg-gray-1 p-6 transition-all duration-300">
            {children}
          </Box>
        </ScrollArea>
      </Flex>
      <Toaster />
    </Flex>
  )
}
