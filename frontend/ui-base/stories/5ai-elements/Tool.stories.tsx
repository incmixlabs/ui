import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "../../src/3b-ai-elements/tool"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Tool> = {
  title: "5 AI Elements/Tool",
  component: Tool,
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
}

export default meta
type Story = StoryObj<typeof meta>

const sampleInput = {
  url: "https://api.github.com/users/octocat",
  method: "GET",
  headers: {
    "Accept": "application/json",
    "User-Agent": "MyApp/1.0"
  }
}

const sampleOutput = {
  login: "octocat",
  id: 1,
  name: "The Octocat",
  company: "GitHub",
  blog: "https://github.blog",
  public_repos: 8,
  followers: 9999,
  following: 9
}

export const Pending: Story = {
  render: () => (
    <Tool>
      <ToolHeader type="fetch" state="input-streaming" />
      <ToolContent>
        <ToolInput input={sampleInput} />
      </ToolContent>
    </Tool>
  ),
}

export const Running: Story = {
  render: () => (
    <Tool defaultOpen={true}>
      <ToolHeader type="fetch" state="input-available" />
      <ToolContent>
        <ToolInput input={sampleInput} />
        <div className="p-4 text-sm text-muted-foreground">
          Executing API request...
        </div>
      </ToolContent>
    </Tool>
  ),
}

export const Completed: Story = {
  render: () => (
    <Tool>
      <ToolHeader type="fetch" state="output-available" />
      <ToolContent>
        <ToolInput input={sampleInput} />
        <ToolOutput
          output={JSON.stringify(sampleOutput, null, 2)}
          errorText={undefined}
        />
      </ToolContent>
    </Tool>
  ),
}

export const Error: Story = {
  render: () => (
    <Tool defaultOpen={true}>
      <ToolHeader type="fetch" state="output-error" />
      <ToolContent>
        <ToolInput input={sampleInput} />
        <ToolOutput
          output={null}
          errorText="Network error: Unable to connect to api.github.com. Please check your internet connection and try again."
        />
      </ToolContent>
    </Tool>
  ),
}

export const DatabaseQuery: Story = {
  render: () => {
    const queryInput = {
      query: "SELECT * FROM users WHERE age > ? AND status = ?",
      parameters: [18, "active"],
      timeout: 5000
    }

    const queryOutput = [
      { id: 1, name: "Alice", age: 25, status: "active" },
      { id: 2, name: "Bob", age: 30, status: "active" },
      { id: 3, name: "Charlie", age: 22, status: "active" }
    ]

    return (
      <Tool>
        <ToolHeader type="database_query" state="output-available" />
        <ToolContent>
          <ToolInput input={queryInput} />
          <ToolOutput
            output={JSON.stringify(queryOutput, null, 2)}
            errorText={undefined}
          />
        </ToolContent>
      </Tool>
    )
  },
}

export const FileOperation: Story = {
  render: () => {
    const fileInput = {
      operation: "read",
      path: "/home/user/documents/config.json",
      encoding: "utf-8"
    }

    const fileOutput = `{
  "theme": "dark",
  "language": "en",
  "notifications": true,
  "version": "1.2.0"
}`

    return (
      <Tool defaultOpen={true}>
        <ToolHeader type="file_read" state="output-available" />
        <ToolContent>
          <ToolInput input={fileInput} />
          <ToolOutput
            output={fileOutput}
            errorText={undefined}
          />
        </ToolContent>
      </Tool>
    )
  },
}

export const MultipleTools: Story = {
  render: () => (
    <div className="space-y-4">
      <Tool>
        <ToolHeader type="search" state="output-available" />
        <ToolContent>
          <ToolInput input={{ query: "React hooks tutorial", limit: 5 }} />
          <ToolOutput
            output="Found 127 results for 'React hooks tutorial'"
            errorText={undefined}
          />
        </ToolContent>
      </Tool>

      <Tool>
        <ToolHeader type="code_analysis" state="input-available" />
        <ToolContent>
          <ToolInput input={{
            file: "src/components/UserCard.tsx",
            analysis_type: "performance"
          }} />
        </ToolContent>
      </Tool>

      <Tool>
        <ToolHeader type="api_call" state="output-error" />
        <ToolContent>
          <ToolInput input={{
            endpoint: "/api/users/123",
            method: "DELETE"
          }} />
          <ToolOutput
            output={null}
            errorText="403 Forbidden: You don't have permission to delete this user."
          />
        </ToolContent>
      </Tool>
    </div>
  ),
}

export const InteractiveStates: Story = {
  render: () => {
    const [toolState, setToolState] = React.useState<"input-streaming" | "input-available" | "output-available" | "output-error">("input-streaming")
    const [isOpen, setIsOpen] = React.useState(false)

    const cycleState = () => {
      const states = ["input-streaming", "input-available", "output-available", "output-error"] as const
      const currentIndex = states.indexOf(toolState)
      const nextIndex = (currentIndex + 1) % states.length
      setToolState(states[nextIndex])
      setIsOpen(true)
    }

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={cycleState}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Cycle State ({toolState})
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
          >
            {isOpen ? "Close" : "Open"}
          </button>
        </div>

        <Tool open={isOpen} onOpenChange={setIsOpen}>
          <ToolHeader type="interactive_demo" state={toolState} />
          <ToolContent>
            <ToolInput input={{ demo: "Interactive tool state demonstration" }} />
            {(toolState === "output-available" || toolState === "output-error") && (
              <ToolOutput
                output={toolState === "output-available" ? "Operation completed successfully!" : null}
                errorText={toolState === "output-error" ? "Something went wrong during execution." : undefined}
              />
            )}
          </ToolContent>
        </Tool>
      </div>
    )
  },
}
