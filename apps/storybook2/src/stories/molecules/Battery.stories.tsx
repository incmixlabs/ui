import { Battery, BatteryWidget } from "@incmix/ui/widgets"
import { Box } from "@incmix/ui2"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Battery> = {
  title: "Molecules/Battery",
  component: Battery,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="p-4">
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Battery>

export const LowBattery: Story = {
  args: {
    batteryInfo: {
      level: 0.1,
      charging: false,
      chargingTime: 0,
      dischargingTime: 600,
    },
  },
}

export const MediumBattery: Story = {
  args: {
    batteryInfo: {
      level: 0.2,
      charging: false,
      chargingTime: 0,
      dischargingTime: 600,
    },
  },
}

export const HalfBattery: Story = {
  args: {
    batteryInfo: {
      level: 0.5,
      charging: false,
      chargingTime: 0,
      dischargingTime: 600,
    },
  },
}

export const FullBattery: Story = {
  args: {
    batteryInfo: {
      level: 1,
      charging: false,
      chargingTime: 0,
      dischargingTime: 3600,
    },
  },
}

export const ChargingBattery: Story = {
  args: {
    batteryInfo: {
      level: 0.6,
      charging: true,
      chargingTime: 1800,
      dischargingTime: 0,
    },
  },
}

export const NoBattery: Story = {
  args: {
    batteryInfo: null,
  },
}

export const LiveBattery: StoryObj<typeof BatteryWidget> = {
  render: () => <BatteryWidget />,
}
