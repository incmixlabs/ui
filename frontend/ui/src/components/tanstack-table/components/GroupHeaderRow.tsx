"use client";

import React, { memo } from "react";
import { Table } from "@shadcn";
import { Plus, Minus, PlusCircle } from "lucide-react";

interface GroupHeaderRowProps {
  groupKey: string;
  rowCount: number;
  isCollapsed: boolean;
  toggleCollapsed: (groupKey: string) => void;
  colSpan: number;
  // Custom render function
  renderGroupHeader?: (groupValue: string, count: number) => React.ReactNode;
}

// Map of status categories to their bullet colors and styles
const statusStyleMap: Record<string, { color: string, textColor: string }> = {
  "Todo": { color: "bg-purple-500", textColor: "text-purple-600" },
  "In Design": { color: "bg-amber-500", textColor: "text-amber-600" },
  "In Review": { color: "bg-orange-500", textColor: "text-orange-600" },
  "Working": { color: "bg-blue-500", textColor: "text-blue-600" },
  "Done": { color: "bg-green-500", textColor: "text-green-600" }
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
  const styles = statusStyleMap[groupKey] || { color: "bg-gray-400", textColor: "text-gray-600" };
  const bulletColor = styles.color;
  const textColor = styles.textColor;

  return (
    <Table.Row
      className="group-header border-b-0 cursor-pointer hover:bg-muted/5"
      onClick={handleToggleClick}
      role="row"
      aria-expanded={!isCollapsed}
      data-state={isCollapsed ? "collapsed" : "expanded"}
    >
      <Table.Cell
        colSpan={colSpan}
        className="p-0 relative"
      >
        <div className="flex items-center h-12 px-2">
          {/* Bullet indicator with matching color */}
          <div className="flex items-center mr-2">
            <span className={`h-2 w-2 rounded-full ${bulletColor} mr-2`}></span>
            
            {/* Category name */}
            <span className={`font-medium ${textColor}`}>{groupKey}</span>
            
            {/* Count */}
            <span className="text-muted-foreground ml-1">  
              {rowCount}
            </span>
          </div>

          {/* Add button - appears on the right, before collapse control */}
          <div className="absolute right-12">
            <PlusCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </div>
          
          {/* Expand/collapse button on the far right */}
          <div className="absolute right-4">
            {isCollapsed ? (
              <Plus className="h-4 w-4" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

// Export memoized version for better performance
export const GroupHeaderRow = memo(GroupHeaderRowComponent);
