import {
  FlowCard as Card,
  type FlowCardProps as CardProps,
} from "@incmix/ui2/card/flow-card"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Atoms/Card",
  component: Card,
  argTypes: {
    className: {
      description: "Example description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bar" },
      },
      control: "text",
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// @see https://storybook.js.org/docs/react/writing-stories/args

export const All: Story = {
  render: () => {
    return (
      <>
        <Card horizontal={true}>
          <h5 className="font-bold text-2xl text-gray-900 tracking-tight dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
        <Card imgSrc="/images/blogs/image-1.jpg" />
        <Card imgAlt="Blog Image" imgSrc="/images/blogs/image-2.jpg" />
      </>
    )
  },
}
