import { Badge, Box, Flex, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuSubItem, SidebarProvider } from "@incmix/ui"
import { LayoutDashboard as   DashboardIcon, Mail as EnvelopeClosedIcon, Settings as  GearIcon, User as  PersonIcon} from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

const meta: Meta<typeof Sidebar> = {
  title: "Layouts/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="h-full w-[300px]">
        <Story />
      </Box>
    ),
  ],
}

export default meta

const noop = () => {}

const DefaultContent = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <DashboardIcon /> Dashboard
    </SidebarMenuItem>
    <SidebarMenuItem>
      <EnvelopeClosedIcon /> Inbox
      <Badge>3</Badge>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <PersonIcon /> Users
      <SidebarMenuSubItem>Users List</SidebarMenuSubItem>
      <SidebarMenuSubItem>Profile</SidebarMenuSubItem>
      <SidebarMenuSubItem>Settings</SidebarMenuSubItem>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <GearIcon /> Settings
    </SidebarMenuItem>
  </SidebarMenu>
)

export const Extended = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}

export const Minified = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}

export const WithName = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}

export const WithMinifyButton = () => {
  const [isMinified, setIsMinified] = useState(false)

  return (
    <SidebarProvider>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}
