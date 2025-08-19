import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme, Box, Text, Button, Flex } from "../../src/1base"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "../../src/4layouts/sidebar"
import {
  SecondarySidebar,
  SidebarErrorFallback
} from "../../src/4layouts/secondary-sidebars"
import { FileFolder } from "../../src/4layouts/secondary-sidebars/file-folder"
import { Home, Search, Settings, User, FolderClosed, File } from "lucide-react"

// Mock router component since we don't have @tanstack/react-router in storybook
const MockRouter = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const meta: Meta<typeof SecondarySidebar> = {
  title: "4 Layouts/SecondarySidebar",
  component: SecondarySidebar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Theme>
        <MockRouter>
          <Story />
        </MockRouter>
      </Theme>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// Basic secondary sidebar with main sidebar
export const Default: Story = {
  render: () => (
    <SidebarProvider defaultSecondaryOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Text size="4" weight="bold">App</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderClosed className="w-4 h-4" />
                    <span>Files</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SecondarySidebar>
        <Box className="p-4">
          <Flex align="center" gap="2" className="mb-4">
            <FolderClosed className="w-5 h-5" />
            <Text size="3" weight="bold">Secondary Menu</Text>
          </Flex>
          <Flex direction="column" gap="2">
            <Button variant="soft" size="2" className="justify-start">
              <File className="w-4 h-4 mr-2" />
              Document 1
            </Button>
            <Button variant="soft" size="2" className="justify-start">
              <File className="w-4 h-4 mr-2" />
              Document 2
            </Button>
            <Button variant="soft" size="2" className="justify-start">
              <File className="w-4 h-4 mr-2" />
              Document 3
            </Button>
          </Flex>
        </Box>
      </SecondarySidebar>

      <SidebarInset>
        <Box className="p-6">
          <Flex justify="between" align="center" className="mb-4">
            <Text size="5" weight="bold">Main Content with Secondary Sidebar</Text>
            <SidebarTrigger />
          </Flex>
          <Text className="mb-4">
            This layout includes both a primary sidebar (left) and a secondary sidebar.
            The secondary sidebar provides additional navigation or context-specific options.
          </Text>
          <Text size="2" color="gray">
            Try collapsing the main sidebar to see how the secondary sidebar adapts.
          </Text>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// File manager example with secondary sidebar
export const FileManagerExample: Story = {
  render: () => (
    <SidebarProvider defaultSecondaryOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Text size="4" weight="bold">File App</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderClosed className="w-4 h-4" />
                    <span>File Manager</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SecondarySidebar>
        <FileFolder />
      </SecondarySidebar>

      <SidebarInset>
        <Box className="p-6">
          <Flex justify="between" align="center" className="mb-4">
            <Text size="5" weight="bold">File Manager</Text>
            <SidebarTrigger />
          </Flex>
          <Text className="mb-4">
            This is a file manager interface with a specialized secondary sidebar
            that shows the folder tree structure with expandable folders.
          </Text>
          <Box className="grid grid-cols-4 gap-4 mt-6">
            <Box className="p-4 border rounded-lg">
              <File className="w-8 h-8 mb-2 text-blue-500" />
              <Text size="2">document.pdf</Text>
            </Box>
            <Box className="p-4 border rounded-lg">
              <File className="w-8 h-8 mb-2 text-green-500" />
              <Text size="2">spreadsheet.xlsx</Text>
            </Box>
            <Box className="p-4 border rounded-lg">
              <File className="w-8 h-8 mb-2 text-red-500" />
              <Text size="2">presentation.pptx</Text>
            </Box>
            <Box className="p-4 border rounded-lg">
              <File className="w-8 h-8 mb-2 text-purple-500" />
              <Text size="2">image.png</Text>
            </Box>
          </Box>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Custom secondary sidebar content
export const CustomContent: Story = {
  render: () => (
    <SidebarProvider defaultSecondaryOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader>
          <Text size="4" weight="bold">Project App</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="w-4 h-4" />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderClosed className="w-4 h-4" />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <User className="w-4 h-4" />
                    <span>Team</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SecondarySidebar>
        <Box className="p-4">
          <Text size="3" weight="bold" className="mb-4">Project Details</Text>

          <Box className="mb-6">
            <Text size="2" weight="medium" className="mb-2">Progress</Text>
            <Box className="w-full bg-gray-3 rounded-full h-2">
              <Box className="bg-blue-500 h-2 rounded-full w-3/4"></Box>
            </Box>
            <Text size="1" color="gray" className="mt-1">75% complete</Text>
          </Box>

          <Box className="mb-6">
            <Text size="2" weight="medium" className="mb-2">Team Members</Text>
            <Flex direction="column" gap="2">
              <Flex align="center" gap="2">
                <Box className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Text size="1" color="white">JD</Text>
                </Box>
                <Text size="2">John Doe</Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Text size="1" color="white">JS</Text>
                </Box>
                <Text size="2">Jane Smith</Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Text size="1" color="white">MB</Text>
                </Box>
                <Text size="2">Mike Brown</Text>
              </Flex>
            </Flex>
          </Box>

          <Box className="mb-4">
            <Text size="2" weight="medium" className="mb-2">Quick Actions</Text>
            <Flex direction="column" gap="2">
              <Button variant="soft" size="2" className="justify-start">
                Add Task
              </Button>
              <Button variant="soft" size="2" className="justify-start">
                Create Folder
              </Button>
              <Button variant="soft" size="2" className="justify-start">
                Invite Member
              </Button>
            </Flex>
          </Box>
        </Box>
      </SecondarySidebar>

      <SidebarInset>
        <Box className="p-6">
          <Flex justify="between" align="center" className="mb-4">
            <Text size="5" weight="bold">Project Dashboard</Text>
            <SidebarTrigger />
          </Flex>
          <Text className="mb-4">
            This example shows a project management interface where the secondary sidebar
            provides contextual information like project progress, team members, and quick actions.
          </Text>

          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Box className="p-4 border rounded-lg">
              <Text size="3" weight="bold" className="mb-2">Tasks</Text>
              <Text size="5" weight="bold" color="blue">24</Text>
              <Text size="2" color="gray">Active tasks</Text>
            </Box>
            <Box className="p-4 border rounded-lg">
              <Text size="3" weight="bold" className="mb-2">Completed</Text>
              <Text size="5" weight="bold" color="green">18</Text>
              <Text size="2" color="gray">This week</Text>
            </Box>
            <Box className="p-4 border rounded-lg">
              <Text size="3" weight="bold" className="mb-2">Team</Text>
              <Text size="5" weight="bold" color="purple">3</Text>
              <Text size="2" color="gray">Members</Text>
            </Box>
          </Box>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Error fallback example
export const ErrorFallback: Story = {
  render: () => (
    <SidebarProvider defaultSecondaryOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader>
          <Text size="4" weight="bold">App</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SecondarySidebar>
        <SidebarErrorFallback message="secondary sidebar content" />
      </SecondarySidebar>

      <SidebarInset>
        <Box className="p-6">
          <Flex justify="between" align="center" className="mb-4">
            <Text size="5" weight="bold">Error State Example</Text>
            <SidebarTrigger />
          </Flex>
          <Text>
            This shows how the secondary sidebar displays error states when content fails to load.
          </Text>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Collapsed primary sidebar with secondary
export const CollapsedPrimary: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false} defaultSecondaryOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Text size="4" weight="bold">App</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderClosed className="w-4 h-4" />
                    <span>Files</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SecondarySidebar>
        <Box className="p-4">
          <Text size="3" weight="bold" className="mb-4">Files & Folders</Text>
          <Flex direction="column" gap="2">
            <Button variant="ghost" size="2" className="justify-start">
              <FolderClosed className="w-4 h-4 mr-2" />
              Documents
            </Button>
            <Button variant="ghost" size="2" className="justify-start">
              <FolderClosed className="w-4 h-4 mr-2" />
              Images
            </Button>
            <Button variant="ghost" size="2" className="justify-start">
              <FolderClosed className="w-4 h-4 mr-2" />
              Videos
            </Button>
          </Flex>
        </Box>
      </SecondarySidebar>

      <SidebarInset>
        <Box className="p-6">
          <Flex justify="between" align="center" className="mb-4">
            <Text size="5" weight="bold">Collapsed Primary Sidebar</Text>
            <SidebarTrigger />
          </Flex>
          <Text>
            When the primary sidebar is collapsed to icons only, the secondary sidebar
            adjusts its position accordingly. Notice how the secondary sidebar moves closer
            to the collapsed primary sidebar.
          </Text>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}
