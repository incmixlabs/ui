import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Theme, Box, Text, Flex } from "../../src/1base"
import { TagSelect, type Option } from "../../src/2elements/multi-select"
import { Loader2 } from "lucide-react"

const meta: Meta<typeof TagSelect> = {
  title: "2 Elements/TagSelect",
  component: TagSelect,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px", minWidth: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when no options are selected",
    },
    disabled: {
      control: "boolean",
      description: "Disable the component",
    },
    creatable: {
      control: "boolean",
      description: "Allow creating new options",
    },
    maxSelected: {
      control: "number",
      description: "Maximum number of options that can be selected",
    },
    hidePlaceholderWhenSelected: {
      control: "boolean",
      description: "Hide placeholder when options are selected",
    },
    hideClearAllButton: {
      control: "boolean",
      description: "Hide the clear all button",
    },
    defaultColor: {
      control: "select",
      options: ["gray", "indigo", "cyan", "orange", "crimson"],
      description: "Default color theme for selected badges",
    },
  },
  args: {
    placeholder: "Select options...",
    disabled: false,
    creatable: false,
    maxSelected: undefined,
    hidePlaceholderWhenSelected: false,
    hideClearAllButton: false,
    defaultColor: "crimson",
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions: Option[] = [
  {
    value: "frontend",
    label: "Frontend Development",
  },
  {
    value: "backend",
    label: "Backend Development",
  },
  {
    value: "design",
    label: "UI/UX Design",
  },
  {
    value: "marketing",
    label: "Digital Marketing",
  },
  {
    value: "devops",
    label: "DevOps Engineering",
  },
  {
    value: "mobile",
    label: "Mobile Development",
  },
]

const teamOptions: Option[] = [
  {
    value: "john-doe",
    label: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    color: "indigo",
  },
  {
    value: "jane-smith",
    label: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
  },
  {
    value: "mike-johnson",
    label: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    color: "orange",
  },
  {
    value: "sarah-wilson",
    label: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "crimson",
  },
]

const groupedOptions: Option[] = [
  {
    value: "frontend-react",
    label: "React Developer",
    department: "Engineering",
  },
  {
    value: "frontend-vue",
    label: "Vue Developer",
    department: "Engineering",
  },
  {
    value: "backend-node",
    label: "Node.js Developer",
    department: "Engineering",
  },
  {
    value: "designer-ui",
    label: "UI Designer",
    department: "Design",
  },
  {
    value: "designer-ux",
    label: "UX Designer",
    department: "Design",
  },
  {
    value: "marketing-digital",
    label: "Digital Marketer",
    department: "Marketing",
  },
  {
    value: "marketing-content",
    label: "Content Marketer",
    department: "Marketing",
  },
]

const coloredSkillsOptions: Option[] = [
  {
    value: "frontend",
    label: "Frontend Development",
    color: "cyan",
  },
  {
    value: "backend", 
    label: "Backend Development",
    color: "indigo",
  },
  {
    value: "design",
    label: "UI/UX Design", 
    color: "orange",
  },
  {
    value: "marketing",
    label: "Digital Marketing",
    color: "crimson",
  },
  {
    value: "devops",
    label: "DevOps Engineering",
    color: "gray",
  },
]

// Default story
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <TagSelect
          options={sampleOptions}
          onChange={setSelected}
          placeholder="Select skills..."
        />

        {selected.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <Text size="2" weight="medium">
              Selected Skills ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With default selections
export const WithDefaultSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([
      sampleOptions[0],
      sampleOptions[2],
    ])

    return (
      <Flex direction="column" gap="4" align="center">
        <TagSelect
          options={sampleOptions}
          value={selected}
          onChange={setSelected}
          placeholder="Modify your selection..."
        />

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <Text size="2" weight="medium">
            Current Selection:
          </Text>
          <Text size="2" color="gray">
            {selected.map(s => s.label).join(", ")}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// With custom colors per tag
export const WithCustomColors: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Each skill has a custom color
        </Text>
        
        <TagSelect
          options={coloredSkillsOptions}
          onChange={setSelected}
          placeholder="Select skills with custom colors..."
        />

        {selected.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <Text size="2" weight="medium">
              Selected Skills ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With avatars and custom defaultColor
export const WithAvatars: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Team members with individual colors + gray default
        </Text>
        
        <TagSelect
          options={teamOptions}
          onChange={setSelected}
          placeholder="Select team members..."
          defaultColor="gray"
        />

        {selected.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <Text size="2" weight="medium">
              Team Members ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With grouping
export const WithGrouping: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <TagSelect
          options={groupedOptions}
          onChange={setSelected}
          groupBy="department"
          placeholder="Select roles by department..."
        />

        {selected.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <Text size="2" weight="medium">
              Selected Roles:
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Creatable options
export const CreatableOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Type to create new options
        </Text>

        <TagSelect
          options={sampleOptions}
          onChange={setSelected}
          creatable={true}
          placeholder="Select or create new skills..."
        />

        {selected.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <Text size="2" weight="medium">
              Skills ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With maximum selections
export const WithMaxSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])
    const maxSelected = 3

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Maximum {maxSelected} selections allowed
        </Text>

        <TagSelect
          options={sampleOptions}
          onChange={setSelected}
          maxSelected={maxSelected}
          onMaxSelected={(max) => alert(`Maximum ${max} selections reached!`)}
          placeholder="Select up to 3 skills..."
        />

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <Text size="2" weight="medium">
            Selected: {selected.length} / {maxSelected}
          </Text>
          <Text size="2" color="gray">
            {selected.map(s => s.label).join(", ") || "None selected"}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// With async search
export const WithAsyncSearch: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])

    const handleAsyncSearch = async (searchTerm: string): Promise<Option[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const filteredOptions = sampleOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return filteredOptions
    }

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Search with 1 second delay
        </Text>

        <TagSelect
          onChange={setSelected}
          onSearch={handleAsyncSearch}
          placeholder="Type to search skills..."
          loadingIndicator={
            <div style={{ padding: "20px", textAlign: "center" }}>
              <Loader2 className="animate-spin" size={20} />
              <Text size="2" color="gray" style={{ marginTop: "8px" }}>
                Searching...
              </Text>
            </div>
          }
          emptyIndicator={
            <Text size="2" color="gray">
              No skills found
            </Text>
          }
        />

        {selected.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <Text size="2" weight="medium">
              Search Results ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Different color themes
export const ColorThemes: Story = {
  render: () => {
    const [graySelected, setGraySelected] = useState<Option[]>([sampleOptions[0]])
    const [indigoSelected, setIndigoSelected] = useState<Option[]>([sampleOptions[1]])
    const [cyanSelected, setCyanSelected] = useState<Option[]>([sampleOptions[2]])
    const [orangeSelected, setOrangeSelected] = useState<Option[]>([sampleOptions[3]])
    const [crimsonSelected, setCrimsonSelected] = useState<Option[]>([sampleOptions[4]])

    return (
      <Flex direction="column" gap="6" align="center">
        <Text size="4" weight="bold">
          Color Theme Variations
        </Text>

        <Flex direction="column" gap="4" style={{ width: "100%" }}>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Gray Theme:</Text>
            <TagSelect
              options={sampleOptions}
              value={graySelected}
              onChange={setGraySelected}
              defaultColor="gray"
              placeholder="Gray theme..."
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Indigo Theme:</Text>
            <TagSelect
              options={sampleOptions}
              value={indigoSelected}
              onChange={setIndigoSelected}
              defaultColor="indigo"
              placeholder="Indigo theme..."
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Cyan Theme:</Text>
            <TagSelect
              options={sampleOptions}
              value={cyanSelected}
              onChange={setCyanSelected}
              defaultColor="cyan"
              placeholder="Cyan theme..."
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Orange Theme:</Text>
            <TagSelect
              options={sampleOptions}
              value={orangeSelected}
              onChange={setOrangeSelected}
              defaultColor="orange"
              placeholder="Orange theme..."
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Crimson Theme:</Text>
            <TagSelect
              options={sampleOptions}
              value={crimsonSelected}
              onChange={setCrimsonSelected}
              defaultColor="crimson"
              placeholder="Crimson theme..."
            />
          </Flex>
        </Flex>
      </Flex>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([sampleOptions[0], sampleOptions[1]])

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Disabled TagSelect
        </Text>

        <TagSelect
          options={sampleOptions}
          value={selected}
          onChange={setSelected}
          disabled={true}
          placeholder="This is disabled..."
        />

        <Text size="2" color="gray" style={{ textAlign: "center" }}>
          The component is disabled but shows the selected values
        </Text>
      </Flex>
    )
  },
}

// Interactive playground
export const InteractivePlayground: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option[]>([])
    const [disabled, setDisabled] = useState(false)
    const [creatable, setCreatable] = useState(false)
    const [hidePlaceholder, setHidePlaceholder] = useState(false)
    const [hideClearAll, setHideClearAll] = useState(false)
    const [maxSelected, setMaxSelected] = useState<number | undefined>(undefined)
    const [colorTheme, setColorTheme] = useState<"gray" | "indigo" | "cyan" | "orange" | "crimson">("crimson")

    return (
      <Flex direction="column" gap="6" align="center" style={{ maxWidth: "500px" }}>
        <Text size="4" weight="bold">
          Interactive TagSelect
        </Text>

        {/* Controls */}
        <Box
          style={{
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <Text size="3" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Configuration
          </Text>

          <Flex direction="column" gap="3">
            <Flex gap="4" wrap="wrap">
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                <Text size="2">Disabled</Text>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={creatable}
                  onChange={(e) => setCreatable(e.target.checked)}
                />
                <Text size="2">Creatable</Text>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={hidePlaceholder}
                  onChange={(e) => setHidePlaceholder(e.target.checked)}
                />
                <Text size="2">Hide Placeholder</Text>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={hideClearAll}
                  onChange={(e) => setHideClearAll(e.target.checked)}
                />
                <Text size="2">Hide Clear All</Text>
              </label>
            </Flex>

            <Flex gap="4" align="center">
              <Text size="2">Max Selected:</Text>
              <input
                type="number"
                value={maxSelected || ""}
                onChange={(e) => setMaxSelected(e.target.value ? parseInt(e.target.value) : undefined)}
                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--gray-6)" }}
                placeholder="No limit"
              />
            </Flex>

            <Flex gap="2" align="center">
              <Text size="2">Color Theme:</Text>
              <select
                value={colorTheme}
                onChange={(e) => setColorTheme(e.target.value as any)}
                style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--gray-6)" }}
              >
                <option value="gray">Gray</option>
                <option value="indigo">Indigo</option>
                <option value="cyan">Cyan</option>
                <option value="orange">Orange</option>
                <option value="crimson">Crimson</option>
              </select>
            </Flex>
          </Flex>
        </Box>

        {/* TagSelect */}
        <TagSelect
          options={sampleOptions}
          value={selected}
          onChange={setSelected}
          disabled={disabled}
          creatable={creatable}
          hidePlaceholderWhenSelected={hidePlaceholder}
          hideClearAllButton={hideClearAll}
          maxSelected={maxSelected}
          defaultColor={colorTheme}
          onMaxSelected={(max) => alert(`Maximum ${max} selections reached!`)}
          placeholder="Configure and test the component..."
        />

        {/* Results */}
        <Box
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Text size="2" weight="medium">
            Selected Options ({selected.length}):
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px", display: "block" }}>
            {selected.length > 0 ? selected.map(s => s.label).join(", ") : "None selected"}
          </Text>
        </Box>
      </Flex>
    )
  },
}
