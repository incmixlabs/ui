import { Board } from "../../src/3blocks/kanban-board/board"
import { ListBoard } from "../../src/3blocks/kanban-board/list"
import { TableView } from "../../src/3blocks/kanban-board/table"
import { DndKanbanBoard } from "../../src/3blocks/kanban-board/dnd-example/KanbanBoard"
import { storybookData } from "../../src/3blocks/kanban-board/storybook-data"
import { KanbanColumn } from "../../src/3blocks/kanban-board/types"

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"

// Use comprehensive storybook data that matches RxDB schema
const mockColumns: KanbanColumn[] = storybookData.kanbanColumns
const priorityLabels = storybookData.priorityLabels.map(label => ({
  id: label.id,
  label: label.name,
  name: label.name,
  color: label.color,
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
        priorityLabels={priorityLabels}
        onCreateTask={async (columnId, taskData) => {
          console.log("Create task:", { columnId, taskData })
        }}
        onUpdateTask={async (taskId, updates) => {
          console.log("Update task:", { taskId, updates })
        }}
        onDeleteTask={async (taskId) => {
          console.log("Delete task:", taskId)
        }}
        onUpdateColumn={async (columnId, updates) => {
          console.log("Update column:", { columnId, updates })
        }}
        onDeleteColumn={async (columnId) => {
          console.log("Delete column:", columnId)
        }}
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