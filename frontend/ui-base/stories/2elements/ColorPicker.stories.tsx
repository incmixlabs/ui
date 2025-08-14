import type { Meta, StoryObj } from "@storybook/react-vite"
import "../../src/styles/index.css"
import React, { useState } from "react"
import { Theme, Box, Text, Flex, Button, Popover } from "../../src/1base"
import ColorPicker, { type ColorSelectType } from "../../src/2elements/color-picker"

const meta: Meta<typeof ColorPicker> = {
  title: "2 Elements/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    colorType: {
      control: "select",
      options: ["base", "all"],
      description: "Type of color palette to display",
    },
    activeColor: {
      control: "text",
      description: "Currently active/selected color",
    },
    onColorSelect: {
      action: "color-selected",
      description: "Callback when a color is selected",
    },
  },
  args: {
    colorType: "all",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with full color palette
export const Default: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType | null>(null)

    return (
      <Flex direction="column" gap="4" align="center">
        <ColorPicker
          onColorSelect={setSelectedColor}
          colorType="all"
          activeColor={selectedColor?.hex}
        />

        {selectedColor && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <Text size="2" weight="medium">
              Selected Color
            </Text>
            <Flex align="center" justify="center" gap="2" style={{ marginTop: "8px" }}>
              <Box
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  backgroundColor: selectedColor.hex,
                  border: "1px solid var(--gray-6)",
                }}
              />
              <Text size="2" family="mono">
                {selectedColor.hex}
              </Text>
            </Flex>
            {selectedColor.name && (
              <Text size="1" color="gray" style={{ marginTop: "4px" }}>
                {selectedColor.name}
              </Text>
            )}
          </Box>
        )}
      </Flex>
    )
  },
}

// Base colors only
export const BaseColors: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType | null>(null)

    return (
      <Flex direction="column" gap="4" align="center">
        <ColorPicker
          onColorSelect={setSelectedColor}
          colorType="base"
          activeColor={selectedColor?.name}
        />

        {selectedColor && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <Text size="2" weight="medium">
              Selected Base Color
            </Text>
            <Flex align="center" justify="center" gap="2" style={{ marginTop: "8px" }}>
              <Box
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  backgroundColor: selectedColor.hex,
                  border: "1px solid var(--gray-6)",
                }}
              />
              <Text size="2" family="mono">
                {selectedColor.hex}
              </Text>
            </Flex>
            {selectedColor.name && (
              <Text size="1" color="gray" style={{ marginTop: "4px" }}>
                {selectedColor.name}
              </Text>
            )}
          </Box>
        )}
      </Flex>
    )
  },
}

// With pre-selected color
export const WithPreselectedColor: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType>({
      hex: "var(--blue-9)",
      name: "blue"
    })

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Color Picker with Pre-selected Blue
        </Text>

        <ColorPicker
          onColorSelect={setSelectedColor}
          colorType="all"
          activeColor={selectedColor.hex}
        />

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "200px",
          }}
        >
          <Text size="2" weight="medium">
            Current Selection
          </Text>
          <Flex align="center" justify="center" gap="2" style={{ marginTop: "8px" }}>
            <Box
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                backgroundColor: selectedColor.hex,
                border: "1px solid var(--gray-6)",
              }}
            />
            <Text size="2" family="mono">
              {selectedColor.hex}
            </Text>
          </Flex>
        </Box>
      </Flex>
    )
  },
}

// In a popover/dropdown context
export const InPopover: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType>({
      hex: "#3B82F6",
      name: "blue"
    })

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Color Picker in Popover
        </Text>

        <Popover.Root>
          <Popover.Trigger>
            <Button
              variant="outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
              }}
            >
              <Box
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  backgroundColor: selectedColor.hex,
                  border: "1px solid var(--gray-6)",
                }}
              />
              <Text size="2">
                Choose Color
              </Text>
            </Button>
          </Popover.Trigger>

          <Popover.Content
            width="320px"
            style={{ padding: "8px" }}
          >
            <ColorPicker
              onColorSelect={setSelectedColor}
              colorType="all"
              activeColor={selectedColor.hex}
            />
          </Popover.Content>
        </Popover.Root>

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "200px",
          }}
        >
          <Text size="2" weight="medium">
            Selected: {selectedColor.hex}
          </Text>
          {selectedColor.name && (
            <Text size="1" color="gray">
              ({selectedColor.name})
            </Text>
          )}
        </Box>
      </Flex>
    )
  },
}

// Comparison between base and all color types
export const ColorTypeComparison: Story = {
  render: () => {
    const [baseColor, setBaseColor] = useState<ColorSelectType | null>(null)
    const [allColor, setAllColor] = useState<ColorSelectType | null>(null)

    return (
      <Flex direction="column" gap="6" align="center">
        <Text size="4" weight="bold">
          Color Picker Type Comparison
        </Text>

        <Flex gap="8" wrap="wrap" justify="center">
          {/* Base Colors */}
          <Flex direction="column" gap="4" align="center">
            <Text size="3" weight="medium">
              Base Colors (colorType="base")
            </Text>

            <ColorPicker
              onColorSelect={setBaseColor}
              colorType="base"
              activeColor={baseColor?.name}
            />

            <Box
              style={{
                padding: "8px",
                borderRadius: "6px",
                backgroundColor: "var(--gray-2)",
                textAlign: "center",
                minWidth: "160px",
                height: "60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {baseColor ? (
                <>
                  <Box
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "3px",
                      backgroundColor: baseColor.hex,
                      border: "1px solid var(--gray-6)",
                      margin: "0 auto 4px",
                    }}
                  />
                  <Text size="1" family="mono">
                    {baseColor.name}
                  </Text>
                </>
              ) : (
                <Text size="1" color="gray">
                  No selection
                </Text>
              )}
            </Box>
          </Flex>

          {/* All Colors */}
          <Flex direction="column" gap="4" align="center">
            <Text size="3" weight="medium">
              All Colors (colorType="all")
            </Text>

            <ColorPicker
              onColorSelect={setAllColor}
              colorType="all"
              activeColor={allColor?.hex}
            />

            <Box
              style={{
                padding: "8px",
                borderRadius: "6px",
                backgroundColor: "var(--gray-2)",
                textAlign: "center",
                minWidth: "160px",
                height: "60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {allColor ? (
                <>
                  <Box
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "3px",
                      backgroundColor: allColor.hex,
                      border: "1px solid var(--gray-6)",
                      margin: "0 auto 4px",
                    }}
                  />
                  <Text size="1" family="mono">
                    {allColor.hex}
                  </Text>
                </>
              ) : (
                <Text size="1" color="gray">
                  No selection
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    )
  },
}

// Theme editor example
export const ThemeEditor: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = useState<ColorSelectType>({
      hex: "var(--blue-9)",
      name: "blue"
    })
    const [secondaryColor, setSecondaryColor] = useState<ColorSelectType>({
      hex: "var(--gray-6)",
      name: "gray"
    })
    const [accentColor, setAccentColor] = useState<ColorSelectType>({
      hex: "var(--orange-9)",
      name: "orange"
    })

    return (
      <Flex direction="column" gap="6" style={{ maxWidth: "600px" }}>
        <Text size="5" weight="bold" style={{ textAlign: "center" }}>
          Theme Color Editor
        </Text>

        <Flex direction="column" gap="4">
          {/* Primary Color */}
          <Box style={{ padding: "16px", backgroundColor: "var(--gray-2)", borderRadius: "8px" }}>
            <Flex justify="between" align="center" style={{ marginBottom: "12px" }}>
              <Text size="3" weight="medium">Primary Color</Text>
              <Flex align="center" gap="2">
                <Box
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    backgroundColor: primaryColor.hex,
                    border: "1px solid var(--gray-6)",
                  }}
                />
                <Text size="2" family="mono">{primaryColor.hex}</Text>
              </Flex>
            </Flex>
            <ColorPicker
              onColorSelect={setPrimaryColor}
              colorType="base"
              activeColor={primaryColor.name}
            />
          </Box>

          {/* Secondary Color */}
          <Box style={{ padding: "16px", backgroundColor: "var(--gray-2)", borderRadius: "8px" }}>
            <Flex justify="between" align="center" style={{ marginBottom: "12px" }}>
              <Text size="3" weight="medium">Secondary Color</Text>
              <Flex align="center" gap="2">
                <Box
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    backgroundColor: secondaryColor.hex,
                    border: "1px solid var(--gray-6)",
                  }}
                />
                <Text size="2" family="mono">{secondaryColor.hex}</Text>
              </Flex>
            </Flex>
            <ColorPicker
              onColorSelect={setSecondaryColor}
              colorType="all"
              activeColor={secondaryColor.hex}
            />
          </Box>

          {/* Accent Color */}
          <Box style={{ padding: "16px", backgroundColor: "var(--gray-2)", borderRadius: "8px" }}>
            <Flex justify="between" align="center" style={{ marginBottom: "12px" }}>
              <Text size="3" weight="medium">Accent Color</Text>
              <Flex align="center" gap="2">
                <Box
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    backgroundColor: accentColor.hex,
                    border: "1px solid var(--gray-6)",
                  }}
                />
                <Text size="2" family="mono">{accentColor.hex}</Text>
              </Flex>
            </Flex>
            <ColorPicker
              onColorSelect={setAccentColor}
              colorType="base"
              activeColor={accentColor.name}
            />
          </Box>
        </Flex>

        {/* Preview */}
        <Box
          style={{
            padding: "20px",
            backgroundColor: "var(--gray-1)",
            borderRadius: "8px",
            border: "1px solid var(--gray-6)",
          }}
        >
          <Text size="3" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Theme Preview
          </Text>
          <Flex gap="3">
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: primaryColor.hex,
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Primary Button
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: `1px solid ${secondaryColor.hex}`,
                backgroundColor: "transparent",
                color: secondaryColor.hex,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Secondary Button
            </button>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: accentColor.hex,
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Accent Button
            </button>
          </Flex>
        </Box>
      </Flex>
    )
  },
}

// Interactive playground
export const InteractivePlayground: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType | null>(null)
    const [colorType, setColorType] = useState<"base" | "all">("all")
    const [showDetails, setShowDetails] = useState(false)

    return (
      <Flex direction="column" gap="4" align="center" style={{ maxWidth: "400px" }}>
        <Text size="4" weight="bold">
          Interactive Color Picker
        </Text>

        {/* Controls */}
        <Flex gap="2">
          <Button
            variant={colorType === "base" ? "solid" : "outline"}
            size="sm"
            onClick={() => setColorType("base")}
          >
            Base Colors
          </Button>
          <Button
            variant={colorType === "all" ? "solid" : "outline"}
            size="sm"
            onClick={() => setColorType("all")}
          >
            All Colors
          </Button>
        </Flex>

        {/* Color Picker */}
        <ColorPicker
          onColorSelect={setSelectedColor}
          colorType={colorType}
          activeColor={colorType === "base" ? selectedColor?.name : selectedColor?.hex}
        />

        {/* Selected Color Display */}
        {selectedColor && (
          <Box
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
            }}
          >
            <Flex align="center" justify="center" gap="3" style={{ marginBottom: "8px" }}>
              <Box
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  backgroundColor: selectedColor.hex,
                  border: "2px solid var(--gray-6)",
                }}
              />
              <Text size="3" weight="medium">
                Color Selected
              </Text>
            </Flex>

            <Text size="2" family="mono" style={{ marginBottom: "8px", display: "block" }}>
              {selectedColor.hex}
            </Text>

            {selectedColor.name && (
              <Text size="1" color="gray" style={{ marginBottom: "8px", display: "block" }}>
                Name: {selectedColor.name}
              </Text>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide" : "Show"} Details
            </Button>

            {showDetails && (
              <Box
                style={{
                  marginTop: "8px",
                  padding: "8px",
                  backgroundColor: "var(--gray-3)",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <Text size="1" family="mono">
                  Type: {colorType}<br/>
                  Hex: {selectedColor.hex}<br/>
                  {selectedColor.name && `Name: ${selectedColor.name}`}
                </Text>
              </Box>
            )}
          </Box>
        )}

        {!selectedColor && (
          <Text size="2" color="gray" style={{ textAlign: "center" }}>
            Click on a color to select it
          </Text>
        )}
      </Flex>
    )
  },
}
