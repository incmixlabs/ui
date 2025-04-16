import { Box, Grid, Text } from "@base"
import { cn } from "@utils/cn"
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
      <Grid height="full" columns="min-content" flow="column">
        {view === "year"
          ? dates.map((date) => (
              <Box
                key={`year-${date.toISODate()}`}
                className={cn(
                  "flex h-full flex-col items-center justify-center border-gray-5 border-r py-1",
                  columnWidth,
                  date.month === today.month && date.year === today.year
                    ? "bg-blue-500 text-white"
                    : ""
                )}
              >
                <Text as={"span"} className="font-medium">
                  {date.toFormat("MMM")}
                </Text>
              </Box>
            ))
          : dates.map((date) => (
              <Box
                key={`year-${date.toISODate()}`}
                className={cn(
                  "flex h-full flex-col items-center justify-center border-gray-5 border-r py-1",
                  columnWidth
                )}
              >
                <Text as={"span"} className="text-gray-500 text-xs">
                  {getDayName(date)}
                </Text>
                <Box
                  className={cn(
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-full font-medium",
                    isToday(date) ? "bg-blue-500 text-white" : ""
                  )}
                >
                  {date.day}
                </Box>
              </Box>
            ))}
      </Grid>
    </Box>
  )
}
