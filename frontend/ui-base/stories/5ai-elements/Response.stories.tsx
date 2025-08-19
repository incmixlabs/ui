import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Response } from "../../src/3b-ai-elements/response"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Response> = {
  title: "5 AI Elements/Response",
  component: Response,
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
    parseIncompleteMarkdown: {
      control: "boolean",
      description: "Whether to parse incomplete markdown tokens during streaming",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const simpleMarkdown = `# React Components

React components are the building blocks of React applications. Here's what you need to know:

## Function Components

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Key Concepts

- **Props**: Data passed to components
- **State**: Internal component data
- **JSX**: JavaScript XML syntax

> Components should be pure functions when possible.

For more information, visit [React docs](https://react.dev).`

const complexMarkdown = `# Advanced React Patterns

## 1. Compound Components

This pattern allows you to create components that work together:

\`\`\`jsx
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}
\`\`\`

## 2. Render Props Pattern

\`\`\`jsx
function DataFetcher({ render, url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading });
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading }) => (
    loading ? <Spinner /> : <UserList users={data} />
  )}
/>
\`\`\`

## Performance Comparison

| Pattern | Bundle Size | Runtime Performance | Developer Experience |
|---------|-------------|-------------------|---------------------|
| Compound Components | Small | Excellent | Great |
| Render Props | Medium | Good | Good |
| Higher-Order Components | Large | Fair | Complex |

## Best Practices

1. Use **compound components** for related UI elements
2. Implement **render props** for data sharing
3. Consider **custom hooks** for reusable logic
4. Always handle ~~loading states~~ **loading and error states**

### Math Example

When calculating component re-renders: $O(n) = 2^n$ where $n$ is the depth of nested components.

The formula for optimization: $Performance = \\frac{Memoization \\times Batching}{Re-renders}$`

const streamingMarkdown = `# Real-time Response

I'm generating this response in real-time. Let me explain **React hooks** step by step:

## useState Hook

The \`useState\` hook allows you to add state to functional components.

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

This gives you:
- A state variable (\`count\`)
- A setter function (\`setCount\`)

## Common Patterns

Here are some **important patterns** to remember:

1. Always use the functional update pattern when the new state depends on the previous state
2. Use multiple useState calls for unrelated state variables
3. Consider useReducer for complex state logic

> Remember: State updates are asynchronous and may be batched for performance.`

export const Simple: Story = {
  args: {
    children: simpleMarkdown,
  },
}

export const Complex: Story = {
  args: {
    children: complexMarkdown,
  },
}

export const PlainText: Story = {
  args: {
    children: "This is a simple plain text response without any markdown formatting. It should render as regular text with the default styling.",
  },
}

export const CodeOnly: Story = {
  args: {
    children: `\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\``,
  },
}

export const WithMath: Story = {
  args: {
    children: `# Mathematical Formulas

Here are some examples of mathematical notation in responses:

## Inline Math
The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.

## Block Math
$$
\\begin{align}
f(x) &= x^2 + 2x + 1 \\\\
&= (x + 1)^2
\\end{align}
$$

## Performance Analysis
The time complexity is $O(n \\log n)$ where $n$ is the input size.`,
  },
}

export const StreamingSimulation: Story = {
  render: () => {
    const [content, setContent] = React.useState("")
    const [isStreaming, setIsStreaming] = React.useState(false)

    const fullContent = streamingMarkdown

export const StreamingSimulation: Story = {
  render: () => {
    const [content, setContent] = React.useState("")
    const [isStreaming, setIsStreaming] = React.useState(false)
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

    const fullContent = streamingMarkdown

    // Clear any pending interval if this component unmounts
    React.useEffect(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, [])

    const simulateStreaming = () => {
      setIsStreaming(true)
      setContent("")

      let currentIndex = 0
      // If somehow an old interval is still running, clear it before starting a new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      intervalRef.current = setInterval(() => {
        if (currentIndex < fullContent.length) {
          setContent(fullContent.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsStreaming(false)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }, 20)
    }

    // …the rest of your render (buttons, UI that calls simulateStreaming, etc.)…
  },
}

    return (
      <div className="space-y-4">
        <button
          onClick={simulateStreaming}
          disabled={isStreaming}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          {isStreaming ? "Streaming..." : "Start Streaming Response"}
        </button>

        <div className="border rounded-lg p-4">
          <Response parseIncompleteMarkdown={true}>
            {content}
          </Response>
        </div>
      </div>
    )
  },
}

export const IncompleteMarkdown: Story = {
  render: () => {
    const examples = [
      "This is **bold text that's incomplete",
      "Here's a [link that's not finished",
      "Some `inline code that's missing",
      "A ~~strikethrough that's not complete",
      "Normal text with **complete** formatting works fine.",
    ]

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Incomplete Markdown Handling</h3>
        {examples.map((example, index) => (
          <div key={index} className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
              Raw: {example}
            </div>
            <div className="border rounded p-3">
              <Response parseIncompleteMarkdown={true}>
                {example}
              </Response>
            </div>
          </div>
        ))}
      </div>
    )
  },
}
