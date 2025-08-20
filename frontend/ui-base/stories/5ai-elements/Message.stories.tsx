import type { Meta, StoryObj } from '@storybook/react';
import { Message, MessageContent, MessageAvatar } from '../../src/3b-ai-elements/message'

const meta: Meta<typeof Message> = {
  title: '5 AI Elements/Message',
  component: Message,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    from: {
      control: 'select',
      options: ['user', 'assistant'],
      description: 'The role of the message sender',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    from: 'user',
  },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        Hello! Can you help me with a coding problem?
      </MessageContent>
      <MessageAvatar
        src="https://github.com/vercel.png"
        name="User"
      />
    </Message>
  ),
};

export const AssistantMessage: Story = {
  args: {
    from: 'assistant',
  },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        Of course! I'd be happy to help you with your coding problem.
        What specific issue are you facing?
      </MessageContent>
      <MessageAvatar
        src="https://github.com/openai.png"
        name="AI"
      />
    </Message>
  ),
};

export const LongMessage: Story = {
  args: {
    from: 'assistant',
  },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <p>Here's a comprehensive solution to your problem:</p>
        <ol>
          <li>First, you need to understand the core concept</li>
          <li>Then, implement the basic structure</li>
          <li>Add error handling for edge cases</li>
          <li>Test your implementation thoroughly</li>
          <li>Optimize for performance if needed</li>
        </ol>
        <p>Let me know if you need clarification on any of these steps!</p>
      </MessageContent>
      <MessageAvatar
        src="https://github.com/openai.png"
        name="Assistant"
      />
    </Message>
  ),
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <Message from="user">
        <MessageContent>
          What's the difference between React useState and useReducer?
        </MessageContent>
        <MessageAvatar
          src="https://github.com/vercel.png"
          name="User"
        />
      </Message>

      <Message from="assistant">
        <MessageContent>
          Great question! Both `useState` and `useReducer` are React hooks for managing state, but they serve different purposes:

          **useState** is simpler and best for:
          - Basic state updates
          - Independent state variables
          - Simple toggle or increment operations

          **useReducer** is more powerful and better for:
          - Complex state logic
          - Multiple related state updates
          - When next state depends on previous state
        </MessageContent>
        <MessageAvatar
          src="https://github.com/openai.png"
          name="Assistant"
        />
      </Message>

      <Message from="user">
        <MessageContent>
          Can you show me an example of useReducer?
        </MessageContent>
        <MessageAvatar
          src="https://github.com/vercel.png"
          name="User"
        />
      </Message>
    </div>
  ),
};
