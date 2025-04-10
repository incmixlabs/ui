import { type TreeDataItem, TreeView } from "@incmix/ui2/tree-view"
import { Box } from "@incmix/ui2"
import type { Meta, StoryObj } from "@storybook/react"
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react"
import { useState } from "react"

const meta: Meta<typeof TreeView> = {
  title: "Molecules/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="max-w-md p-4">
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TreeView>

const sampleData: TreeDataItem[] = [
  {
    id: "1",
    name: "Documents",
    icon: FolderIcon,
    openIcon: FolderOpenIcon,
    type: "folder",
    children: [
      {
        id: "1.1",
        name: "Work",
        icon: FolderIcon,
        openIcon: FolderOpenIcon,
        type: "folder",
        children: [
          {
            id: "1.1.1",
            name: "Project A",
            icon: FileIcon,
            type: "file",
          },
          {
            id: "1.1.2",
            name: "Project B",
            icon: FileIcon,
            type: "file",
          },
        ],
      },
      {
        id: "1.2",
        name: "Personal",
        icon: FolderIcon,
        openIcon: FolderOpenIcon,
        type: "folder",
        children: [
          {
            id: "1.2.1",
            name: "Photos",
            icon: FileIcon,
            type: "file",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Downloads",
    icon: FolderIcon,
    openIcon: FolderOpenIcon,
    type: "folder",
    children: [
      {
        id: "2.1",
        name: "Movies",
        icon: FileIcon,
        type: "file",
      },
      {
        id: "2.2",
        name: "Music",
        icon: FileIcon,
        type: "file",
      },
    ],
  },
]

const TreeViewWithState = (args: React.ComponentProps<typeof TreeView>) => {
  const [data, setData] = useState(args.data)
  return <TreeView {...args} data={data} setData={setData} />
}

export const Default: Story = {
  render: (args) => <TreeViewWithState {...args} />,
  args: {
    data: sampleData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A tree view component that supports nested items, icons, selection, and drag-and-drop functionality. Items can be folders (with children) or leaf nodes. Icons can change based on selection and open/closed states.",
      },
    },
  },
}

export const WithInitialSelection: Story = {
  render: (args) => <TreeViewWithState {...args} />,
  args: {
    data: sampleData,
    initialSelectedItemId: "1.1.1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tree view with an initially selected item. The tree will automatically expand to show the selected item.",
      },
    },
  },
}

export const Empty: Story = {
  render: (args) => <TreeViewWithState {...args} />,
  args: {
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tree view in its empty state. Shows a message and buttons to create new files or folders. The empty message can be customized through the `emptyMessage` prop.",
      },
    },
  },
}
