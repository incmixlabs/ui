import { Box } from "@radix-ui/themes"
import { cn } from "@utils"
import { DateTime } from "luxon"
import type { ViewType } from "./gantt-chart"

interface CalendarHeaderProps {
  dates: DateTime[]
  view: ViewType
  columnWidth: string
}

export function CalendarHeader({
  dates,
  view,
  columnWidth,
}: CalendarHeaderProps) {
  const today = DateTime.now()

  const getDayName = (date: DateTime) => {
    return date.toFormat("ccc").toUpperCase()
  }

  const isToday = (date: DateTime) => {
    return date.hasSame(today, "day")
  }

  return (
    <Box className="sticky top-0 z-20 h-16 border-gray-5 border-b">
      <div className="grid h-full auto-cols-min grid-flow-col">
        {view === "year"
          ? // Year view shows months
            dates.map((date, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-full flex-col justify-center border-gray-5 border-r py-2 text-center",
                  columnWidth,
                  date.month === today.month && date.year === today.year
                    ? "bg-blue-500 text-white"
                    : ""
                )}
              >
                <div className="font-medium">{date.toFormat("MMM")}</div>
              </div>
            ))
          : // Week, Month, Quarter views show days
            dates.map((date, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-full flex-col items-center justify-center border-gray-5 border-r py-1",
                  columnWidth
                )}
              >
                <div className="text-gray-500 text-xs">{getDayName(date)}</div>
                <div
                  className={cn(
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-full font-medium",
                    isToday(date) ? "bg-blue-500 text-white" : ""
                  )}
                >
                  {date.day}
                </div>
              </div>
            ))}
      </div>
    </Box>
  )
}
