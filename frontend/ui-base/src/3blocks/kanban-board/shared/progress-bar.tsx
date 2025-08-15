import React from "react"

interface ProgressBarProps {
  completedItems: number
  totalItems: number
}

export function ProgressBar({ completedItems, totalItems }: ProgressBarProps) {
  const progressPercentage =
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-gray-500 text-xs">
        {completedItems} of {totalItems} items complete
      </p>
    </div>
  )
}
