"use client";

import React, { useState } from "react";
import { HelpCircleIcon, XIcon } from "lucide-react";

interface KeyboardShortcut {
  key: string;
  description: string;
}

interface KeyboardShortcutsHelpProps {
  className?: string;
}

/**
 * Component that displays keyboard shortcuts for table navigation
 * Shows a help icon that reveals shortcuts when clicked
 */
export function KeyboardShortcutsHelp({
  className = "",
}: KeyboardShortcutsHelpProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const shortcuts: KeyboardShortcut[] = [
    { key: "Tab", description: "Enter table navigation" },
    { key: "Arrow Keys", description: "Navigate between cells" },
    { key: "Enter", description: "Edit selected cell" },
    { key: "Enter", description: "Save changes" },
    { key: "Escape", description: "Cancel editing" },
    { key: "Tab (while editing)", description: "Save and move to next cell" },
  ];

  return (
    <div className={`relative inline-flex ${className}`}>
      <button 
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1" 
        aria-label="Keyboard navigation help"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <HelpCircleIcon className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md border border-gray-200 dark:border-gray-700 min-w-[240px] z-50"
          aria-live="polite"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Keyboard Shortcuts
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
              aria-label="Close keyboard shortcuts"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-1">
            {shortcuts.map((shortcut, index) => (
              <li key={`${shortcut.key}-${index}`} className="flex text-sm">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 mr-2 text-xs font-mono">
                  {shortcut.key}
                </kbd>
                <span className="text-gray-700 dark:text-gray-300">
                  {shortcut.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
