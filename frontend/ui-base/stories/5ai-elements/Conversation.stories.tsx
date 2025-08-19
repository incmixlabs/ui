import type { Meta, StoryObj } from '@storybook/react';
import { Conversation, ConversationContent, ConversationScrollButton } from '../../src/3b-ai-elements/conversation';
import { Message, MessageContent, MessageAvatar } from '../../src/3b-ai-elements/message';

const meta: Meta<typeof Conversation> = {
  title: 'AI Elements/Conversation',
  component: Conversation,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const messages = [
  {
    id: 1,
    role: 'user' as const,
    content: "Hello! Can you help me understand React hooks?",
  },
  {
    id: 2,
    role: 'assistant' as const,
    content: "Of course! React hooks are functions that let you use state and other React features in functional components. The most common ones are useState and useEffect.",
  },
  {
    id: 3,
    role: 'user' as const,
    content: "What's the difference between useState and useEffect?",
  },
  {
    id: 4,
    role: 'assistant' as const,
    content: "Great question! useState is for managing component state, while useEffect is for side effects like API calls, subscriptions, or DOM manipulation. useState returns a state value and a setter function, while useEffect runs code after render and can clean up with a return function.",
  },
  {
    id: 5,
    role: 'user' as const,
    content: "Can you show me a simple example?",
  },
  {
    id: 6,
    role: 'assistant' as const,
    content: `Here's a simple counter example:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\``,
  },
];

export const Default: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        {messages.map((message) => (
          <Message key={message.id} from={message.role}>
            <MessageContent>
              {message.content}
            </MessageContent>
            <MessageAvatar
              src={message.role === 'user' ? "https://github.com/vercel.png" : "https://github.com/openai.png"}
              name={message.role === 'user' ? "User" : "AI"}
            />
          </Message>
        ))}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};

export const ShortConversation: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        {messages.slice(0, 2).map((message) => (
          <Message key={message.id} from={message.role}>
            <MessageContent>
              {message.content}
            </MessageContent>
            <MessageAvatar
              src={message.role === 'user' ? "https://github.com/vercel.png" : "https://github.com/openai.png"}
              name={message.role === 'user' ? "User" : "AI"}
            />
          </Message>
        ))}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};

export const LongConversation: Story = {
  render: () => {
    const longMessages = [
      ...messages,
      {
        id: 7,
        role: 'user' as const,
        content: "That's helpful! What about useContext?",
      },
      {
        id: 8,
        role: 'assistant' as const,
        content: "useContext is used for accessing values from React Context without nested Consumer components. It's great for sharing data across multiple components without prop drilling.",
      },
      {
        id: 9,
        role: 'user' as const,
        content: "Can you explain prop drilling?",
      },
      {
        id: 10,
        role: 'assistant' as const,
        content: "Prop drilling is when you pass props down through multiple component layers just to get data to a deeply nested component. It can make your code harder to maintain. Context helps avoid this by providing a way to share values between components without explicitly passing props through every level.",
      },
    ];

    return (
      <Conversation>
        <ConversationContent>
          {longMessages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent>
                {message.content}
              </MessageContent>
              <MessageAvatar
                src={message.role === 'user' ? "https://github.com/vercel.png" : "https://github.com/openai.png"}
                name={message.role === 'user' ? "User" : "AI"}
              />
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    );
  },
};

export const EmptyConversation: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No messages yet. Start a conversation!</p>
        </div>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};
