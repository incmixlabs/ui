import { FileFolderAccordion } from "@incmix/ui2"
import type { BuildingEnvironmentVariableRoot } from "@incmix/ui2"
import { buildEnvironmentVariable } from "@incmix/ui2"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof FileFolderAccordion> = {
  title: "Molecules/FileFolderAccordion",
  component: FileFolderAccordion,
}

export default meta
type Story = StoryObj<typeof FileFolderAccordion>

const defaultStyle = {
  width: "400px",
}

const sampleData: BuildingEnvironmentVariableRoot = {
  children: [
    {
      type: "folder",
      label: "Folder 1",
      children: [
        { type: "leaf", label: "File 1.1", value: "Content 1.1" },
        { type: "leaf", label: "File 1.2", value: "Content 1.2" },
      ],
    },
    {
      type: "folder",
      label: "Folder 2",
      children: [
        { type: "leaf", label: "File 2.1", value: "Content 2.1" },
        {
          type: "folder",
          label: "Subfolder 2.2",
          children: [
            { type: "leaf", label: "File 2.2.1", value: "Content 2.2.1" },
          ],
        },
      ],
    },
    { type: "leaf", label: "File 3", value: "Content 3" },
  ],
}

export const Default: Story = {
  args: {
    root: buildEnvironmentVariable(sampleData),
    style: defaultStyle,
  },
}

export const EmptyRoot: Story = {
  args: {
    root: buildEnvironmentVariable({ children: [] }),
  },
}

export const SingleLevel: Story = {
  args: {
    root: buildEnvironmentVariable({
      children: [
        { type: "leaf", label: "File 1", value: "Content 1" },
        { type: "leaf", label: "File 2", value: "Content 2" },
        { type: "leaf", label: "File 3", value: "Content 3" },
      ],
    }),
    style: defaultStyle,
  },
}

export const MultipleLevels: Story = {
  args: {
    root: buildEnvironmentVariable(sampleData),
    style: defaultStyle,
  },
}
