import React from "react";
import { Check, ChevronDown, ChevronLeft, Download, SlidersHorizontal, X } from "lucide-react";
import { Button, DropdownMenuWrapper, Input } from "@base";
import { DataTableFacet } from "../types";

interface FacetedFilterProps<TData> {
  table: any;
  facet: DataTableFacet<TData>;
}

export const FacetedFilter = <TData extends object>({
  table,
  facet
}: FacetedFilterProps<TData>) => {
  const column = table.getColumn(facet.column);
  if (!column) {
    console.warn(`Column ${String(facet.column)} not found for filter ${facet.title}`);
    return null;
  }

  const filterValue = column.getFilterValue() as any[];
  const selectedCount = filterValue?.length || 0;

  // Create dropdown items
  const items = [
    {
      label: facet.title,
      disabled: true,
      separator: true
    },
    ...facet.options.map(option => {
      const isSelected = filterValue?.includes(option.value) || false;

      return {
        label: option.label,
        onClick: () => {
          if (isSelected) {
            // Remove from filter
            column.setFilterValue(
              filterValue?.filter(val => val !== option.value) || []
            );
          } else {
            // Add to filter
            column.setFilterValue(
              filterValue ? [...filterValue, option.value] : [option.value]
            );
          }
        },
        checked: isSelected,
        checkedIcon: <Check className="h-4 w-4" />,
        icon: option.icon
      };
    })
  ];

  // Add clear button if filters are applied
  if (selectedCount > 0) {
    items.push({
      label: "Clear",
      onClick: () => column.setFilterValue(undefined),
      separator: true,
      disabled: false
    });
  }

  const buttonLabel = selectedCount > 0
    ? `${facet.title} (${selectedCount})`
    : facet.title;

  return (
    <DropdownMenuWrapper
      button={{
        label: buttonLabel,
        variant: "outline",
        icon: <ChevronDown className="ml-2 h-4 w-4" />,
        className: "h-9 border-gray-200 dark:border-gray-800"
      }}
      items={items}
      content={{
        color: "gray"
      }}
    />
  );
};

export interface TableFiltersProps<TData> {
  table: any;
  filterColumn?: keyof TData | string;
  filterPlaceholder: string;
  visibilityItems: { label: string; onClick: () => void; checked?: boolean; checkedIcon?: React.ReactNode }[];
  facets?: DataTableFacet<TData>[];
  exportOptions?: {
    enabled?: boolean;
    formats?: ("csv" | "excel" | "pdf")[];
    onExport: (format: string) => void;
  };
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  enableSidebarFilters?: boolean;
}

export const TableFilters = <TData extends object>({
  table,
  filterColumn,
  filterPlaceholder,
  visibilityItems,
  facets,
  exportOptions,
  onToggleSidebar,
  sidebarOpen,
  enableSidebarFilters
}: TableFiltersProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Create export dropdown items
  const exportItems = exportOptions?.formats?.map(format => ({
    label: `Export as ${format.toUpperCase()}`,
    onClick: () => exportOptions.onExport(format),
    icon: <Download className="h-4 w-4 mr-2" />
  })) || [];

  return (
    <div className="flex items-center py-4 gap-2 flex-wrap">
      {/* Sidebar toggle button */}
      {enableSidebarFilters && onToggleSidebar && (
        <Button
          onClick={onToggleSidebar}
          className="flex items-center h-9"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Hide Filters
            </>
          ) : (
            <>
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Show Filters
            </>
          )}
        </Button>
      )}

      {filterColumn && (
        <div className="flex-1 max-w-sm">
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterColumn as string)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filterColumn as string)?.setFilterValue(event.target.value)
            }
            className="h-9 border-gray-200 dark:border-gray-800"
          />
        </div>
      )}

      {facets && facets.length > 0 && (
        <div className="flex items-center space-x-2">
          {facets.map((facet, index) => (
            <FacetedFilter key={index} table={table} facet={facet} />
          ))}
        </div>
      )}

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-9 px-2"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}

      <div className="ml-auto flex gap-2">
        {exportOptions?.enabled && exportItems.length > 0 && (
          <DropdownMenuWrapper
            button={{
              label: "Export",
              variant: "outline",
              icon: <Download className="ml-2 h-4 w-4" />,
              className: "h-9 border-gray-200 dark:border-gray-800"
            }}
            items={exportItems}
            content={{
              color: "gray"
            }}
          />
        )}

        {visibilityItems.length > 0 && (
          <DropdownMenuWrapper
            button={{
              label: "Columns",
              variant: "outline",
              icon: <ChevronDown className="ml-2 h-4 w-4" />,
              className: "h-9 border-gray-200 dark:border-gray-800"
            }}
            items={visibilityItems}
            content={{
              color: "gray"
            }}
          />
        )}
      </div>
    </div>
  );
};
