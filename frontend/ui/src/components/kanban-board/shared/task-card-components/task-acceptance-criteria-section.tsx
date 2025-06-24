import React from "react";
import { cn } from "@utils";

interface AcceptanceCriteriaItem {
  id: string;
  text: string;
}

interface TaskAcceptanceCriteriaSectionProps {
  acceptanceCriteria?: AcceptanceCriteriaItem[];
  className?: string;
}

export function TaskAcceptanceCriteriaSection({
  acceptanceCriteria,
  className,
}: TaskAcceptanceCriteriaSectionProps) {
  if (!acceptanceCriteria || acceptanceCriteria.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Acceptance Criteria
        </h3>
      </div>
      <ul className="space-y-1.5 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
        {acceptanceCriteria.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
