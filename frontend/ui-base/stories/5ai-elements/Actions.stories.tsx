import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Actions, Action } from "../../src/3b-ai-elements/actions"
import { Theme } from "../../src/1base"
import {
  CopyIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  RefreshCwIcon,
  EditIcon,
  ShareIcon,
  BookmarkIcon,
  MoreHorizontalIcon
} from "lucide-react"

const meta: Meta<typeof Actions> = {
  title: "5 AI Elements/Actions",
  component: Actions,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px" }}>
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
    <Actions>
      <Action tooltip="Copy response" className="mr-2" fillColor="blue" toggle>
        <CopyIcon className="size-4" />
      </Action>
      <Action tooltip="Good response" className="mr-1">
        <ThumbsUpIcon className="size-4" />
      </Action>
      <Action tooltip="Poor response" className="mr-1">
        <ThumbsDownIcon className="size-4" />
      </Action>
      <Action tooltip="Regenerate response">
        <RefreshCwIcon className="size-4" />
      </Action>
    </Actions>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [feedback, setFeedback] = React.useState<string | null>(null)
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="space-y-4">
        {feedback && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
            Action: {feedback}
          </div>
        )}
        {copied && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
            ✅ Copied to clipboard!
          </div>
        )}
        <Actions>
          <Action
            tooltip="Copy response"
            onClick={handleCopy}
          >
            <CopyIcon className="size-4" />
          </Action>
          <Action
            tooltip="Good response"
            onClick={() => setFeedback("Positive feedback recorded")}
          >
            <ThumbsUpIcon className="size-4" />
          </Action>
          <Action
            tooltip="Poor response"
            onClick={() => setFeedback("Negative feedback recorded")}
          >
            <ThumbsDownIcon className="size-4" />
          </Action>
          <Action
            tooltip="Regenerate response"
            onClick={() => setFeedback("Regenerating response...")}
          >
            <RefreshCwIcon className="size-4" />
          </Action>
        </Actions>
      </div>
    )
  },
}

export const ExtendedActions: Story = {
  render: () => {
    const [actionTaken, setActionTaken] = React.useState<string | null>(null)

    return (
      <div className="space-y-4">
        {actionTaken && (
          <div className="p-3 bg-gray-50 border rounded-md text-sm">
            Last action: {actionTaken}
          </div>
        )}
        <Actions>
          <Action
            tooltip="Copy to clipboard"
            onClick={() => setActionTaken("Copied")}
          >
            <CopyIcon className="size-4" />
          </Action>
          <Action
            tooltip="Edit response"
            onClick={() => setActionTaken("Editing")}
          >
            <EditIcon className="size-4" />
          </Action>
          <Action
            tooltip="Share response"
            onClick={() => setActionTaken("Sharing")}
          >
            <ShareIcon className="size-4" />
          </Action>
          <Action
            tooltip="Bookmark response"
            onClick={() => setActionTaken("Bookmarked")}
          >
            <BookmarkIcon className="size-4" />
          </Action>
          <Action
            tooltip="More options"
            onClick={() => setActionTaken("More options opened")}
          >
            <MoreHorizontalIcon className="size-4" />
          </Action>
        </Actions>
      </div>
    )
  },
}

export const WithLabels: Story = {
  render: () => (
    <Actions>
      <Action tooltip="Copy the entire response to your clipboard" label="Copy">
        <CopyIcon className="size-4" />
      </Action>
      <Action tooltip="Mark this response as helpful" label="Like">
        <ThumbsUpIcon className="size-4" />
      </Action>
      <Action tooltip="Mark this response as unhelpful" label="Dislike">
        <ThumbsDownIcon className="size-4" />
      </Action>
      <Action tooltip="Generate a new response" label="Regenerate">
        <RefreshCwIcon className="size-4" />
      </Action>
    </Actions>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <Actions className="justify-center bg-muted/50 p-2 rounded-lg">
      <Action
        tooltip="Copy"
        variant="outline"
        className="hover:bg-green-50 hover:text-green-600 hover:border-green-200"
      >
        <CopyIcon className="size-4" />
      </Action>
      <Action
        tooltip="Like"
        variant="outline"
        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
      >
        <ThumbsUpIcon className="size-4" />
      </Action>
      <Action
        tooltip="Dislike"
        variant="outline"
        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
      >
        <ThumbsDownIcon className="size-4" />
      </Action>
      <Action
        tooltip="Regenerate"
        variant="outline"
        className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
      >
        <RefreshCwIcon className="size-4" />
      </Action>
    </Actions>
  ),
}

export const SingleAction: Story = {
  render: () => (
    <Actions>
      <Action tooltip="Save this response for later">
        <BookmarkIcon className="size-4" />
      </Action>
    </Actions>
  ),
}

export const InMessageContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-secondary rounded-lg">
        <p className="text-sm mb-3">
          Here's a comprehensive explanation of React hooks and how they work in functional components...
        </p>
        <Actions>
          <Action tooltip="Copy response">
            <CopyIcon className="size-4" />
          </Action>
          <Action tooltip="Good response">
            <ThumbsUpIcon className="size-4" />
          </Action>
          <Action tooltip="Poor response">
            <ThumbsDownIcon className="size-4" />
          </Action>
          <Action tooltip="Regenerate">
            <RefreshCwIcon className="size-4" />
          </Action>
        </Actions>
      </div>
    </div>
  ),
}
