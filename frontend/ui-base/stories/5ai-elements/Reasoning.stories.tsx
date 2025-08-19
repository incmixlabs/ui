import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Reasoning, ReasoningTrigger, ReasoningContent } from "../../src/3b-ai-elements/reasoning"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Reasoning> = {
  title: "5 AI Elements/Reasoning",
  component: Reasoning,
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
    isStreaming: {
      control: "boolean",
      description: "Whether the reasoning is currently being generated",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the reasoning is open by default",
    },
    duration: {
      control: "number",
      description: "Duration of reasoning in seconds",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const shortReasoning = `I need to think about the best approach for implementing a React component that handles user authentication. Let me consider the key requirements:

1. Form validation for email and password
2. Error handling for failed login attempts
3. Loading states during authentication
4. Redirect after successful login

The most straightforward approach would be to use a controlled form with React Hook Form for validation and a custom hook for the authentication logic.`

const longReasoning = `To solve this complex algorithm problem, I need to break it down step by step:

First, let me understand what we're trying to achieve:
- We need to find the shortest path between two nodes in a weighted graph
- The graph can have negative edge weights
- We need to detect negative cycles

The Bellman-Ford algorithm would be perfect for this because:
1. It can handle negative edge weights (unlike Dijkstra's algorithm)
2. It can detect negative cycles
3. It has a time complexity of O(V*E) which is acceptable for most use cases

Here's my reasoning for the implementation:

1. **Initialization**: Set distance to source as 0 and all other distances as infinity
2. **Relaxation**: For V-1 iterations, relax all edges
3. **Cycle Detection**: Run one more iteration to check for negative cycles

The key insight is that if we can still relax edges after V-1 iterations, then there must be a negative cycle reachable from the source.

For the data structure, I'll use:
- An adjacency list to represent the graph (space efficient)
- A distance array to track shortest distances
- A predecessor array to reconstruct the path

Edge cases to consider:
- Self-loops with negative weights
- Disconnected components
- Very large graphs (memory constraints)
- Floating point precision issues

This approach will give us both the shortest paths and negative cycle detection in a single algorithm.`

export const Default: Story = {
  args: {
    defaultOpen: false,
    duration: 0,
  },
  render: (args) => (
    <Reasoning {...args}>
      <ReasoningTrigger />
      <ReasoningContent>
        {shortReasoning}
      </ReasoningContent>
    </Reasoning>
  ),
}

export const OpenByDefault: Story = {
  args: {
    defaultOpen: true,
    duration: 3,
  },
  render: (args) => (
    <Reasoning {...args}>
      <ReasoningTrigger />
      <ReasoningContent>
        {shortReasoning}
      </ReasoningContent>
    </Reasoning>
  ),
}

export const Streaming: Story = {
  args: {
    isStreaming: true,
    defaultOpen: true,
  },
  render: (args) => (
    <Reasoning {...args}>
      <ReasoningTrigger />
      <ReasoningContent>
        I'm currently thinking about this problem... Let me analyze the requirements and consider different approaches...
      </ReasoningContent>
    </Reasoning>
  ),
}

export const LongReasoning: Story = {
  args: {
    defaultOpen: false,
    duration: 12,
  },
  render: (args) => (
    <Reasoning {...args}>
      <ReasoningTrigger />
      <ReasoningContent>
        {longReasoning}
      </ReasoningContent>
    </Reasoning>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [isStreaming, setIsStreaming] = React.useState(false)
    const [duration, setDuration] = React.useState(0)
    const [reasoning, setReasoning] = React.useState("")

    const startReasoning = () => {
      setIsStreaming(true)
      setDuration(0)
      setReasoning("Starting to think about this problem...")

      // Simulate streaming reasoning
      const steps = [
        "Analyzing the requirements...",
        "Considering different approaches...",
        "Evaluating trade-offs between performance and simplicity...",
        "Choosing the best solution based on the context...",
        "Planning the implementation steps..."
      ]

      let currentStep = 0
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setReasoning(prev => prev + "\n\n" + steps[currentStep])
          currentStep++
        } else {
          setIsStreaming(false)
          setDuration(7)
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }

    return (
      <div className="space-y-4">
        <button
          onClick={startReasoning}
          disabled={isStreaming}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          {isStreaming ? "Thinking..." : "Start Reasoning"}
        </button>

        <Reasoning
          isStreaming={isStreaming}
          duration={duration}
        >
          <ReasoningTrigger />
          <ReasoningContent>
            {reasoning || "Click the button above to start reasoning..."}
          </ReasoningContent>
        </Reasoning>
      </div>
    )
  },
}

export const CustomTrigger: Story = {
  render: () => (
    <Reasoning defaultOpen={false} duration={5}>
      <ReasoningTrigger title="AI Analysis">
        <span className="flex items-center gap-2">
          🤖 Custom reasoning trigger (5 seconds)
        </span>
      </ReasoningTrigger>
      <ReasoningContent>
        This is a custom reasoning block with a personalized trigger. The AI spent time analyzing the problem and came up with this solution approach.
      </ReasoningContent>
    </Reasoning>
  ),
}

export const MultipleReasoning: Story = {
  render: () => (
    <div className="space-y-6">
      <Reasoning defaultOpen={false} duration={2}>
        <ReasoningTrigger title="Initial Analysis" />
        <ReasoningContent>
          Quick initial thoughts about the problem structure and potential approaches.
        </ReasoningContent>
      </Reasoning>

      <Reasoning defaultOpen={false} duration={8}>
        <ReasoningTrigger title="Deep Dive" />
        <ReasoningContent>
          {longReasoning}
        </ReasoningContent>
      </Reasoning>

      <Reasoning defaultOpen={false} duration={3}>
        <ReasoningTrigger title="Final Considerations" />
        <ReasoningContent>
          After implementing the solution, I realized there are a few edge cases to consider and some potential optimizations for better performance.
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
}
