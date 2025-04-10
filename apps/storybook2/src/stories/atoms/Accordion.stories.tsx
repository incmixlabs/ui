import { Accordion } from "@incmix/ui2/shadcn"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

type AccordionItem = {
  label: string
  content: string
}

// Wrapper component to handle single/multiple type in a way that matches the original story
const AccordionWrapper = ({
  items,
  type = "single",
}: {
  items: AccordionItem[]
  type?: "single" | "multiple"
}) => {
  const [singleValue, setSingleValue] = useState<string>("")
  const [multipleValue, setMultipleValue] = useState<string[]>([])

  // Conditionally render based on the type
  return type === "single" ? (
    <Accordion.Root
      type="single"
      collapsible
      value={singleValue}
      onValueChange={setSingleValue}
      className="w-full max-w-md"
    >
      {items.map((item, index) => (
        <Accordion.Item key={index} value={`item-${index}`}>
          <Accordion.Trigger>{item.label}</Accordion.Trigger>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ) : (
    <Accordion.Root
      type="multiple"
      value={multipleValue}
      onValueChange={setMultipleValue}
      className="w-full max-w-md"
    >
      {items.map((item, index) => (
        <Accordion.Item key={index} value={`item-${index}`}>
          <Accordion.Trigger>{item.label}</Accordion.Trigger>
          <Accordion.Content>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const meta: Meta<typeof AccordionWrapper> = {
  title: "Atoms/Accordion",
  component: AccordionWrapper,
  argTypes: {
    type: {
      control: { type: "select", options: ["single", "multiple"] },
    },
  },
}

export default meta
type Story = StoryObj<typeof AccordionWrapper>

const items: AccordionItem[] = [
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
