import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Button, Flex, Progress, Text, Theme } from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof Progress> = {
  title:"1 Base/Progress",
  component: Progress,
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
      description: "Progress bar size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface", "soft"],
      description: "Progress bar variant style",
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
      description: "Progress bar accent color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    value: {
      control: "number",
      min: 0,
      max: 100,
      description: "Progress value (0-100)",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
  },
  args: {
    size: "2",
    variant: "surface",
    value: 50,
    max: 100,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Default Progress ({args.value}%)
      </Text>
      <Progress {...args} />
    </div>
  ),
}

// Size stories
export const Size1: Story = {
  render: (_args) => (
    <div>
      <Text size="1" style={{ marginBottom: "8px", display: "block" }}>
        Size 1 (Small) - 25%
      </Text>
      <Progress size="1" value={25} />
    </div>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "10px", display: "block" }}>
        Size 2 (Default) - 50%
      </Text>
      <Progress size="2" value={50} />
    </div>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <div>
      <Text size="3" style={{ marginBottom: "12px", display: "block" }}>
        Size 3 (Large) - 75%
      </Text>
      <Progress size="3" value={75} />
    </div>
  ),
}

// Variant stories
export const Classic: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Classic Variant - 60%
      </Text>
      <Progress variant="classic" value={60} />
    </div>
  ),
}

export const Surface: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Surface Variant - 60%
      </Text>
      <Progress variant="surface" value={60} />
    </div>
  ),
}

export const Soft: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Soft Variant - 60%
      </Text>
      <Progress variant="soft" value={60} />
    </div>
  ),
}

// Progress values
export const Empty: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Empty Progress - 0%
      </Text>
      <Progress value={0} />
    </div>
  ),
}

export const Quarter: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Quarter Progress - 25%
      </Text>
      <Progress value={25} />
    </div>
  ),
}

export const Half: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Half Progress - 50%
      </Text>
      <Progress value={50} />
    </div>
  ),
}

export const ThreeQuarters: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Three Quarters Progress - 75%
      </Text>
      <Progress value={75} />
    </div>
  ),
}

export const Complete: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Complete Progress - 100%
      </Text>
      <Progress value={100} />
    </div>
  ),
}

// Color stories
export const ColorBlue: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Blue Color - 70%
      </Text>
      <Progress color="blue" value={70} />
    </div>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Red Color - 70%
      </Text>
      <Progress color="red" value={70} />
    </div>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Green Color - 70%
      </Text>
      <Progress color="green" value={70} />
    </div>
  ),
}

export const ColorPurple: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        Purple Color - 70%
      </Text>
      <Progress color="purple" value={70} />
    </div>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => (
    <div>
      <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
        High Contrast Mode - 60%
      </Text>
      <Progress highContrast value={60} />
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
        <Progress size="1" value={30} />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "10px", display: "block" }}>
          Size 2
        </Text>
        <Progress size="2" value={50} />
      </div>
      <div>
        <Text size="3" style={{ marginBottom: "12px", display: "block" }}>
          Size 3
        </Text>
        <Progress size="3" value={70} />
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
        <Progress variant="classic" value={40} />
      </div>
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Surface
        </Text>
        <Progress variant="surface" value={60} />
      </div>
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Soft
        </Text>
        <Progress variant="soft" value={80} />
      </div>
    </Flex>
  ),
}

// Progress states showcase
export const ProgressStates: Story = {
  render: () => (
    <Flex direction="column" gap="3">
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Not Started
        </Text>
        <Progress value={0} />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          In Progress
        </Text>
        <Progress value={35} color="blue" />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Almost Done
        </Text>
        <Progress value={85} color="orange" />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Complete
        </Text>
        <Progress value={100} color="green" />
      </div>
    </Flex>
  ),
}

// Animated progress example
export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0)
    const [isRunning, setIsRunning] = React.useState(false)

    React.useEffect(() => {
      let interval: NodeJS.Timeout
      if (isRunning && progress < 100) {
        interval = setInterval(() => {
          setProgress((prev) => {
            const next = prev + 1
            if (next >= 100) {
              setIsRunning(false)
              return 100
            }
            return next
          })
        }, 100)
      }
      return () => clearInterval(interval)
    }, [isRunning, progress])

    const handleStart = () => {
      setIsRunning(true)
    }

    const handleReset = () => {
      setProgress(0)
      setIsRunning(false)
    }

    return (
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Animated Progress - {progress}%
        </Text>
        <Progress
          value={progress}
          color="blue"
          style={{ marginBottom: "16px" }}
        />
        <Flex gap="2">
          <Button
            onClick={handleStart}
            disabled={isRunning || progress >= 100}
            size="1"
          >
            Start
          </Button>
          <Button onClick={handleReset} variant="outline" size="1">
            Reset
          </Button>
        </Flex>
      </div>
    )
  },
}

// Download progress example
export const DownloadProgress: Story = {
  render: () => {
    const [downloads] = React.useState([
      { name: "document.pdf", progress: 100, color: "green" },
      { name: "presentation.pptx", progress: 67, color: "blue" },
      { name: "spreadsheet.xlsx", progress: 23, color: "orange" },
      { name: "video.mp4", progress: 0, color: "gray" },
    ])

    return (
      <div style={{ maxWidth: "350px" }}>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "16px", display: "block" }}
        >
          Downloads
        </Text>
        <Flex direction="column" gap="3">
          {downloads.map((download, index) => (
            <div key={index}>
              <Flex
                justify="between"
                align="center"
                style={{ marginBottom: "6px" }}
              >
                <Text size="2">{download.name}</Text>
                <Text size="1" color="gray">
                  {download.progress}%
                </Text>
              </Flex>
              <Progress
                value={download.progress}
                color={download.color as any}
                size="1"
              />
            </div>
          ))}
        </Flex>
      </div>
    )
  },
}

// Skills progress example
export const SkillsProgress: Story = {
  render: () => {
    const skills = [
      { name: "React", level: 90, color: "blue" },
      { name: "TypeScript", level: 85, color: "indigo" },
      { name: "Node.js", level: 75, color: "green" },
      { name: "Python", level: 60, color: "yellow" },
      { name: "Docker", level: 45, color: "cyan" },
      { name: "GraphQL", level: 30, color: "purple" },
    ]

    return (
      <div style={{ maxWidth: "300px" }}>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "20px", display: "block" }}
        >
          Technical Skills
        </Text>
        <Flex direction="column" gap="3">
          {skills.map((skill, index) => (
            <div key={index}>
              <Flex
                justify="between"
                align="center"
                style={{ marginBottom: "8px" }}
              >
                <Text size="2" weight="medium">
                  {skill.name}
                </Text>
                <Text size="1" color="gray">
                  {skill.level}%
                </Text>
              </Flex>
              <Progress
                value={skill.level}
                color={skill.color as any}
                size="2"
                variant="soft"
              />
            </div>
          ))}
        </Flex>
      </div>
    )
  },
}

// Project status example
export const ProjectStatus: Story = {
  render: () => {
    const projects = [
      {
        name: "Website Redesign",
        progress: 100,
        status: "Complete",
        color: "green",
      },
      {
        name: "Mobile App",
        progress: 72,
        status: "In Progress",
        color: "blue",
      },
      {
        name: "API Integration",
        progress: 45,
        status: "In Progress",
        color: "orange",
      },
      {
        name: "Database Migration",
        progress: 15,
        status: "Starting",
        color: "yellow",
      },
      {
        name: "Testing Suite",
        progress: 0,
        status: "Not Started",
        color: "gray",
      },
    ]

    return (
      <div style={{ maxWidth: "400px" }}>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "20px", display: "block" }}
        >
          Project Status Dashboard
        </Text>
        <Flex direction="column" gap="4">
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                borderRadius: "8px",
              }}
            >
              <Flex
                justify="between"
                align="center"
                style={{ marginBottom: "8px" }}
              >
                <Text size="2" weight="medium">
                  {project.name}
                </Text>
                <Text size="1" color="gray">
                  {project.status}
                </Text>
              </Flex>
              <Progress
                value={project.progress}
                color={project.color as any}
                size="2"
                style={{ marginBottom: "6px" }}
              />
              <Text size="1" color="gray">
                {project.progress}% complete
              </Text>
            </div>
          ))}
        </Flex>
      </div>
    )
  },
}
