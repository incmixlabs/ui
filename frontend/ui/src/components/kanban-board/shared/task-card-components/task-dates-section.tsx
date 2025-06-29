// task-card-components/task-dates-section.tsx
import { Calendar } from "lucide-react"
import { SmartDatetimeInput } from "@components/datetime-picker"
import type { TaskDatesSectionProps } from "./utils/types"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
  X,
} from "@incmix/ui";
export function TaskDatesSection({
  currentTask,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: TaskDatesSectionProps) {
  return (
    <Box className="space-y-2 py-4  px-3 border-gray-1 dark:border-gray-3 border-t-2">
      {/* <Heading size={"4"} className=" font-medium text-gray-12">
        Dates
      </Heading> */}
      <Flex className="gap-4 flex-col">
        <div className="space-y-2">
          <Heading size={"4"} className="text-gray-12 uppercase">
            Start Date
          </Heading>
          <div className="relative">
            <SmartDatetimeInput
              value={startDate || undefined}
              onValueChange={onStartDateChange}
              showCalendar={true}
              showTimePicker={false}
              className="bg-gray-6"
              placeholder="Set start date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Heading size={"4"} className="text-gray-12 uppercase">
            Due Date
          </Heading>
          <div className="relative">
            <SmartDatetimeInput
              value={endDate || undefined}
              onValueChange={onEndDateChange}
              showCalendar={true}
              showTimePicker={false}
              className="bg-gray-6"
              placeholder="Set due date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </Flex>
    </Box>
  )
}