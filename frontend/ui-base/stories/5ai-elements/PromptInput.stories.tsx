import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue
} from "../../src/3b-ai-elements/prompt-input"
import { Theme } from "../../src/1base"
import { PaperclipIcon, MicIcon } from "lucide-react"

const meta: Meta<typeof PromptInput> = {
  title: "5 AI Elements/PromptInput",
  component: PromptInput,
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

export const Basic: Story = {
  render: () => (
    <PromptInput onSubmit={(e) => { e.preventDefault(); console.log("Form submitted"); }}>
      <PromptInputTextarea placeholder="Type your message..." />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton>
            <PaperclipIcon className="size-4" />
          </PromptInputButton>
          <PromptInputButton>
            <MicIcon className="size-4" />
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputToolbar>
    </PromptInput>
  ),
}

export const WithModelSelect: Story = {
  render: () => (
    <PromptInput onSubmit={(e) => { e.preventDefault(); console.log("Form submitted"); }}>
      <PromptInputTextarea placeholder="Ask me anything..." />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputModelSelect defaultValue="gpt-4">
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue placeholder="Select model" />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              <PromptInputModelSelectItem value="gpt-4">GPT-4</PromptInputModelSelectItem>
              <PromptInputModelSelectItem value="gpt-3.5">GPT-3.5</PromptInputModelSelectItem>
              <PromptInputModelSelectItem value="claude">Claude</PromptInputModelSelectItem>
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
          <PromptInputButton>
            <PaperclipIcon className="size-4" />
            Attach
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputToolbar>
    </PromptInput>
  ),
}

export const Loading: Story = {
  render: () => (
    <PromptInput onSubmit={(e) => { e.preventDefault(); }}>
      <PromptInputTextarea
        placeholder="Generating response..."
        disabled
        value="Explain quantum computing in simple terms"
      />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton disabled>
            <PaperclipIcon className="size-4" />
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit status="streaming" />
      </PromptInputToolbar>
    </PromptInput>
  ),
}

export const Error: Story = {
  render: () => (
    <PromptInput onSubmit={(e) => { e.preventDefault(); }}>
      <PromptInputTextarea
        placeholder="There was an error processing your request"
        value="Explain the meaning of life"
      />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputButton>
            <PaperclipIcon className="size-4" />
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit status="error" />
      </PromptInputToolbar>
    </PromptInput>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [message, setMessage] = React.useState("")
    const [status, setStatus] = React.useState<"idle" | "submitted" | "streaming" | "error">("idle")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!message.trim()) return

      setStatus("submitted")
      setTimeout(() => setStatus("streaming"), 500)
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 3000)
    }

    return (
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea
          placeholder="Try typing and submitting..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "streaming"}
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputModelSelect defaultValue="gpt-4">
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                <PromptInputModelSelectItem value="gpt-4">GPT-4</PromptInputModelSelectItem>
                <PromptInputModelSelectItem value="claude">Claude</PromptInputModelSelectItem>
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
            <PromptInputButton disabled={status === "streaming"}>
              <PaperclipIcon className="size-4" />
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} disabled={!message.trim()} />
        </PromptInputToolbar>
      </PromptInput>
    )
  },
}
