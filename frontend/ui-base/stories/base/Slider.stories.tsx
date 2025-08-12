import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex, Slider, Text, Theme } from "../../src/base"

const meta: Meta<typeof Slider> = {
  title:"Base/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "300px", padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3"],
      description: "Slider size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface", "soft"],
      description: "Slider variant style",
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
      description: "Slider accent color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    defaultValue: {
      control: "object",
      description: "Default value(s)",
    },
  },
  args: {
    size: "2",
    variant: "surface",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Default Slider
      </Text>
      <Slider {...args} />
    </div>
  ),
}

// Size stories
export const Size1: Story = {
  render: (_args) => (
    <div>
      <Text size="1" style={{ marginBottom: "8px", display: "block" }}>
        Size 1 (Small)
      </Text>
      <Slider size="1" defaultValue={[25]} />
    </div>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "10px", display: "block" }}>
        Size 2 (Default)
      </Text>
      <Slider size="2" defaultValue={[50]} />
    </div>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <div>
      <Text size="3" style={{ marginBottom: "12px", display: "block" }}>
        Size 3 (Large)
      </Text>
      <Slider size="3" defaultValue={[75]} />
    </div>
  ),
}

// Variant stories
export const Classic: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Classic Variant
      </Text>
      <Slider variant="classic" defaultValue={[60]} />
    </div>
  ),
}

export const Surface: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Surface Variant
      </Text>
      <Slider variant="surface" defaultValue={[60]} />
    </div>
  ),
}

export const Soft: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Soft Variant
      </Text>
      <Slider variant="soft" defaultValue={[60]} />
    </div>
  ),
}

// Range slider
export const RangeSlider: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Range Slider (Multiple Values)
      </Text>
      <Slider defaultValue={[25, 75]} />
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: (_args) => (
    <div>
      <Text
        size="2"
        style={{ marginBottom: "12px", display: "block", opacity: "0.6" }}
      >
        Disabled Slider
      </Text>
      <Slider disabled defaultValue={[40]} />
    </div>
  ),
}

// Color stories
export const ColorBlue: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Blue Color
      </Text>
      <Slider color="blue" defaultValue={[70]} />
    </div>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Red Color
      </Text>
      <Slider color="red" defaultValue={[70]} />
    </div>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Green Color
      </Text>
      <Slider color="green" defaultValue={[70]} />
    </div>
  ),
}

export const ColorPurple: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Purple Color
      </Text>
      <Slider color="purple" defaultValue={[70]} />
    </div>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        High Contrast Mode
      </Text>
      <Slider highContrast defaultValue={[60]} />
    </div>
  ),
}

// Custom range and step
export const CustomRange: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Custom Range (0-1000, step: 50)
      </Text>
      <Slider min={0} max={1000} step={50} defaultValue={[500]} />
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="1" style={{ marginBottom: "8px", display: "block" }}>
          Size 1
        </Text>
        <Slider size="1" defaultValue={[30]} />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "10px", display: "block" }}>
          Size 2
        </Text>
        <Slider size="2" defaultValue={[50]} />
      </div>
      <div>
        <Text size="3" style={{ marginBottom: "12px", display: "block" }}>
          Size 3
        </Text>
        <Slider size="3" defaultValue={[70]} />
      </div>
    </Flex>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Classic
        </Text>
        <Slider variant="classic" defaultValue={[40]} />
      </div>
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Surface
        </Text>
        <Slider variant="surface" defaultValue={[60]} />
      </div>
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Soft
        </Text>
        <Slider variant="soft" defaultValue={[80]} />
      </div>
    </Flex>
  ),
}

// Volume control example
export const VolumeControlExample: Story = {
  render: () => {
    const [volume, setVolume] = React.useState([75])

    return (
      <div style={{ maxWidth: "250px" }}>
        <Flex align="center" gap="3" style={{ marginBottom: "16px" }}>
          <Text size="2" weight="bold">
            🔊
          </Text>
          <Text size="2" weight="medium">
            Volume
          </Text>
          <Text size="1" color="gray">
            {volume[0]}%
          </Text>
        </Flex>
        <Slider
          value={volume}
          onValueChange={setVolume}
          color="blue"
          size="2"
        />
      </div>
    )
  },
}

// Settings panel example
export const SettingsPanelExample: Story = {
  render: () => {
    const [brightness, setBrightness] = React.useState([80])
    const [contrast, setContrast] = React.useState([60])
    const [saturation, setSaturation] = React.useState([90])

    return (
      <div style={{ maxWidth: "300px" }}>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "20px", display: "block" }}
        >
          Display Settings
        </Text>

        <Flex direction="column" gap="4">
          <div>
            <Flex
              justify="between"
              align="center"
              style={{ marginBottom: "8px" }}
            >
              <Text size="2">Brightness</Text>
              <Text size="1" color="gray">
                {brightness[0]}%
              </Text>
            </Flex>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              color="yellow"
              size="2"
            />
          </div>

          <div>
            <Flex
              justify="between"
              align="center"
              style={{ marginBottom: "8px" }}
            >
              <Text size="2">Contrast</Text>
              <Text size="1" color="gray">
                {contrast[0]}%
              </Text>
            </Flex>
            <Slider
              value={contrast}
              onValueChange={setContrast}
              color="purple"
              size="2"
            />
          </div>

          <div>
            <Flex
              justify="between"
              align="center"
              style={{ marginBottom: "8px" }}
            >
              <Text size="2">Saturation</Text>
              <Text size="1" color="gray">
                {saturation[0]}%
              </Text>
            </Flex>
            <Slider
              value={saturation}
              onValueChange={setSaturation}
              color="green"
              size="2"
            />
          </div>
        </Flex>
      </div>
    )
  },
}

// Price range filter example
export const PriceRangeExample: Story = {
  render: () => {
    const [priceRange, setPriceRange] = React.useState([200, 800])

    return (
      <div style={{ maxWidth: "350px" }}>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "16px", display: "block" }}
        >
          Price Filter
        </Text>

        <Flex justify="between" align="center" style={{ marginBottom: "12px" }}>
          <Text size="2" weight="medium">
            Price Range
          </Text>
          <Text size="2" color="gray">
            ${priceRange[0]} - ${priceRange[1]}
          </Text>
        </Flex>

        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
          color="blue"
          size="2"
        />

        <Flex justify="between" style={{ marginTop: "8px" }}>
          <Text size="1" color="gray">
            $0
          </Text>
          <Text size="1" color="gray">
            $1,000
          </Text>
        </Flex>
      </div>
    )
  },
}

// Interactive color mixer example
export const ColorMixerExample: Story = {
  render: () => {
    const [red, setRed] = React.useState([255])
    const [green, setGreen] = React.useState([128])
    const [blue, setBlue] = React.useState([0])

    const colorStyle = {
      backgroundColor: `rgb(${red[0]}, ${green[0]}, ${blue[0]})`,
      width: "100%",
      height: "60px",
      borderRadius: "6px",
      border: "2px solid #e1e5e9",
      marginBottom: "16px",
    }

    return (
      <div style={{ maxWidth: "280px" }}>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "16px", display: "block" }}
        >
          Color Mixer
        </Text>

        <div style={colorStyle} />

        <Flex direction="column" gap="3">
          <div>
            <Flex
              justify="between"
              align="center"
              style={{ marginBottom: "8px" }}
            >
              <Text size="2" color="red">
                Red
              </Text>
              <Text size="1" color="gray">
                {red[0]}
              </Text>
            </Flex>
            <Slider
              value={red}
              onValueChange={setRed}
              min={0}
              max={255}
              color="red"
              size="1"
            />
          </div>

          <div>
            <Flex
              justify="between"
              align="center"
              style={{ marginBottom: "8px" }}
            >
              <Text size="2" color="green">
                Green
              </Text>
              <Text size="1" color="gray">
                {green[0]}
              </Text>
            </Flex>
            <Slider
              value={green}
              onValueChange={setGreen}
              min={0}
              max={255}
              color="green"
              size="1"
            />
          </div>

          <div>
            <Flex
              justify="between"
              align="center"
              style={{ marginBottom: "8px" }}
            >
              <Text size="2" color="blue">
                Blue
              </Text>
              <Text size="1" color="gray">
                {blue[0]}
              </Text>
            </Flex>
            <Slider
              value={blue}
              onValueChange={setBlue}
              min={0}
              max={255}
              color="blue"
              size="1"
            />
          </div>
        </Flex>

        <Text
          size="1"
          color="gray"
          style={{ marginTop: "12px", textAlign: "center", display: "block" }}
        >
          RGB({red[0]}, {green[0]}, {blue[0]})
        </Text>
      </div>
    )
  },
}
