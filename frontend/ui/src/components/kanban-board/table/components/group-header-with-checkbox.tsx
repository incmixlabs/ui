import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "@base";
import { Row, Table } from "@tanstack/react-table";
import { TableTask } from "../../types";

interface LabelData {
  lightColor: string;
  darkColor: string;
  lightBgColor: string;
  darkBgColor: string;
}

interface GroupHeaderWithCheckboxProps {
  groupValue: string;
  count: number;
  labelData: LabelData;
  groupByField: string;
  initiallyCollapsed: boolean;
  tableInstance?: Table<TableTask>;
}

// Helper function to check for dark mode
const isDarkMode = () => {
  if (typeof window !== "undefined") {
    return (
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      document.documentElement.classList.contains("dark")
    );
  }
  return false;
};

export function GroupHeaderWithCheckbox({
  groupValue,
  count,
  labelData,
  groupByField,
  initiallyCollapsed,
  tableInstance
}: GroupHeaderWithCheckboxProps) {
  // Use the table instance provided as a prop
  const table = tableInstance;
  
  // Listen for theme changes
  const [darkMode, setDarkMode] = useState(isDarkMode());
  
  // State to track if the group is collapsed
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);

  // Set up listeners for theme changes
  useEffect(() => {
    // Function to check dark mode
    const checkDarkMode = () => {
      setDarkMode(isDarkMode());
    };
    
    // Check initially and on system preference change
    checkDarkMode();
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", checkDarkMode);
    }
    
    // Listen for class changes on the HTML element (for manual theme switching)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    
    // Clean up
    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", checkDarkMode);
      }
      observer.disconnect();
    };
  }, []);
  
  // Use the appropriate colors based on the current theme
  const textColor = darkMode ? labelData.darkColor : labelData.lightColor;
  const bgColor = darkMode ? labelData.darkBgColor : labelData.lightBgColor;
  
  // Get all the rows in this group
  const rowsInGroup: Row<TableTask>[] = table ? 
    table.getRowModel().rows.filter(
      (row: Row<TableTask>) => row.getValue(groupByField) === groupValue
    ) : [];
  
  // Determine if all rows are selected
  const allRowsSelected = rowsInGroup.length > 0 && 
    rowsInGroup.every(row => row.getIsSelected());
  
  // Determine if some rows are selected
  const someRowsSelected = !allRowsSelected && 
    rowsInGroup.some(row => row.getIsSelected());
  
  // Create a handler to toggle all rows in the group
  const toggleAllRowsSelected = (selected: boolean) => {
    rowsInGroup.forEach(row => row.toggleSelected(selected));
    
    // For debugging - log selected tasks
    if (selected) {
      const selectedTasks = rowsInGroup.map(row => ({
        id: row.original.id,
        name: row.original.name
      }));
      console.log("Selected tasks in group:", selectedTasks);
    }
  };
  
  // Handle checkbox click to prevent collapsing
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle group header click to toggle collapse state
  const handleHeaderClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Return the styled group header with checkbox
  return (
    <div 
      className="flex justify-between items-center h-10 px-3 w-full cursor-pointer hover:opacity-90"
      style={{ backgroundColor: bgColor }}
      onClick={handleHeaderClick}
    >
      <div className="flex items-center">
        {/* Group selection checkbox */}
        <Checkbox
          checked={allRowsSelected || (someRowsSelected && "indeterminate")}
          onCheckedChange={(value) => toggleAllRowsSelected(!!value)}
          onClick={handleCheckboxClick}
          aria-label={`Select all rows in ${groupValue} group`}
          className="mr-2 translate-y-[2px]"
        />
        
        {/* Color bullet */}
        <span 
          className="h-2 w-2 rounded-full mr-2"
          style={{ backgroundColor: textColor }}
        ></span>
        
        {/* Group name with colored text */}
        <span 
          className="font-medium"
          style={{ color: textColor }}
        >
          {groupValue}
        </span>
        
        {/* Task count */}
        <span className="text-muted-foreground ml-1">{count}</span>
      </div>
      
      {/* Expand/collapse chevron */}
      <div className="flex items-center">
        <div className={`transition-transform duration-200 ease-in-out ${isCollapsed ? '' : 'rotate-90'}`}>
          <ChevronRight className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
