import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/tooltip"
import { Badge, Box, Flex, HoverCard } from "@radix-ui/themes"
import { CalendarDays, Clipboard, User } from "lucide-react"
import type { DateTime } from "luxon"
import { ProjectsImages } from "../../images"
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
      // For year view, we need to calculate based on months
      startIndex =
        startDate.month - 1 + (startDate.year - firstVisibleDate.year) * 12
      endIndex = endDate.month - 1 + (endDate.year - firstVisibleDate.year) * 12

      // Adjust if the task starts before the visible range
      if (startIndex < 0) startIndex = 0
      // Adjust if the task ends after the visible range
      if (endIndex >= dates.length) endIndex = dates.length - 1

      // Check if the task is completely outside the visible range
      if (endIndex < 0 || startIndex >= dates.length) {
        return { visible: false, left: 0, width: 0 }
      }
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
      width:
        view === "year" ? columnWidthValue : Math.max(width, columnWidthValue), // Ensure minimum width
    }
  }

  const { visible, left, width } = getTaskPosition()

  // If the task is not visible in the current date range, don't render it
  if (!visible) return null

  const getTaskColor = () => {
    // Get the base color from task.color or default to "blue"
    const baseColor = `${task.color}-10` || "blue"

    // For the light version, append "7" to the color name
    const lightColor = `${task.color}-7`

    return {
      base: baseColor,
      light: lightColor,
    }
  }
  const { base, light } = getTaskColor()

  return (
    <>
      <HoverCard.Root openDelay={200}>
        <HoverCard.Trigger
          className="group absolute flex h-10 cursor-pointer items-center rounded-md transition-all hover:brightness-95"
          style={{
            left: `${left}px`,
            width: `${width}px`,
            background: `linear-gradient(to right, var(--${base}) ${task.progress}%, var(--${light}) ${task.progress}%)`,
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
        </HoverCard.Trigger>
        <HoverCard.Content className="z-50 w-fit space-y-3 p-3 font-medium text-gray-11">
          <Flex align={"center"} gap={"3"}>
            <Box className="w-6">
              <Badge variant="solid" color={task.color} className=" h-4 w-4" />
            </Box>
            <p className="text-gray-12">{task.name}</p>
          </Flex>
          <Flex align={"center"} gap={"3"}>
            <Box className="w-6">
              <CalendarDays className="h-5 w-5" />
            </Box>
            <p>
              {task.startDate.toFormat("MMM d, yyyy")} -{" "}
              {task.endDate.toFormat("MMM d, yyyy")}
            </p>
          </Flex>
          <Flex align={"center"} gap={"3"}>
            <Box className="w-6">
              <Clipboard className="h-5 w-5" />
            </Box>
            <p>task 3/3</p>
          </Flex>
          <Flex align={"center"} gap={"3"}>
            <Box className="w-6">
              <User className=" h-5 w-5" />
            </Box>
            <Flex align={"center"} gap={"2"}>
              <img
                src={ProjectsImages.user}
                className="h-8 w-8 rounded-full"
                alt="task-assigned-image"
              />
              <img
                src={ProjectsImages.user}
                className="h-8 w-8 rounded-full"
                alt="task-assigned-image"
              />
              <img
                src={ProjectsImages.user}
                className="h-8 w-8 rounded-full"
                alt="task-assigned-image"
              />
            </Flex>
          </Flex>
          {/* <Box className="text-sm">
            <p >{task.name}</p>
            <p className="text-muted-foreground">Progress: {task.progress}%</p>
            <p className="text-muted-foreground">
              {task.startDate.toFormat("MMM d, yyyy")} -{" "}
              {task.endDate.toFormat("MMM d, yyyy")}
            </p>
          </Box> */}
        </HoverCard.Content>
      </HoverCard.Root>

      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild >
            <div
              className="group absolute flex h-8 cursor-pointer items-center rounded-md transition-all hover:brightness-95"
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
              <p >{task.name}</p>
              <p className="text-muted-foreground">Progress: {task.progress}%</p>
              <p className="text-muted-foreground">
                {task.startDate.toFormat("MMM d, yyyy")} -{" "}
                {task.endDate.toFormat("MMM d, yyyy")}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </>
  )
}
