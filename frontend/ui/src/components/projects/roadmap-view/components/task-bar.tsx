import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/tooltip"
import type { DateTime } from "luxon"
import type { Task, ViewType } from "./gantt-chart"

interface TaskBarProps {
  task: Task
  dates: DateTime[]
  view: ViewType
  columnWidth: string
}

export function TaskBar({ task, dates, view, columnWidth }: TaskBarProps) {
  if (!dates.length) return null

  const getTaskPosition = () => {
    const startDate = task.startDate
    const endDate = task.endDate

    // If dates array is empty or task dates are outside the visible range, don't show the task
    if (dates.length === 0) return { visible: false, left: 0, width: 0 }

    // Check if the task is completely outside the visible date range
    const firstVisibleDate = dates[0]
    const lastVisibleDate = dates[dates.length - 1]

    // For year view, we need to compare by month and year
    if (view === "year") {
      const isBeforeVisibleRange =
        endDate.year < firstVisibleDate.year ||
        (endDate.year === firstVisibleDate.year &&
          endDate.month < firstVisibleDate.month)

      const isAfterVisibleRange =
        startDate.year > lastVisibleDate.year ||
        (startDate.year === lastVisibleDate.year &&
          startDate.month > lastVisibleDate.month)

      if (isBeforeVisibleRange || isAfterVisibleRange) {
        return { visible: false, left: 0, width: 0 }
      }
    } else {
      // For other views, compare by day, month, and year
      const isBeforeVisibleRange = endDate < firstVisibleDate.startOf("day")
      const isAfterVisibleRange = startDate > lastVisibleDate.endOf("day")

      if (isBeforeVisibleRange || isAfterVisibleRange) {
        return { visible: false, left: 0, width: 0 }
      }
    }

    // Find the indices of the start and end dates in the dates array
    let startIndex = -1
    let endIndex = -1

    if (view === "year") {
      // For year view, match by month
      startIndex = dates.findIndex(
        (date) =>
          (date.month === startDate.month && date.year === startDate.year) ||
          date.year < startDate.year ||
          (date.year === startDate.year && date.month < startDate.month)
      )

      if (startIndex === -1) startIndex = 0

      endIndex = dates.findIndex(
        (date) =>
          (date.month === endDate.month && date.year === endDate.year) ||
          date.year > endDate.year ||
          (date.year === endDate.year && date.month > endDate.month)
      )

      if (endIndex === -1) endIndex = dates.length - 1
      else endIndex = Math.max(0, endIndex - 1)
    } else {
      // For other views, match by day
      // Find the closest date for start
      startIndex = dates.findIndex(
        (date) => date.hasSame(startDate, "day") || date > startDate
      )

      if (startIndex === -1) startIndex = 0

      // Find the closest date for end
      for (let i = 0; i < dates.length; i++) {
        if (dates[i].hasSame(endDate, "day") || dates[i] > endDate) {
          endIndex = i > 0 ? i - 1 : 0
          break
        }
      }

      if (endIndex === -1) endIndex = dates.length - 1
    }

    // Calculate the width based on column width
    const columnWidthValue = Number.parseInt(columnWidth.replace("w-", "")) * 4
    const width = (endIndex - startIndex + 1) * columnWidthValue

    return {
      visible: true,
      left: startIndex * columnWidthValue,
      width: Math.max(width, columnWidthValue), // Ensure minimum width
    }
  }

  const { visible, left, width } = getTaskPosition()

  // If the task is not visible in the current date range, don't render it
  if (!visible) return null

  const getTaskColor = () => {
    const colors: Record<string, { base: string; light: string }> = {
      blue: {
        base: "rgb(0, 144, 255)",
        light: "rgb(179, 219, 255)",
      },
      green: {
        base: "rgb(0, 171, 142)",
        light: "rgb(178, 223, 213)",
      },
      red: {
        base: "rgb(229, 83, 50)",
        light: "rgb(247, 201, 189)",
      },
      orange: {
        base: "rgb(255, 139, 0)",
        light: "rgb(255, 218, 179)",
      },
      purple: {
        base: "rgb(134, 0, 255)",
        light: "rgb(214, 179, 255)",
      },
    }

    return colors[task.color || "blue"] || colors.blue
  }

  const { base, light } = getTaskColor()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="group absolute my-2 flex h-8 cursor-pointer items-center rounded-md transition-all hover:brightness-95"
            style={{
              left: `${left}px`,
              width: `${width}px`,
              background: `linear-gradient(to right, ${base} ${task.progress}%, ${light} ${task.progress}%)`,
            }}
          >
            <div className="flex w-full items-center justify-between px-3">
              <span className="truncate font-medium text-sm text-white group-hover:text-white/90">
                {task.name}
              </span>
              <span className="rounded px-2 py-0.5 font-medium text-sm text-white/90">
                {task.progress}%
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">{task.name}</p>
            <p className="text-muted-foreground">Progress: {task.progress}%</p>
            <p className="text-muted-foreground">
              {task.startDate.toFormat("MMM d, yyyy")} -{" "}
              {task.endDate.toFormat("MMM d, yyyy")}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
