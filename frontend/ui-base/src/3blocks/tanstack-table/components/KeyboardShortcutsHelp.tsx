"use client"

import { Button } from "@/src/1base"
import { HelpCircleIcon, XIcon } from "lucide-react"
import React, { useState } from "react"

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
  const [isOpen, setIsOpen] = useState(false)

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
    <div className={`relative inline-flex ${className}`}>
      <Button
        variant="ghost"
        size="1"
        srLabel="Keyboard navigation help"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <HelpCircleIcon className="h-5 w-5" />
      </Button>

      {isOpen && (
        <dialog
          open
          className="absolute top-full right-0 z-50 mt-2 min-w-[240px] rounded-md border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800"
          aria-live="polite"
          aria-label="Keyboard shortcuts"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="font-medium text-gray-800 text-sm dark:text-gray-200">
              Keyboard Shortcuts
            </div>
            <Button
              variant="ghost"
              size="1"
              onClick={() => setIsOpen(false)}
              srLabel="Close keyboard shortcuts"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <ul className="space-y-1">
            {shortcuts.map((shortcut, index) => (
              <li key={`${shortcut.key}-${index}`} className="flex text-sm">
                <kbd className="mr-2 rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs dark:border-gray-600 dark:bg-gray-700">
                  {shortcut.key}
                </kbd>
                <span className="text-gray-700 dark:text-gray-300">
                  {shortcut.description}
                </span>
              </li>
            ))}
          </ul>
        </dialog>
      )}
    </div>
  )
}
