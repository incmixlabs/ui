import React from "react"

import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes"
import { cn } from "@utils"
import { Ellipsis, CloudLightningIcon as Lightning, Zap } from "lucide-react"
import { useState } from "react"

// Define types for our data structure
interface Task {
  day: string
  time: string
  hasLightning: boolean
  description?: string
}

interface ImmediateTask {
  day: string
  time: string
}

export default function PostingCalendar() {
  // Data arrays
  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]
  const hoursOfDay = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ]

  // All tasks data
  const tasks: Task[] = [
    {
      day: "TU",
      time: "2AM",
      hasLightning: false,
      description: "Schedule social media posts",
    },
    {
      day: "TU",
      time: "9AM",
      hasLightning: true,
      description: "Urgent: Team meeting",
    },
    {
      day: "TU",
      time: "3PM",
      hasLightning: false,
      description: "Review content drafts",
    },
    {
      day: "TU",
      time: "5PM",
      hasLightning: false,
      description: "Send weekly newsletter",
    },
    {
      day: "TU",
      time: "8PM",
      hasLightning: true,
      description: "Urgent: Publish press release",
    },
    {
      day: "WE",
      time: "11AM",
      hasLightning: false,
      description: "Content planning session",
    },
    {
      day: "WE",
      time: "5PM",
      hasLightning: true,
      description: "Urgent: Client deliverable",
    },
    {
      day: "WE",
      time: "10PM",
      hasLightning: false,
      description: "Schedule weekend posts",
    },
    {
      day: "TH",
      time: "3AM",
      hasLightning: false,
      description: "International market posts",
    },
    {
      day: "TH",
      time: "10AM",
      hasLightning: false,
      description: "Team check-in",
    },
    {
      day: "TH",
      time: "1PM",
      hasLightning: false,
      description: "Content review",
    },
    {
      day: "TH",
      time: "6PM",
      hasLightning: true,
      description: "Urgent: Crisis response",
    },
    {
      day: "FR",
      time: "2AM",
      hasLightning: true,
      description: "Urgent: International launch",
    },
    {
      day: "FR",
      time: "10AM",
      hasLightning: true,
      description: "Urgent: Executive review",
    },
    {
      day: "FR",
      time: "12PM",
      hasLightning: false,
      description: "Weekly report",
    },
    {
      day: "FR",
      time: "6PM",
      hasLightning: false,
      description: "Weekend content prep",
    },
    {
      day: "SA",
      time: "4AM",
      hasLightning: false,
      description: "Scheduled post",
    },
    {
      day: "SA",
      time: "10AM",
      hasLightning: false,
      description: "Weekend engagement",
    },
    {
      day: "SA",
      time: "4PM",
      hasLightning: false,
      description: "Performance review",
    },
    {
      day: "SA",
      time: "10PM",
      hasLightning: false,
      description: "Sunday prep",
    },
    {
      day: "SU",
      time: "12PM",
      hasLightning: false,
      description: "Weekly content plan",
    },
    { day: "SU", time: "5PM", hasLightning: false, description: "Monday prep" },
  ]

  // Highlighted tasks state
  const [_highlightedTasks, setHighlightedTasks] = useState<{
    day: string
    time: string
    count: number
  } | null>({
    day: "FR",
    time: "11AM",
    count: 2,
  })

  // Helper functions
  const getTasksAtTime = (day: string, time: string) => {
    return tasks.filter((task) => task.day === day && task.time === time)
  }

  const handleCellClick = (day: string, time: string) => {
    const tasksAtTime = getTasksAtTime(day, time)

    if (tasksAtTime.length > 0) {
      setHighlightedTasks({
        day,
        time,
        count: tasksAtTime.length,
      })
    } else {
      setHighlightedTasks(null)
    }
  }

  const _getDayName = (shortDay: string) => {
    const dayMap: Record<string, string> = {
      MO: "Monday",
      TU: "Tuesday",
      WE: "Wednesday",
      TH: "Thursday",
      FR: "Friday",
      SA: "Saturday",
      SU: "Sunday",
    }
    return dayMap[shortDay] || shortDay
  }

  return (
    <>
      <Flex justify={"between"} align={"center"} className="mb-4">
        <Heading size={"5"}>Posting Tasks</Heading>
        <IconButton variant="ghost">
          <Ellipsis />
        </IconButton>
      </Flex>

      <Text as="p">
        Immediate tasks: <Text className="underline">Wednesday at 10 AM</Text> /{" "}
        <Text className="underline">Wednesday at 4 PM</Text>
      </Text>

      <Box className="relative overflow-x-auto">
        <Grid className="grid grid-cols-[auto_repeat(24,minmax(40px,1fr))] gap-1">
          {/* Empty cell for the corner */}
          <Box className="h-10" />

          {/* Time headers */}
          {hoursOfDay.map((hour) => (
            <Flex
              key={hour}
              align={"end"}
              justify={"center"}
              className=" h-10 pb-1 text-center text-gray-10 text-xs"
            >
              {hour}
            </Flex>
          ))}

          {/* Day rows with cells */}
          {daysOfWeek.map((day) => (
            <React.Fragment key={day}>
              {/* Day label */}
              <Flex
                align={"center"}
                justify={"end"}
                className="h-10 pr-2 text-gray-10 text-sm"
              >
                {day}
              </Flex>

              {/* Time cells for this day */}
              {hoursOfDay.map((time) => {
                const tasksAtTime = getTasksAtTime(day, time)
                const hasTask = tasksAtTime.length > 0
                const hasLightning =
                  hasTask && tasksAtTime.some((task) => task.hasLightning)

                return (
                  <Tooltip
                    key={`${day}-${time}`}
                    content={
                      hasTask
                        ? tasksAtTime.map((task, i) => (
                            <div key={i} className="py-1">
                              {task.description}
                              {task.hasLightning && " (Urgent)"}
                            </div>
                          ))
                        : "No tasks scheduled"
                    }
                    side="top"
                  >
                    <Box
                      className={cn(
                        "flex h-10 w-full cursor-pointer items-center justify-center rounded",
                        hasTask
                          ? "bg-dashboard-orange/30"
                          : "bg-gray-3 hover:bg-gray-5",
                        hasLightning &&
                          "bg-dashboard-orange/80 hover:bg-dashboard-orange"
                      )}
                      onClick={() => handleCellClick(day, time)}
                    >
                      {hasLightning && (
                        <Zap size={16} className="fill-white stroke-white" />
                      )}
                    </Box>
                  </Tooltip>
                )
              })}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </>
  )
}
