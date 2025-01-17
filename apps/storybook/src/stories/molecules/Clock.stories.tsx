import { useThemeStore } from "@incmix-fe/store"
import { type ClockSize, ClockWidget } from "@incmix-fe/ui/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ClockWidget> = {
  title: "Molecules/Clock",
  component: ClockWidget,
  parameters: {
    toolbar: {
      items: [
        {
          title: "Theme",
          icon: "circlehollow",
          onClick: () => {
            const { toggleTheme } = useThemeStore()
            toggleTheme()
          },
        },
      ],
    },
  },
  argTypes: {
    size: {
      control: { type: "select", options: ["1", "2", "3"] as ClockSize[] },
    },
  },
}

export default meta
type Story = StoryObj<typeof ClockWidget>

const sampleClocks = [
  { city: "New York", timeZone: "America/New_York" },
  { city: "London", timeZone: "Europe/London" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
]

export const Single: Story = {
  args: {
    clocks: [sampleClocks[0]],
    size: "2",
  },
}

export const Multiple: Story = {
  args: {
    clocks: sampleClocks,
    size: "2",
  },
}

export const Small: Story = {
  args: {
    clocks: [sampleClocks[0]],
    size: "1",
  },
}

export const Large: Story = {
  args: {
    clocks: [sampleClocks[0]],
    size: "3",
  },
}

export const Flip: Story = {
  args: {
    clocks: [sampleClocks[0]],
    size: "2",
    flip: true,
  },
}
