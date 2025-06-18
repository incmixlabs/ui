// task-card-components/task-dates-section.tsx
import { Calendar } from "lucide-react"
import { SmartDatetimeInput } from "@components/datetime-picker"
import type { TaskDatesSectionProps } from "./utils/types"

export function TaskDatesSection({
  currentTask,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: TaskDatesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Dates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
          <div className="relative">
            <SmartDatetimeInput
              value={startDate || undefined}
              onValueChange={onStartDateChange}
              showCalendar={true}
              showTimePicker={false}
              placeholder="Set start date"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
          <div className="relative">
            <SmartDatetimeInput
              value={endDate || undefined}
              onValueChange={onEndDateChange}
              showCalendar={true}
              showTimePicker={false}
              placeholder="Set due date"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}