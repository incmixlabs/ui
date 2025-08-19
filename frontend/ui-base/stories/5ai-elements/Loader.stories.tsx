import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Loader } from "../../src/3b-ai-elements/loader"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Loader> = {
  title: "5 AI Elements/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "40px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    size: {
      control: "number",
      description: "Size of the loader icon",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 16,
  },
}

export const Small: Story = {
  args: {
    size: 12,
  },
}

export const Medium: Story = {
  args: {
    size: 24,
  },
}

export const Large: Story = {
  args: {
    size: 32,
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 48,
  },
}

export const InText: Story = {
  render: () => (
    <div className="text-lg">
      Loading your data <Loader size={20} className="inline-block mx-1" /> please wait...
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
      <Loader size={16} />
      Processing...
    </button>
  ),
}

export const ColorVariations: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} className="text-blue-500" />
        <span className="text-sm text-muted-foreground">Blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} className="text-green-500" />
        <span className="text-sm text-muted-foreground">Green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} className="text-red-500" />
        <span className="text-sm text-muted-foreground">Red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} className="text-purple-500" />
        <span className="text-sm text-muted-foreground">Purple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Muted</span>
      </div>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 border rounded-lg">
        <Loader size={16} />
        <span>Connecting to server...</span>
      </div>

      <div className="flex items-center gap-3 p-4 border rounded-lg">
        <Loader size={16} className="text-blue-500" />
        <span>Analyzing your code...</span>
      </div>

      <div className="flex items-center gap-3 p-4 border rounded-lg">
        <Loader size={16} className="text-green-500" />
        <span>Generating response...</span>
      </div>

      <div className="flex items-center gap-3 p-4 border rounded-lg">
        <Loader size={16} className="text-purple-500" />
        <span>Processing request...</span>
      </div>
    </div>
  ),
}
