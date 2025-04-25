
import { SidebarFilterDemo, UsersTableDemo,TasksTableDemo } from "@incmix/ui/tanstack-table";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/DataTable",
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
