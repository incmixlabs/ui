"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { useThemeStore } from "@incmix/store/local"
import { IconButton } from "@incmix/ui/icon-button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@incmix/ui/tooltip"

export function ModeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === "dark"
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <IconButton
            onClick={() => toggleTheme()}
            color="gray"
            variant="outline"
            size="2"
          >
            {isDark && <SunIcon width="18" height="18" />}
            {!isDark && <MoonIcon width="18" height="18" />}
            <span className="sr-only">Switch Theme</span>
          </IconButton>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
