import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Message, MessageContent, MessageAvatar } from "../../src/3b-ai-elements/message"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Message> = {
  title: "5 AI Elements/Message",
  component: Message,
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
    from: {
      control: "select",
      options: ["user", "assistant"],
      description: "Message sender role",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  render: () => (
    <Message from="user">
      <MessageContent>
        Hello! Can you help me understand how React hooks work?
      </MessageContent>
      <MessageAvatar
        src="https://github.com/shadcn.png"
        name="User"
      />
    </Message>
  ),
}

export const AssistantMessage: Story = {
  render: () => (
    <Message from="assistant">
      <MessageAvatar
        src="https://github.com/vercel.png"
        name="Assistant"
      />
      <MessageContent>
        React hooks are functions that let you use state and other React features in functional components. The most common hooks are useState for managing state and useEffect for side effects.
      </MessageContent>
    </Message>
  ),
}

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4">
      <Message from="user">
        <MessageContent>
          What's the difference between useState and useReducer?
        </MessageContent>
        <MessageAvatar
          src="https://github.com/shadcn.png"
          name="User"
        />
      </Message>

      <Message from="assistant">
        <MessageAvatar
          src="https://github.com/vercel.png"
          name="Assistant"
        />
        <MessageContent>
          <div className="space-y-2">
            <p>Great question! Here are the key differences:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>useState</strong>: Simple state management for individual values</li>
              <li><strong>useReducer</strong>: Complex state management with predictable updates</li>
              <li>useReducer is better for complex state logic with multiple sub-values</li>
              <li>useState is perfect for simple state like toggles or single values</li>
            </ul>
          </div>
        </MessageContent>
      </Message>

      <Message from="user">
        <MessageContent>
          Can you show me an example of useReducer?
        </MessageContent>
        <MessageAvatar
          src="https://github.com/shadcn.png"
          name="User"
        />
      </Message>
    </div>
  ),
}

export const LongMessage: Story = {
  render: () => (
    <Message from="assistant">
      <MessageAvatar
        src="https://github.com/vercel.png"
        name="Assistant"
      />
      <MessageContent>
        <div className="space-y-4">
          <p>Here's a comprehensive example of useReducer in action:</p>
          <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.step };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
    </div>
  );
}`}
          </pre>
          <p>This pattern is especially useful when you have complex state transitions or when multiple actions can affect the same piece of state.</p>
        </div>
      </MessageContent>
    </Message>
  ),
}
