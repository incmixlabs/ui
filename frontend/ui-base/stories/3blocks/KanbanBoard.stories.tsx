import { Board } from "../../src/3blocks/kanban-board/board"
import { ListBoard } from "../../src/3blocks/kanban-board/list"
import { TableView } from "../../src/3blocks/kanban-board/table"
import { DndKanbanBoard } from "../../src/3blocks/kanban-board/dnd-example/KanbanBoard"
import { initialData } from "../../src/3blocks/kanban-board/data"
import { KanbanColumn } from "../../src/3blocks/kanban-board/types"

import type { Meta, StoryObj } from "@storybook/react"

// Mock data for stories
const mockColumns: KanbanColumn[] = initialData.map((column, index) => ({
  id: column.id,
  projectId: "storybook-project",
  name: column.name,
  color: ["#3b82f6", "#f59e0b", "#10b981"][index] || "#6b7280",
  order: index,
  description: `${column.name} column for project tasks`,
  isDefault: index === 0,
  createdAt: Date.now() - 86400000 * (3 - index), // Created 1-3 days ago
  updatedAt: Date.now() - 3600000 * index, // Updated 0-2 hours ago
  createdBy: {
    id: "user-1",
    name: "John Doe",
    image: "/api/placeholder/32/32",
  },
  updatedBy: {
    id: "user-1", 
    name: "John Doe",
    image: "/api/placeholder/32/32",
  },
  tasks: column.tasks.map((task, taskIndex) => ({
    ...task,
    statusId: column.id,
    priorityId: ["high", "medium", "low"][taskIndex % 3],
    createdAt: Date.now() - 86400000 * taskIndex,
    updatedAt: Date.now() - 3600000 * taskIndex,
    createdBy: {
      id: "user-1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user-1",
      name: "John Doe", 
    },
  })),
  completedTasksCount: column.tasks.filter(t => t.completed).length,
  totalTasksCount: column.tasks.length,
  progressPercentage: Math.round(
    (column.tasks.filter(t => t.completed).length / column.tasks.length) * 100
  ),
}))

const meta: Meta<typeof Board> = {
  title: "3 Blocks/Kanban Board",
  component: Board,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    projectId: {
      control: "text",
      description: "Project ID for the kanban board",
    },
  },
}

export default meta

type Story = StoryObj<typeof Board>

export const BoardView: Story = {
  args: {
    projectId: "storybook-project",
  },
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <Board {...args} />
    </div>
  ),
  name: "Board View",
}

export const ListView: Story = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <ListBoard projectId="storybook-project" />
    </div>
  ),
  name: "List View",
}

export const TableViewStory: Story = {
  render: () => (
    <div style={{ height: "100vh", padding: "1rem" }}>
      <TableView projectId="storybook-project" />
    </div>
  ),
  name: "Table View",
}

export const DndExample: Story = {
  render: () => (
    <div style={{ height: "100vh", padding: "1rem" }}>
      <DndKanbanBoard
        columnsData={mockColumns}
        priorityLabels={[
          { id: "high", name: "High Priority", color: "#ef4444" },
          { id: "medium", name: "Medium Priority", color: "#f59e0b" },
          { id: "low", name: "Low Priority", color: "#10b981" },
        ]}
        onCreateTask={(columnId, taskData) => {
          console.log("Create task:", { columnId, taskData })
        }}
        onUpdateTask={(taskId, updates) => {
          console.log("Update task:", { taskId, updates })
        }}
        onDeleteTask={(taskId) => {
          console.log("Delete task:", taskId)
        }}
        onUpdateColumn={(columnId, updates) => {
          console.log("Update column:", { columnId, updates })
        }}
        onDeleteColumn={(columnId) => {
          console.log("Delete column:", columnId)
        }}
        isDragging={false}
        onTaskOpen={(taskId) => {
          console.log("Open task:", taskId)
        }}
      />
    </div>
  ),
  name: "DnD Example",
}

export const EmptyBoard: Story = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <Board projectId="empty-project" />
    </div>
  ),
  name: "Empty Board",
}

export const LoadingState: Story = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <Board projectId="loading-project" />
    </div>
  ),
  name: "Loading State",
}