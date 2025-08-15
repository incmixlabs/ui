import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import "../../src/styles/index.css"
import { Theme, Box, Text, Button, Flex } from "../../src/1base"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../../src/4layouts/sidebar"
import { Home, Search, Settings, User, ChevronRight, File, Folder } from "lucide-react"

// Mock router component since we don't have @tanstack/react-router in storybook
const MockRouter = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const meta: Meta<typeof Sidebar> = {
  title: "4 Layouts/Sidebar",
  component: Sidebar,
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
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Side where sidebar appears",
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Sidebar variant style",
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "Sidebar collapsible behavior",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic sidebar example
export const Default: Story = {
  render: (args) => (
    <SidebarProvider>
      <Sidebar {...args}>
        <SidebarHeader>
          <Text size="4" weight="bold">My App</Text>
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
                    <Search className="w-4 h-4" />
                    <span>Search</span>
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
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="w-4 h-4" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Box className="p-6">
          <Text size="5" weight="bold" className="mb-4">Main Content</Text>
          <Text>This is the main content area. The sidebar can be toggled and resized.</Text>
          <SidebarTrigger className="mt-4" />
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
  },
}

// Sidebar with nested menu
export const WithNestedMenu: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <Text size="4" weight="bold">File Manager</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Files</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Folder className="w-4 h-4" />
                    <span>Documents</span>
                    <ChevronRight className="ml-auto w-4 h-4" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <File className="w-4 h-4" />
                        <span>Report.pdf</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <File className="w-4 h-4" />
                        <span>Presentation.pptx</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Folder className="w-4 h-4" />
                    <span>Images</span>
                    <ChevronRight className="ml-auto w-4 h-4" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <File className="w-4 h-4" />
                        <span>photo1.jpg</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <File className="w-4 h-4" />
                        <span>screenshot.png</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Box className="p-6">
          <Text size="5" weight="bold" className="mb-4">File Manager</Text>
          <Text>A file manager interface with nested folder structure in the sidebar.</Text>
          <SidebarTrigger className="mt-4" />
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Right-side sidebar
export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <SidebarInset>
        <Box className="p-6">
          <Flex justify="between" align="center" className="mb-4">
            <Text size="5" weight="bold">Main Content</Text>
            <SidebarTrigger />
          </Flex>
          <Text>This layout has the sidebar on the right side.</Text>
        </Box>
      </SidebarInset>
      <Sidebar side="right" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader>
          <Text size="4" weight="bold">Right Sidebar</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
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
    </SidebarProvider>
  ),
}

// Floating variant
export const FloatingVariant: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar side="left" variant="floating" collapsible="offcanvas">
        <SidebarHeader>
          <Text size="4" weight="bold">Floating Sidebar</Text>
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
      <SidebarInset>
        <Box className="p-6">
          <Text size="5" weight="bold" className="mb-4">Floating Sidebar</Text>
          <Text>This sidebar has a floating appearance with shadow and rounded corners.</Text>
          <SidebarTrigger className="mt-4" />
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Inset variant
export const InsetVariant: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar side="left" variant="inset" collapsible="offcanvas">
        <SidebarHeader>
          <Text size="4" weight="bold">Inset Sidebar</Text>
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
      <SidebarInset>
        <Box className="p-6">
          <Text size="5" weight="bold" className="mb-4">Inset Sidebar</Text>
          <Text>This sidebar is inset with margin and rounded corners for a modern look.</Text>
          <SidebarTrigger className="mt-4" />
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// Non-collapsible sidebar
export const NonCollapsible: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="none">
        <SidebarHeader>
          <Text size="4" weight="bold">Fixed Sidebar</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Always Visible</SidebarGroupLabel>
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
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Box className="p-6">
          <Text size="5" weight="bold" className="mb-4">Non-Collapsible</Text>
          <Text>This sidebar cannot be collapsed or hidden. It's always visible.</Text>
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// With separators
export const WithSeparators: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader>
          <Text size="4" weight="bold">My Workspace</Text>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
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
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
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
        
        <SidebarSeparator />
        
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="w-4 h-4" />
                <span>John Doe</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Box className="p-6">
          <Text size="5" weight="bold" className="mb-4">With Separators</Text>
          <Text>This sidebar uses separators to organize menu groups.</Text>
          <SidebarTrigger className="mt-4" />
        </Box>
      </SidebarInset>
    </SidebarProvider>
  ),
}