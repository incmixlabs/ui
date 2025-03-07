import { KanbanView } from "@incmix/ui/kanban-view"
import type { Meta, StoryObj } from "@storybook/react"
import data from "../../data/kanban"
import { KanbanBoard } from "@incmix/ui";



const meta: Meta<typeof KanbanView> = {
  title: "Pages/KanbanView",
  component: KanbanView,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof KanbanView>
const tasks = data[0].tasks

export const All: Story = {
  render: () => {
    return (
      <>
   
        <KanbanBoard/>
      </>
    )
  },
}