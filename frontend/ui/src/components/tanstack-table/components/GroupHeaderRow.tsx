"use client";

import React, { memo } from "react";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";

import { Table } from "@shadcn";
import { Checkbox } from "@base";

interface GroupHeaderRowProps {
  groupKey: string;
  rowCount: number;
  isCollapsed: boolean;
  toggleCollapsed: (groupKey: string) => void;
  colSpan: number;
  // Custom render function
  renderGroupHeader?: (groupValue: string, count: number) => React.ReactNode;
  // Group-specific selection props
  groupSelectProps?: {
    isAllRowsSelected: boolean;
    isSomeRowsSelected: boolean;
    toggleAllRowsSelected: (value: boolean) => void;
  };
}

// Define category styles mapping using standardized identifiers
// This should match your design system
const categoryStyleMap: Record<string, { color: string, textColor: string, bgColor: string, label?: string }> = {
  // Standard identifiers
  "todo": { color: "bg-purple-500", textColor: "text-purple-800", bgColor: "bg-purple-100", label: "Todo" },
  "in_design": { color: "bg-violet-500", textColor: "text-violet-800", bgColor: "bg-violet-100", label: "In Design" },
  "in_review": { color: "bg-orange-500", textColor: "text-orange-800", bgColor: "bg-orange-100", label: "In Review" },
  "working": { color: "bg-blue-500", textColor: "text-blue-800", bgColor: "bg-blue-100", label: "Working" },
  "done": { color: "bg-green-500", textColor: "text-green-800", bgColor: "bg-green-100", label: "Done" },
  
  // Legacy support for display values (for backward compatibility)
  "Todo": { color: "bg-purple-500", textColor: "text-purple-800", bgColor: "bg-purple-100" },
  "In Design": { color: "bg-violet-500", textColor: "text-violet-800", bgColor: "bg-violet-100" },
  "In Review": { color: "bg-orange-500", textColor: "text-orange-800", bgColor: "bg-orange-100" },
  "Working": { color: "bg-blue-500", textColor: "text-blue-800", bgColor: "bg-blue-100" },
  "Done": { color: "bg-green-500", textColor: "text-green-800", bgColor: "bg-green-100" }
};

/**
 * Component for rendering a group header row in the table that matches the design
 * in the provided screenshot with colored bullets and expand/collapse icons
 */
function GroupHeaderRowComponent({
  groupKey,
  rowCount,
  isCollapsed,
  toggleCollapsed,
  colSpan,
  renderGroupHeader,
  groupSelectProps,
}: GroupHeaderRowProps) {
  // Handle click on the group header
  const handleToggleClick = () => {
    toggleCollapsed(groupKey);
  };

  // Prevent checkbox click from toggling group collapse
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Get the styles for this category or use defaults
  const styles = categoryStyleMap[groupKey] || { color: "bg-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-50" };
  const bulletColor = styles.color;
  const textColor = styles.textColor;
  const bgColor = styles.bgColor;
  
  // Use the display label if available, otherwise use the groupKey
  const displayLabel = styles.label || groupKey;

  return (
    <Table.Row
      className={`group-header border-b-0 cursor-pointer hover:opacity-90 ${bgColor}`}
      onClick={handleToggleClick}
      role="row"
      aria-expanded={!isCollapsed}
      data-state={isCollapsed ? "collapsed" : "expanded"}
    >
      <Table.Cell
        colSpan={colSpan}
        className="p-0 relative"
      >
        {renderGroupHeader ? (
          // Use custom renderer if provided
          renderGroupHeader(groupKey, rowCount)
        ) : (
          // Default rendering
          <div className="flex justify-between items-center h-10 px-3 w-full">
            {/* Left section: checkbox, bullet, name, count */}
            <div className="flex items-center">
              {/* Group-specific checkbox for row selection */}
              {groupSelectProps && (
                <Checkbox
                  checked={
                    groupSelectProps.isAllRowsSelected ||
                    (groupSelectProps.isSomeRowsSelected && "indeterminate")
                  }
                  onCheckedChange={(value) => groupSelectProps.toggleAllRowsSelected(!!value)}
                  onClick={handleCheckboxClick}
                  aria-label={`Select all rows in ${displayLabel} group`}
                  className="mr-2 translate-y-[2px]"
                />
              )}
            
              <span className={`h-2 w-2 rounded-full ${bulletColor} mr-2`}></span>
              
              {/* Category name */}
              <span className={`font-medium ${textColor}`}>{displayLabel}</span>
              
              {/* Count */}
              <span className="text-muted-foreground ml-1">  
                {rowCount}
              </span>
            </div>

            {/* Right section: Only chevron icon for expand/collapse */}
            <div className="flex items-center">
              {/* Expand/collapse button with chevron icon and smooth rotation */}
              <div className={`transition-transform duration-200 ease-in-out ${isCollapsed ? '' : 'rotate-90'}`}>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </Table.Cell>
    </Table.Row>
  );
}

// Export memoized version for better performance
export const GroupHeaderRow = memo(GroupHeaderRowComponent);
