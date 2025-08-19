"use client"

import { Button } from "@/base"
import { Select } from "@/base"
import { TextArea } from "@/base"
import { cn } from "@/utils/cn"
import type { ChatStatus } from "ai"
import { Loader2Icon, SendIcon, SquareIcon, XIcon } from "lucide-react"
import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
} from "react"
import { Children } from "react"

export type PromptInputProps = HTMLAttributes<HTMLFormElement>

export const PromptInput = ({ className, ...props }: PromptInputProps) => (
  <form
    className={cn(
      "w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm",
      className
    )}
    {...props}
  />
)

export type PromptInputTextareaProps = ComponentProps<typeof TextArea> & {
  minHeight?: number
  maxHeight?: number
}

export const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = "What would you like to know?",
  minHeight = 48,
  maxHeight = 164,
  ...props
}: PromptInputTextareaProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Allow newline
        return
      }

      // Submit on Enter (without Shift)
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) {
        form.requestSubmit()
      }
    }
  }

  return (
    <TextArea
      name="message"
      onChange={(e) => {
        onChange?.(e)
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  )
}

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement>

export const PromptInputToolbar = ({
  className,
  ...props
}: PromptInputToolbarProps) => (
  <div
    className={cn("flex items-center justify-between p-1", className)}
    {...props}
  />
)

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div
    className={cn(
      "flex items-center gap-1",
      "[&_button:first-child]:rounded-bl-xl",
      className
    )}
    {...props}
  />
)

export type PromptInputButtonProps = ComponentProps<typeof Button>

export const PromptInputButton = ({
  variant = "ghost",
  className,
  size,
  ...props
}: PromptInputButtonProps) => {
  const newSize = (size ?? Children.count(props.children) > 1) ? "2" : "1"

  return <Button size={newSize} variant={variant} {...props} />
}

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus
}

export const PromptInputSubmit = ({
  className,
  variant = "surface",
  size = "2",
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  let Icon = <SendIcon className="size-4" />

  if (status === "submitted") {
    Icon = <Loader2Icon className="size-4 animate-spin" />
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />
  }

  return (
    <Button
      className={cn("gap-1.5 rounded-lg", className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </Button>
  )
}

export type PromptInputModelSelectProps = ComponentProps<typeof Select.Root>

export const PromptInputModelSelect = (props: PromptInputModelSelectProps) => (
  <Select.Root {...props} />
)

export type PromptInputModelSelectTriggerProps = ComponentProps<
  typeof Select.Trigger
>

export const PromptInputModelSelectTrigger = ({
  className,
  ...props
}: PromptInputModelSelectTriggerProps) => <Select.Trigger {...props} />

export type PromptInputModelSelectContentProps = ComponentProps<
  typeof Select.Content
>

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: PromptInputModelSelectContentProps) => (
  <Select.Content className={cn(className)} {...props} />
)

export type PromptInputModelSelectItemProps = ComponentProps<typeof Select.Item>

export const PromptInputModelSelectItem = ({
  className,
  ...props
}: PromptInputModelSelectItemProps) => (
  <Select.Item className={cn(className)} {...props} />
)

export type PromptInputModelSelectValueProps = ComponentProps<
  typeof Select.Root
>

export const PromptInputModelSelectValue = ({
  ...props
}: PromptInputModelSelectValueProps) => (
  <Select.Root defaultValue={props.value} />
)
