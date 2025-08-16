"use client"

import { Box, Button, Flex, Kbd, Popover, Text } from "@/src/1base"
import { HelpCircleIcon } from "lucide-react"
import React from "react"

interface KeyboardShortcut {
  key: string
  description: string
}

interface KeyboardShortcutsHelpProps {
  className?: string
}

/**
 * Component that displays keyboard shortcuts for table navigation
 * Shows a help icon that reveals shortcuts when clicked
 */
export function KeyboardShortcutsHelp({
  className = "",
}: KeyboardShortcutsHelpProps) {
  // Use useMemo to prevent recreation of shortcuts array on every render
  const shortcuts = React.useMemo<KeyboardShortcut[]>(
    () => [
      { key: "Tab", description: "Enter table navigation" },
      { key: "Arrow Keys", description: "Navigate between cells" },
      { key: "Enter (on selected cell)", description: "Start editing cell" },
      { key: "Enter (while editing)", description: "Save changes" },
      { key: "Escape", description: "Cancel editing" },
      { key: "Tab (while editing)", description: "Save and move to next cell" },
    ],
    []
  )

  return (
    <Box className={className}>
      <Popover.Root>
        <Popover.Trigger>
          <Button
            variant="ghost"
            size="1"
            aria-label="Keyboard navigation help"
          >
            <HelpCircleIcon />
          </Button>
        </Popover.Trigger>

        <Popover.Content side="bottom" align="end" sideOffset={8}>
          <Box width="240px">
            <Flex justify="between" align="center" mb="3">
              <Text size="2" weight="medium">
                Keyboard Shortcuts
              </Text>
            </Flex>

            <Box>
              {shortcuts.map((shortcut, index) => (
                <Flex
                  key={`${shortcut.key}-${index}`}
                  align="center"
                  gap="2"
                  mb="2"
                >
                  <Kbd size="1">
                    {shortcut.key}
                  </Kbd>
                  <Text size="2" color="gray">
                    {shortcut.description}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Popover.Content>
      </Popover.Root>
    </Box>
  )
}
