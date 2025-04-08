import { Board } from "@incmix/ui"
import type { Meta, StoryObj } from "@storybook/react"
import data from "../../data/kanban"

interface TCard {
  id: number
  name: string
  description?: string
  completed: boolean
  daysLeft: number
  members: {
    id: number
    name: string
    src: string
  }[]
  attachment?: string
}

interface TColumn {
  id: string
  title: string
  cards: TCard[]
}

interface TBoard {
  columns: TColumn[]
}

const transformedData: TBoard = {
  columns: data.map(column => ({
    id: String(column.id),
    title: column.title,
    cards: column.tasks
  }))
}

const meta = {
  title: "molecules/Kanban-Board",
  component: Board,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Board>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initial: transformedData
  }
}