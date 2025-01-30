import { Box, Flex, Sidebar, SidebarItem, SidebarSubItem } from "@incmix/ui"

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

const noop = () => {}

const DefaultContent = () => (
  <Flex direction="column" gap="1" p="2">
    <SidebarItem icon={<DashboardIcon />} label="Dashboard" onClick={noop} />
    <SidebarItem
      icon={<EnvelopeClosedIcon />}
      label="Inbox"
      onClick={noop}
      badge={3}
    />
    <SidebarItem icon={<PersonIcon />} label="Users">
      <SidebarSubItem label="Users List" onClick={noop} />
      <SidebarSubItem label="Profile" onClick={noop} />
      <SidebarSubItem label="Settings" onClick={noop} />
    </SidebarItem>
    <SidebarItem icon={<GearIcon />} label="Settings" onClick={noop} />
  </Flex>
)

export const Extended = () => {
  return (
    <Sidebar minified={false} state="extended">
      <DefaultContent />
    </Sidebar>
  )
}

export const Minified = () => {
  return (
    <Sidebar minified={true} state="extended">
      <DefaultContent />
    </Sidebar>
  )
}

export const WithName = () => {
  return (
    <Sidebar minified={false} state="extended" name="Sidebar">
      <DefaultContent />
    </Sidebar>
  )
}

export const WithMinifyButton = () => {
  const [isMinified, setIsMinified] = useState(false)

  return (
    <Sidebar
      minified={isMinified}
      state="extended"
      name="Interactive Sidebar"
      onMinifyChange={setIsMinified}
    >
      <DefaultContent />
    </Sidebar>
  )
}
