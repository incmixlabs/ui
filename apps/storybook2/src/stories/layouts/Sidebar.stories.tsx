import { Box, Badge } from "@incmix/ui2/radixui"
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuButton
} from "@incmix/ui2/sidebar"

import {
  DashboardIcon,
  EnvelopeClosedIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
import type { Meta } from "@storybook/react"
import { useState } from "react"

// CSS Variables required for sidebar styling
const sidebarStyles = {
  "--sidebar-width": "16rem",
  "--sidebar-width-icon": "4rem",
  "--sidebar-background": "hsl(0, 0%, 100%)",
  "--sidebar-foreground": "hsl(20, 14.3%, 4.1%)",
  "--sidebar-border": "hsl(240, 5.9%, 90%)",
  "--sidebar-accent": "hsl(240, 4.8%, 95.9%)",
  "--sidebar-accent-foreground": "hsl(240, 5.9%, 10%)",
  "--sidebar-trigger-background": "hsl(0, 0%, 100%)",
  "--sidebar-trigger-border": "hsl(240, 5.9%, 90%)",
  "--sidebar-ring": "hsl(240, 5.9%, 90%)",
  "--sidebar-item-primary": "hsl(240, 4.8%, 95.9%)",
  "--sidebar-primary-foreground": "hsl(240, 5.9%, 10%)",
} as React.CSSProperties;

const meta: Meta<typeof Sidebar> = {
  title: "Layouts/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="h-screen w-[300px]" style={sidebarStyles}>
        <Story />
      </Box>
    ),
  ],
}

export default meta

const DefaultContent = () => (
  <>
    <SidebarHeader>
      <SidebarHeaderLabel>Sidebar</SidebarHeaderLabel>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <DashboardIcon /> Dashboard
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <EnvelopeClosedIcon /> Inbox
          </SidebarMenuButton>
          <Badge>3</Badge>
        </SidebarMenuItem>
        <SidebarSeparator />
        <SidebarMenuItem>
          <SidebarMenuButton>
            <PersonIcon /> Users
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <GearIcon /> Settings
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <div className="text-xs text-center text-sidebar-foreground/50">
        Sidebar Footer
      </div>
    </SidebarFooter>
  </>
)

export const Extended = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}

export const Collapsed = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}

export const WithSubItems = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderLabel>With Sub-items</SidebarHeaderLabel>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <DashboardIcon /> Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <PersonIcon /> Users
              </SidebarMenuButton>
              <SidebarMenuSubItem>Users List</SidebarMenuSubItem>
              <SidebarMenuSubItem>Profile</SidebarMenuSubItem>
              <SidebarMenuSubItem>Settings</SidebarMenuSubItem>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

export const Toggleable = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <SidebarProvider
      defaultOpen={isExpanded}
      open={isExpanded}
      onOpenChange={(open) => setIsExpanded(open)}
    >
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}
