"use client"

import { Button } from "@components/button"

import {
  Box,
  type ButtonProps,
  DropdownMenu,
  Flex,
  Grid,
  IconButton,
  ScrollArea,
  Select,
} from "@radix-ui/themes"
import { cn } from "@utils"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Copy,
  Delete,
  Edit,
  EllipsisVertical,
  Pencil,
  Plus,
  SlidersHorizontal,
  Trash2,
  UserRoundPlus,
} from "lucide-react"
import { DateTime } from "luxon"
import { useEffect, useRef, useState } from "react"
import { CalendarHeader } from "./calendar-header"
import EditDropdown from "./edit-dropdown"
import { TaskBar } from "./task-bar"

export type ExtendedColorType = ButtonProps["color"]

export type ViewType = "week" | "month" | "quarter" | "year"

export interface Task {
  id: string
  name: string
  startDate: DateTime
  endDate: DateTime
  progress: number
  color?: ExtendedColorType
  subtasks?: Task[]
}

interface GanttChartProps {
  projectTasks: Task[]
  className?: string
}

export function GanttChart({ projectTasks, className }: GanttChartProps) {
  const [tasks, setTasks] = useState(projectTasks)
  const [view, setView] = useState<ViewType>("month")
  const [currentDate, setCurrentDate] = useState(DateTime.now())
  const [dates, setDates] = useState<DateTime[]>([])
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({})

  // Generate dates based on the selected view
  useEffect(() => {
    const generateDates = () => {
      const newDates: DateTime[] = []
      let startDate: DateTime
      let endDate: DateTime

      switch (view) {
        case "week":
          startDate = currentDate.startOf("week")
          endDate = currentDate.endOf("week")
          break
        case "month":
          startDate = currentDate.startOf("month")
          endDate = currentDate.endOf("month")
          break
        case "quarter":
          startDate = currentDate.startOf("quarter")
          endDate = currentDate.endOf("quarter")
          break
        case "year":
          startDate = currentDate.startOf("year")
          endDate = currentDate.endOf("year")
          // For year view, we'll show months instead of days
          for (let i = 0; i <= endDate.diff(startDate, "months").months; i++) {
            newDates.push(startDate.plus({ months: i }))
          }
          setDates(newDates)
          return
      }

      // For week, month, and quarter views, we'll show days
      for (let i = 0; i <= endDate.diff(startDate, "days").days; i++) {
        newDates.push(startDate.plus({ days: i }))
      }

      setDates(newDates)
    }

    generateDates()
  }, [currentDate, view])

  const handlePrevious = () => {
    switch (view) {
      case "week":
        setCurrentDate(currentDate.minus({ weeks: 1 }))
        break
      case "month":
        setCurrentDate(currentDate.minus({ months: 1 }))
        break
      case "quarter":
        setCurrentDate(currentDate.minus({ months: 3 }))
        break
      case "year":
        setCurrentDate(currentDate.minus({ years: 1 }))
        break
    }
  }

  const handleNext = () => {
    switch (view) {
      case "week":
        setCurrentDate(currentDate.plus({ weeks: 1 }))
        break
      case "month":
        setCurrentDate(currentDate.plus({ months: 1 }))
        break
      case "quarter":
        setCurrentDate(currentDate.plus({ months: 3 }))
        break
      case "year":
        setCurrentDate(currentDate.plus({ years: 1 }))
        break
    }
  }

  const handleViewChange = (value: string) => {
    setView(value as ViewType)
  }

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  const getColumnWidth = () => {
    switch (view) {
      case "week":
        return "w-24"
      case "month":
        return "w-20"
      case "quarter":
        return "w-16"
      case "year":
        return "w-28"
      default:
        return "w-20"
    }
  }

  return (
    <div className={cn("grid w-full grid-rows-[auto_1fr]", className)}>
      <Flex justify={"between"} gap={"4"} className="mb-4">
        <Flex align={"center"} gap={"2"}>
          <Button
            variant="soft"
            onClick={handlePrevious}
            aria-label="Previous period"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="soft" onClick={handleNext} aria-label="Next period">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Flex>
        <h2 className="ml-2 font-semibold text-xl">
          {view === "week" &&
            `Week of ${currentDate.startOf("week").toFormat("LLL d, yyyy")}`}
          {view === "month" && currentDate.toFormat("LLLL yyyy")}
          {view === "quarter" &&
            `Q${Math.ceil(currentDate.month / 3)} ${currentDate.year}`}
          {view === "year" && currentDate.year.toString()}
        </h2>
        <Flex align={"center"}>
          <Select.Root
            value={view}
            onValueChange={handleViewChange}
            defaultValue="Month"
          >
            <Select.Trigger className="w-[120px]" placeholder="View" />
            <Select.Content>
              <Select.Item value="week">Week</Select.Item>
              <Select.Item value="month">Month</Select.Item>
              <Select.Item value="quarter">Quarter</Select.Item>
              <Select.Item value="year">Year</Select.Item>
            </Select.Content>
          </Select.Root>
          <div className="flex items-center gap-2 pl-2">
            <IconButton
              color="gray"
              variant="soft"
              onClick={() => console.log("Filter functionality coming soon")}
              className="h-9 w-9 cursor-pointer"
            >
              <SlidersHorizontal size={20} />
            </IconButton>

            <Button
              onClick={() =>
                console.log("Add project functionality coming soon")
              }
              variant="solid"
              className="h-9 cursor-pointer"
            >
              <Plus size={16} />
              Add Project
            </Button>
          </div>
        </Flex>
      </Flex>

      <div className=" overflow-hidden rounded-md border-gray-5 border-x border-t">
        <div className="grid grid-cols-[auto_1fr]">
          {/* Task names column - fixed */}
          <Box className="w-80 border-gray-5 border-r">
            <div className="flex h-16 items-center border-gray-5 border-b p-2 px-4">
              <span className="font-medium">Project Name</span>
            </div>

            {tasks.map((task) => (
              <div key={`task-name-${task.id}`}>
                <Box
                  className={cn(
                    "relative h-16 w-full cursor-pointer rounded-none border-gray-5 border-b bg-transparent text-gray-11",
                    expandedProjects[task.id] && "bg-gray-3 text-gray-12"
                  )}
                >
                  <span
                    className="absolute top-0 left-0 h-full w-1.5"
                    style={{ background: task.color }}
                  />
                  <Button
                    onClick={() => toggleProjectExpand(task.id)}
                    className="flex h-full w-full items-center justify-start gap-2 bg-transparent p-2 pl-4 text-gray-12"
                  >
                    {task.subtasks && task.subtasks.length > 0 ? (
                      <>
                        {expandedProjects[task.id] ? (
                          <ChevronDown className="h-6 w-6" />
                        ) : (
                          <ChevronRight className="h-6 w-6" />
                        )}
                      </>
                    ) : (
                      <div className="mr-2 w-6" />
                    )}
                    <span className="truncate font-medium">{task.name}</span>
                  </Button>
                  <EditDropdown tasks={tasks} task={task} setTasks={setTasks} />
                </Box>

                {expandedProjects[task.id] &&
                  task.subtasks?.map((subtask, index) => (
                    <div
                      key={`subtask-name-${subtask.id}`}
                      className={cn(
                        "flex h-16 items-center bg-gray-3 p-2 pl-8",
                        index === (task.subtasks?.length ?? 0) - 1 &&
                          "border-gray-5 border-b"
                      )}
                    >
                      <span className="truncate">{subtask.name}</span>
                    </div>
                  ))}
              </div>
            ))}
          </Box>

          {/* Timeline content - scrollable */}
          <ScrollArea type="always" className="h-full" scrollbars="horizontal">
            <Box className="min-w-max">
              <CalendarHeader
                dates={dates}
                view={view}
                columnWidth={getColumnWidth()}
              />

              <div className="relative">
                {tasks.map((task) => (
                  <div key={`task-bar-${task.id}`}>
                    <div className="relative flex h-16 flex-col justify-center border-gray-5 border-b">
                      <TaskBar
                        task={task}
                        dates={dates}
                        view={view}
                        columnWidth={getColumnWidth()}
                      />
                    </div>

                    {expandedProjects[task.id] &&
                      task.subtasks?.map((subtask) => (
                        <div
                          key={`subtask-bar-${subtask.id}`}
                          className="relative flex h-16 flex-col justify-center border-gray-5 border-b"
                        >
                          <TaskBar
                            task={subtask}
                            dates={dates}
                            view={view}
                            columnWidth={getColumnWidth()}
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </Box>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
