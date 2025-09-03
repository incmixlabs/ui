import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Button, Theme } from "../../src/1base"
import SplitButton from "../../src/1base/radix-ui/button/split-button"
import { FileText, Copy, Trash2, Download } from "lucide-react"

const meta: Meta<typeof Button> = {
  title:"1 Base/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["classic", "solid", "soft", "surface", "outline", "ghost"],
      description: "Button variant style",
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
      description: "Button size",
    },
    color: {
      control: "select",
      options: [
        "gray",
        "gold",
        "bronze",
        "brown",
        "yellow",
        "amber",
        "orange",
        "tomato",
        "red",
        "ruby",
        "crimson",
        "pink",
        "plum",
        "purple",
        "violet",
        "iris",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "jade",
        "green",
        "grass",
        "lime",
        "mint",
        "sky",
      ],
      description: "Button accent color",
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
      description: "Button border radius",
    },
    loading: {
      control: "boolean",
      description: "Loading state with spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
  args: {
    children: "Button",
    variant: "solid",
    size: "2",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "Default Button",
  },
}

// Variant stories
export const Classic: Story = {
  args: {
    variant: "classic",
    children: "Classic Button",
  },
}

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Solid Button",
  },
}

export const Soft: Story = {
  args: {
    variant: "soft",
    children: "Soft Button",
  },
}

export const Surface: Story = {
  args: {
    variant: "surface",
    children: "Surface Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
    children: "Size 1",
  },
}

export const Size2: Story = {
  args: {
    size: "2",
    children: "Size 2",
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    children: "Size 3",
  },
}

export const Size4: Story = {
  args: {
    size: "4",
    children: "Size 4",
  },
}

// Color stories
export const ColorBlue: Story = {
  args: {
    color: "blue",
    children: "Blue Button",
  },
}

export const ColorRed: Story = {
  args: {
    color: "red",
    children: "Red Button",
  },
}

export const ColorGreen: Story = {
  args: {
    color: "green",
    children: "Green Button",
  },
}

export const ColorPurple: Story = {
  args: {
    color: "purple",
    children: "Purple Button",
  },
}

// State stories
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading Button",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
}

export const HighContrast: Story = {
  args: {
    highContrast: true,
    children: "High Contrast",
  },
}

// Radius stories
export const RadiusNone: Story = {
  args: {
    radius: "none",
    children: "No Radius",
  },
}

export const RadiusSmall: Story = {
  args: {
    radius: "small",
    children: "Small Radius",
  },
}

export const RadiusMedium: Story = {
  args: {
    radius: "medium",
    children: "Medium Radius",
  },
}

export const RadiusLarge: Story = {
  args: {
    radius: "large",
    children: "Large Radius",
  },
}

export const RadiusFull: Story = {
  args: {
    radius: "full",
    children: "Full Radius",
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button variant="classic">Classic</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Button size="1">Size 1</Button>
      <Button size="2">Size 2</Button>
      <Button size="3">Size 3</Button>
      <Button size="4">Size 4</Button>
    </div>
  ),
}

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "8px",
      }}
    >
      {[
        "gray",
        "gold",
        "bronze",
        "brown",
        "yellow",
        "amber",
        "orange",
        "tomato",
        "red",
        "ruby",
        "crimson",
        "pink",
        "plum",
        "purple",
        "violet",
        "iris",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "jade",
        "green",
        "grass",
        "lime",
        "mint",
        "sky",
      ].map((color) => (
        <Button key={color} color={color as any} size="1">
          {color}
        </Button>
      ))}
    </div>
  ),
}

// Complex example with real-world usage
export const RealWorldExample: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button variant="solid" color="blue">
        Save Changes
      </Button>
      <Button variant="outline" color="gray">
        Cancel
      </Button>
      <Button variant="ghost" color="red">
        Delete
      </Button>
      <Button variant="soft" color="green" loading>
        Processing...
      </Button>
    </div>
  ),
}

// Split Button stories
export const SplitButtonDefault: Story = {
  render: () => (
    <SplitButton
      button={{
        children: "Create New",
        onClick: () => console.log("Main button clicked")
      }}
      items={[
        {
          children: (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Create Draft
            </>
          ),
          onClick: () => console.log("Create Draft")
        },
        {
          children: (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </>
          ),
          onClick: () => console.log("Duplicate")
        },
        {
          children: (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export
            </>
          ),
          onClick: () => console.log("Export")
        },
        {
          children: (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </>
          ),
          className: "text-red-600",
          onClick: () => console.log("Delete")
        },
      ]}
    />
  ),
}

export const SplitButtonLeftSide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <SplitButton
        splitLeft={true}
        button={{
          children: "Actions on Left",
          onClick: () => console.log("Main button clicked")
        }}
        variant="solid"
        items={[
          { children: "Option 1", onClick: () => console.log("Option 1") },
          { children: "Option 2", onClick: () => console.log("Option 2") },
          { children: "Option 3", onClick: () => console.log("Option 3") },
        ]}
      />
      <SplitButton
        splitLeft={false}
        button={{
          children: "Actions on Right",
          onClick: () => console.log("Main button clicked")
        }}
        variant="outline"
        items={[
          { children: "Option 1", onClick: () => console.log("Option 1") },
          { children: "Option 2", onClick: () => console.log("Option 2") },
          { children: "Option 3", onClick: () => console.log("Option 3") },
        ]}
      />
    </div>
  ),
}

export const SplitButtonSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <SplitButton
        size="1"
        button={{
          children: "Size 1",
          onClick: () => console.log("Size 1 clicked")
        }}
        items={[
          { children: "Option 1", onClick: () => console.log("Option 1") },
          { children: "Option 2", onClick: () => console.log("Option 2") },
          { children: "Option 3", onClick: () => console.log("Option 3") },
        ]}
      />
      <SplitButton
        size="2"
        button={{
          children: "Size 2",
          onClick: () => console.log("Size 2 clicked")
        }}
        items={[
          { children: "Option 1", onClick: () => console.log("Option 1") },
          { children: "Option 2", onClick: () => console.log("Option 2") },
          { children: "Option 3", onClick: () => console.log("Option 3") },
        ]}
      />
      <SplitButton
        size="3"
        button={{
          children: "Size 3",
          onClick: () => console.log("Size 3 clicked")
        }}
        items={[
          { children: "Option 1", onClick: () => console.log("Option 1") },
          { children: "Option 2", onClick: () => console.log("Option 2") },
          { children: "Option 3", onClick: () => console.log("Option 3") },
        ]}
      />
    </div>
  ),
}

export const SplitButtonVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <SplitButton
        variant="solid"
        color="blue"
        button={{
          children: "Solid"
        }}
        items={[
          { children: "Action 1" },
          { children: "Action 2" },
          { children: "Action 3" },
        ]}
      />
      <SplitButton
        variant="soft"
        color="green"
        button={{
          children: "Soft",
        }}
        items={[
          { children: "Action 1" },
          { children: "Action 2" },
          { children: "Action 3" },
        ]}
      />
      <SplitButton
        variant="outline"
        button={{
          children: "Outline"
        }}
        items={[
          { children: "Action 1" },
          { children: "Action 2" },
          { children: "Action 3" },
        ]}
      />
      <SplitButton
        variant="ghost"
        button={{
          children: "Ghost"
        }}
        items={[
          { children: "Action 1" },
          { children: "Action 2" },
          { children: "Action 3" },
        ]}
      />
    </div>
  ),
}
