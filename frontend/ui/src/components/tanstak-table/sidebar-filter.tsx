// File: components/DataTable/SidebarFilters.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Calendar, Check } from "lucide-react";
import { Button, Input, Checkbox } from "@base";
import { SidebarFilterConfig, FilterOption } from "./types";

// Individual Filter Group Component
interface FilterGroupProps<TData> {
  filter: SidebarFilterConfig<TData>;
  onFilterChange: (column: string, value: any) => void;
  currentValue: any;
  table: any;
}

export function FilterGroup<TData>({
  filter,
  onFilterChange,
  currentValue,
  table
}: FilterGroupProps<TData>) {
  // Always start collapsed, regardless of initialCollapsed prop
  // This makes all sidebar items collapsed by default
  const [isOpen, setIsOpen] = useState(false);

  const toggleGroup = () => {
    setIsOpen(!isOpen);
  };

  const renderFilterContent = () => {
    const column = String(filter.column);

    switch (filter.type) {
      case "text":
        return (
          <div className="my-2 px-6">
            <Input
              placeholder={`Filter by ${filter.title.toLowerCase()}...`}
              value={(currentValue as string) || ""}
              onChange={(e) => onFilterChange(column, e.target.value)}
              className="h-8 w-full"
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-1 my-2 px-6">
            {filter.options?.map((option) => (
              <div key={String(option.value)} className="flex items-center">
                <button
                  className={`text-sm w-full text-left py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between ${
                    currentValue === option.value ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => onFilterChange(column, currentValue === option.value ? undefined : option.value)}
                >
                  <span>{option.label}</span>
                  {currentValue === option.value && <Check className="h-4 w-4" />}
                </button>
              </div>
            ))}
          </div>
        );

      case "multiSelect":
        const values = (currentValue || []) as any[];
        return (
          <div className="space-y-1.5 my-2 px-6">
            {filter.options?.map((option) => {
              const isSelected = values.includes(option.value);
              return (
                <div key={String(option.value)} className="flex items-center">
                  <Checkbox
                    id={`${column}-${String(option.value)}`}
                    checked={isSelected}
                    onCheckedChange={() => {
                      if (isSelected) {
                        onFilterChange(
                          column,
                          values.filter((val) => val !== option.value)
                        );
                      } else {
                        onFilterChange(column, [...values, option.value]);
                      }
                    }}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${column}-${String(option.value)}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        );

      case "boolean":
        return (
          <div className="space-y-1.5 my-2 px-6">
            <div className="flex items-center">
              <Checkbox
                id={`${column}-true`}
                checked={currentValue === true}
                onCheckedChange={() => onFilterChange(column, currentValue === true ? undefined : true)}
                className="mr-2"
              />
              <label htmlFor={`${column}-true`} className="text-sm cursor-pointer">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id={`${column}-false`}
                checked={currentValue === false}
                onCheckedChange={() => onFilterChange(column, currentValue === false ? undefined : false)}
                className="mr-2"
              />
              <label htmlFor={`${column}-false`} className="text-sm cursor-pointer">
                No
              </label>
            </div>
          </div>
        );

      case "date":
        return (
          <div className="my-3 px-6">
            <div className="relative">
              {/* Add a small label for consistency */}
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                {filter.title}
              </label>
              <div className="relative rounded-md shadow-sm">
                <Input
                  type="date"
                  value={(currentValue as string) || ""}
                  onChange={(e) => onFilterChange(column, e.target.value)}
                  className="h-9 w-full pl-3 pr-10 rounded-md border-gray-200 dark:border-gray-800 focus-visible:ring-primary"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        );

      case "dateRange":
        const dateRange = (currentValue || {}) as { start?: string; end?: string };
        return (
          <div className="space-y-3 my-3 px-6">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                From
              </label>
              <div className="relative rounded-md shadow-sm">
                <Input
                  type="date"
                  value={dateRange.start || ""}
                  onChange={(e) =>
                    onFilterChange(column, { ...dateRange, start: e.target.value })
                  }
                  className="h-9 w-full pl-3 pr-10 rounded-md border-gray-200 dark:border-gray-800 focus-visible:ring-primary"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                To
              </label>
              <div className="relative rounded-md shadow-sm">
                <Input
                  type="date"
                  value={dateRange.end || ""}
                  onChange={(e) =>
                    onFilterChange(column, { ...dateRange, end: e.target.value })
                  }
                  className="h-9 w-full pl-3 pr-10 rounded-md border-gray-200 dark:border-gray-800 focus-visible:ring-primary"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        className="flex items-center justify-between w-full py-3 px-4 text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        onClick={toggleGroup}
      >
        <div className="flex items-center">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 mr-3 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-3 text-gray-500" />
          )}
          {filter.icon && <span className="mr-2.5 text-gray-500">{filter.icon}</span>}
          <span className="text-gray-700 dark:text-gray-200">{filter.title}</span>
        </div>
      </button>

      {isOpen && renderFilterContent()}
    </div>
  );
}

// Main Sidebar Component
interface TableSidebarProps<TData> {
  filters: SidebarFilterConfig<TData>[];
  table: any;
  isOpen: boolean;
  onToggle: () => void;
}

export function TableSidebar<TData>({
  filters,
  table,
  isOpen,
  onToggle,
}: TableSidebarProps<TData>) {
  const handleFilterChange = (column: string, value: any) => {
    const tableColumn = table.getColumn(column);
    if (tableColumn) {
      tableColumn.setFilterValue(value);
    }
  };

  return (
    <div className={`h-full rounded-md overflow-hidden transition-all duration-300`}>
      <div className="bg-white dark:bg-gray-950 h-full overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-md">
        {filters.map((filter, index) => (
          <FilterGroup
            key={`${String(filter.column)}-${index}`}
            filter={filter}
            onFilterChange={handleFilterChange}
            currentValue={table.getColumn(String(filter.column))?.getFilterValue()}
            table={table}
          />
        ))}

        {filters.length === 0 && (
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400 italic">
            No filters configured
          </div>
        )}
      </div>
    </div>
  );
}