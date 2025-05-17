"use client";

import React, { memo } from "react";
import { Minus, Plus, PlusCircle } from "lucide-react";

import { Table } from "@shadcn";

interface GroupHeaderRowProps {
  groupKey: string;
  rowCount: number;
  isCollapsed: boolean;
  toggleCollapsed: (groupKey: string) => void;
  colSpan: number;
  // Custom render function
  renderGroupHeader?: (groupValue: string, count: number) => React.ReactNode;
}

// Define status styles mapping
// This should match your design system
const statusStyleMap: Record<string, { color: string, textColor: string, bgColor: string }> = {
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
}: GroupHeaderRowProps) {
  // Handle click on the group header
  const handleToggleClick = () => {
    toggleCollapsed(groupKey);
  };

  // Get the styles for this status category or use defaults
  const styles = statusStyleMap[groupKey] || { color: "bg-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-50" };
  const bulletColor = styles.color;
  const textColor = styles.textColor;
  const bgColor = styles.bgColor;

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
        <div className="flex justify-between items-center h-10 px-3 w-full">
          {/* Left section: bullet, name, count */}
          <div className="flex items-center">
            <span className={`h-2 w-2 rounded-full ${bulletColor} mr-2`}></span>
            
            {/* Category name */}
            <span className={`font-medium ${textColor}`}>{groupKey}</span>
            
            {/* Count */}
            <span className="text-muted-foreground ml-1">  
              {rowCount}
            </span>
          </div>

          {/* Right section: Add button and toggle icon */}
          <div className="flex items-center space-x-4">
            {/* Add new task button */}
            <div className="cursor-pointer rounded-full p-1 hover:bg-white/30 border border-transparent hover:border-gray-200">
              <Plus className="h-4 w-4 text-gray-500" />
            </div>
            
            {/* Expand/collapse button */}
            <div>
              {isCollapsed ? (
                <Plus className="h-4 w-4 text-gray-500" />
              ) : (
                <Minus className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

// Export memoized version for better performance
export const GroupHeaderRow = memo(GroupHeaderRowComponent);
