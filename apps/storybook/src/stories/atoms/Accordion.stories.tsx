import { Accordion, type AccordionItems } from "@incmix-fe/ui"
import type { Meta, StoryObj } from "@storybook/react"
const types = ["single", "multiple"]

const meta: Meta<typeof Accordion> = {
  title: "Atoms/Accordion",
  component: Accordion,
  argTypes: {
    type: {
      control: { type: "select", options: types },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

const items: AccordionItems[] = [
  { label: "Item 1", content: "Content 1" },
  { label: "Item 2", content: "Content 2" },
  { label: "Item 3", content: "Content 3" },
  { label: "Item 4", content: "Content 4" },
  { label: "Item 5", content: "Content 5" },
]

export const AccordionSingle: Story = {
  args: {
    items,
    type: "single",
  },
}
export const AccordionMultiple: Story = {
  args: {
    items,
    type: "multiple",
  },
}
