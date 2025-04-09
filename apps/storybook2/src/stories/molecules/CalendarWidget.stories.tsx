import { Box } from "@incmix/ui2"
import { CalendarWidget } from "@incmix/ui2/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof CalendarWidget> = {
  title: "Molecules/CalendarWidget",
  component: CalendarWidget,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="max-w-3xl p-4">
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CalendarWidget>

export const Default: Story = {
  args: {
    storageKey: "storybook",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A calendar widget that persists events to localStorage. Events will remain even after page refresh. Try adding, editing, and removing events, then refresh the page to see the persistence in action.",
      },
    },
  },
}
