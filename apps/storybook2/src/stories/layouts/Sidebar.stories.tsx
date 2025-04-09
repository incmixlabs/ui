import {
  Badge,
  Box,
  Flex,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@incmix/ui2"

import {
  DashboardIcon,
  EnvelopeClosedIcon,
  GearIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
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

const _noop = () => {}

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
    <Sidebar>
      <DefaultContent />
    </Sidebar>
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
  const [_isMinified, _setIsMinified] = useState(false)

  return (
    <SidebarProvider>
      <Sidebar>
        <DefaultContent />
      </Sidebar>
    </SidebarProvider>
  )
}
