import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { TaskCardDrawer } from "../../src/3blocks/kanban-board/shared/old-task-card-drawer"
import { TaskCopyBufferProvider } from "../../src/3blocks/kanban-board/hooks/use-task-copy-buffer"

const meta: Meta<typeof TaskCardDrawer> = {
  title: "3 Blocks/Kanban Board/Old TaskCardDrawer",
  component: TaskCardDrawer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TaskCopyBufferProvider>
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      </TaskCopyBufferProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => {
    return <TaskCardDrawer {...args} />
  },
}

export const WithMockData: Story = {
  args: {},
  render: (args) => {
    // Mock the drawer state to show the drawer open with sample data
    React.useEffect(() => {
      // Simulate opening the drawer with a task
      const mockTaskId = "task-123"
      localStorage.setItem("kanban-drawer-task-id", mockTaskId)
    }, [])

    return <TaskCardDrawer {...args} />
  },
}

export const Interactive: Story = {
  args: {},
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isOpen ? "Close" : "Open"} Task Drawer
        </button>
        {isOpen && <TaskCardDrawer {...args} />}
      </div>
    )
  },
}