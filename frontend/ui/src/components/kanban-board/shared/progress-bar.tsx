import React from "react";

interface ProgressBarProps {
  completedItems: number;
  totalItems: number;
}

export function ProgressBar({ completedItems, totalItems }: ProgressBarProps) {
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">
        {completedItems} of {totalItems} items complete
      </p>
    </div>
  );
}
