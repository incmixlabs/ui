import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Conversation, ConversationContent, ConversationScrollButton } from "../../src/3b-ai-elements/conversation"
import { Message, MessageContent, MessageAvatar } from "../../src/3b-ai-elements/message"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Conversation> = {
  title: "5 AI Elements/Conversation",
  component: Conversation,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ height: "600px", width: "100%" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleMessages = [
  { id: 1, from: "user" as const, content: "Hello! Can you help me with React?" },
  { id: 2, from: "assistant" as const, content: "Of course! I'd be happy to help you with React. What specific topic would you like to learn about?" },
  { id: 3, from: "user" as const, content: "I'm trying to understand the useEffect hook and when to use it." },
  { id: 4, from: "assistant" as const, content: "useEffect is a powerful hook that lets you perform side effects in functional components. Here are the main use cases:\n\n1. **Data fetching** - Making API calls when component mounts\n2. **Subscriptions** - Setting up event listeners\n3. **Cleanup** - Removing event listeners or canceling requests\n4. **DOM manipulation** - Direct DOM updates when needed\n\nThe key is understanding the dependency array - it controls when the effect runs." },
  { id: 5, from: "user" as const, content: "Can you show me a practical example?" },
  { id: 6, from: "assistant" as const, content: "Here's a practical example of fetching user data:\n\n```jsx\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    async function fetchUser() {\n      setLoading(true);\n      try {\n        const response = await fetch(`/api/users/${userId}`);\n        const userData = await response.json();\n        setUser(userData);\n      } catch (error) {\n        console.error('Failed to fetch user:', error);\n      } finally {\n        setLoading(false);\n      }\n    }\n\n    fetchUser();\n  }, [userId]); // Re-run when userId changes\n\n  if (loading) return <div>Loading...</div>;\n  return <div>Hello, {user?.name}!</div>;\n}\n```\n\nNotice how `userId` is in the dependency array - this ensures the effect runs again if the user ID changes." },
]

export const Basic: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <div className="space-y-4">
          {sampleMessages.slice(0, 2).map((msg) => {
            return (
            <Message key={msg.id} from={msg.from}>
                {msg.from === "assistant" && (
                  <MessageAvatar
                    src="https://github.com/vercel.png"
                    name="Assistant"
                />
              )}
              <MessageContent>{msg.content}</MessageContent>
              {msg.from === "user" && (
                <MessageAvatar
                  src="https://github.com/shadcn.png"
                  name="User"
                />
              )}
            </Message>
            )}
          )}
        </div>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
}

export const LongConversation: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <div className="space-y-4">
          {sampleMessages.map((msg) => (
            <Message key={msg.id} from={msg.from}>
              {msg.from === "assistant" && (
                <MessageAvatar
                  src="https://github.com/vercel.png"
                  name="Assistant"
                />
              )}
              <MessageContent>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </MessageContent>
              {msg.from === "user" && (
                <MessageAvatar
                  src="https://github.com/shadcn.png"
                  name="User"
                />
              )}
            </Message>
          ))}
        </div>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
}

export const WithScrollButton: Story = {
  render: () => {
    // Generate many messages to demonstrate scroll functionality
    const manyMessages = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      from: (i % 2 === 0 ? "user" : "assistant") as const,
      content: i % 2 === 0
        ? `User message ${Math.floor(i / 2) + 1}: This is a question about React.`
        : `Assistant response ${Math.floor(i / 2) + 1}: Here's a helpful answer about React concepts.`
    }))

    return (
      <Conversation>
        <ConversationContent>
          <div className="space-y-4">
            {manyMessages.map((msg) => (
              <Message key={msg.id} from={msg.from}>
                {msg.from === "assistant" && (
                  <MessageAvatar
                    src="https://github.com/vercel.png"
                    name="Assistant"
                  />
                )}
                <MessageContent>{msg.content}</MessageContent>
                {msg.from === "user" && (
                  <MessageAvatar
                    src="https://github.com/shadcn.png"
                    name="User"
                  />
                )}
              </Message>
            ))}
          </div>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    )
  },
}
