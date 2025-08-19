import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Task, TaskTrigger, TaskContent, TaskItem, TaskItemFile } from "../../src/3b-ai-elements/task"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Task> = {
  title: "5 AI Elements/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ minWidth: "600px", maxWidth: "800px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the task is open by default",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Task {...args}>
      <TaskTrigger title="Search for React components" />
      <TaskContent>
        <TaskItem>Found 23 React components in the codebase</TaskItem>
        <TaskItem>
          Located main components in <TaskItemFile>src/components/</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Found utility components in <TaskItemFile>src/utils/components/</TaskItemFile>
        </TaskItem>
      </TaskContent>
    </Task>
  ),
}

export const Closed: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Task {...args}>
      <TaskTrigger title="Analyze component dependencies" />
      <TaskContent>
        <TaskItem>Scanning import statements...</TaskItem>
        <TaskItem>Building dependency graph...</TaskItem>
        <TaskItem>Identifying circular dependencies...</TaskItem>
        <TaskItem>Analysis complete: 0 issues found</TaskItem>
      </TaskContent>
    </Task>
  ),
}

export const FileOperations: Story = {
  render: () => (
    <Task defaultOpen={true}>
      <TaskTrigger title="Update configuration files" />
      <TaskContent>
        <TaskItem>
          Reading configuration from <TaskItemFile>config/app.json</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Updating environment variables in <TaskItemFile>.env.local</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Modifying build settings in <TaskItemFile>webpack.config.js</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Created backup at <TaskItemFile>config/backup/app.json.bak</TaskItemFile>
        </TaskItem>
        <TaskItem>Configuration update completed successfully</TaskItem>
      </TaskContent>
    </Task>
  ),
}

export const CodeAnalysis: Story = {
  render: () => (
    <Task defaultOpen={true}>
      <TaskTrigger title="Performance analysis of UserList component" />
      <TaskContent>
        <TaskItem>
          Analyzing <TaskItemFile>src/components/UserList.tsx</TaskItemFile>
        </TaskItem>
        <TaskItem>Detected expensive re-renders in list items</TaskItem>
        <TaskItem>
          Found optimization opportunity in <TaskItemFile>src/hooks/useUsers.ts</TaskItemFile>
        </TaskItem>
        <TaskItem>Recommended: Add React.memo to UserListItem component</TaskItem>
        <TaskItem>Recommended: Implement virtualization for large lists</TaskItem>
        <TaskItem>
          Performance report saved to <TaskItemFile>reports/performance-analysis.md</TaskItemFile>
        </TaskItem>
      </TaskContent>
    </Task>
  ),
}

export const DatabaseMigration: Story = {
  render: () => (
    <Task defaultOpen={true}>
      <TaskTrigger title="Database schema migration" />
      <TaskContent>
        <TaskItem>
          Creating migration file <TaskItemFile>migrations/20240318_add_user_preferences.sql</TaskItemFile>
        </TaskItem>
        <TaskItem>Adding new columns: theme, language, timezone</TaskItem>
        <TaskItem>Creating indexes for performance optimization</TaskItem>
        <TaskItem>
          Updating model definitions in <TaskItemFile>src/models/User.ts</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Adding validation schema in <TaskItemFile>src/schemas/userPreferences.ts</TaskItemFile>
        </TaskItem>
        <TaskItem>Running migration against development database</TaskItem>
        <TaskItem>Migration completed successfully ✅</TaskItem>
      </TaskContent>
    </Task>
  ),
}

export const MultipleTasks: Story = {
  render: () => (
    <div className="space-y-4">
      <Task defaultOpen={false}>
        <TaskTrigger title="Install project dependencies" />
        <TaskContent>
          <TaskItem>Running npm install...</TaskItem>
          <TaskItem>Installing 247 packages</TaskItem>
          <TaskItem>Dependencies installed successfully</TaskItem>
        </TaskContent>
      </Task>

      <Task defaultOpen={true}>
        <TaskTrigger title="Build and test application" />
        <TaskContent>
          <TaskItem>Compiling TypeScript files...</TaskItem>
          <TaskItem>
            Processing <TaskItemFile>src/index.ts</TaskItemFile>
          </TaskItem>
          <TaskItem>
            Building components from <TaskItemFile>src/components/</TaskItemFile>
          </TaskItem>
          <TaskItem>Running test suite...</TaskItem>
          <TaskItem>All 156 tests passed ✅</TaskItem>
          <TaskItem>
            Build output saved to <TaskItemFile>dist/</TaskItemFile>
          </TaskItem>
        </TaskContent>
      </Task>

      <Task defaultOpen={false}>
        <TaskTrigger title="Deploy to staging environment" />
        <TaskContent>
          <TaskItem>Uploading build artifacts...</TaskItem>
          <TaskItem>Updating server configuration...</TaskItem>
          <TaskItem>Running database migrations...</TaskItem>
          <TaskItem>Application deployed successfully 🚀</TaskItem>
        </TaskContent>
      </Task>
    </div>
  ),
}

export const ErrorTask: Story = {
  render: () => (
    <Task defaultOpen={true}>
      <TaskTrigger title="Fix TypeScript compilation errors" />
      <TaskContent>
        <TaskItem>
          ❌ Type error in <TaskItemFile>src/components/Button.tsx:15</TaskItemFile>
        </TaskItem>
        <TaskItem>
          ❌ Missing import in <TaskItemFile>src/utils/helpers.ts:3</TaskItemFile>
        </TaskItem>
        <TaskItem>
          ❌ Interface mismatch in <TaskItemFile>src/types/api.ts:22</TaskItemFile>
        </TaskItem>
        <TaskItem>Fixing type definitions...</TaskItem>
        <TaskItem>Adding missing imports...</TaskItem>
        <TaskItem>Updating interface definitions...</TaskItem>
        <TaskItem>✅ All TypeScript errors resolved</TaskItem>
      </TaskContent>
    </Task>
  ),
}

export const CustomTrigger: Story = {
  render: () => (
    <Task defaultOpen={true}>
      <TaskTrigger title="Custom search operation">
        <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 font-medium">Custom Task in Progress</span>
          <span className="text-blue-500 text-xs">(3 files found)</span>
        </div>
      </TaskTrigger>
      <TaskContent>
        <TaskItem>
          Searching for pattern "useEffect" in <TaskItemFile>src/</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Found 15 matches in <TaskItemFile>src/components/Dashboard.tsx</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Found 8 matches in <TaskItemFile>src/hooks/useApi.ts</TaskItemFile>
        </TaskItem>
        <TaskItem>
          Found 3 matches in <TaskItemFile>src/utils/cleanup.ts</TaskItemFile>
        </TaskItem>
        <TaskItem>Search completed: 26 total matches found</TaskItem>
      </TaskContent>
    </Task>
  ),
}
