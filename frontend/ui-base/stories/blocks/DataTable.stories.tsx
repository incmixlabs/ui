
import { SidebarFilterDemo, UsersTableDemo,TasksTableDemo, EditableUsersTableDemo, InlineEditDemo, GroupedDemo, TaskTimelineDemo, TaskStatusDemo, UpdatedGroupedDemo } from "../../src/blocks/tanstack-table";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Blocks/DataTable",
  component: UsersTableDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof UsersTableDemo>;

export const Users: Story = {
  render: () => <UsersTableDemo />,
  name: "Users Table",
};

export const Tasks: Story = {
  render: () => <TasksTableDemo />,
  name: "Tasks Management Table",
};

export const SidebarFilter: Story = {
  render: () => <SidebarFilterDemo />,
  name: "Sidebar Filter Table",
};

export const EditableUsers: Story = {
  render: () => <EditableUsersTableDemo />,
  name: "Editable Users Table",
};

export const InlineEdit: Story = {
  render: () => <InlineEditDemo />,
  name: "Inline Edit Table",
};

export const Grouped: Story = {
  render: () => <GroupedDemo />,
  name: "Grouped Table",
};


export const TaskTimeline: Story = {
  render: () => <TaskTimelineDemo />,
  name: "Task Timeline Table",
};

export const TaskStatus: Story = {
  render: () => <TaskStatusDemo />,
  name: "Task Status Table",
};

export const UpdatedGrouped: Story = {
  render: () => <UpdatedGroupedDemo />,
  name: "Updated Grouped Table",
};
