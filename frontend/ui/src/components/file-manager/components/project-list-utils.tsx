import { cn } from "@utils"
import { Checkbox } from "@base"
import { ChevronUp, ChevronDown } from "lucide-react"
import { getBytes } from "@utils/getBytes"
import type { FileItem } from "../data"
import { ProjectActionsMenu } from "./project-actions-menu"
import React, { ReactNode } from "react"

// Column type definition based on usage pattern in the codebase
interface ColumnDef<T> {
  headingName: string | ReactNode;
  type: "Custom" | "String" | "Number" | "Date" | "Boolean";
  accessorKey: string;
  width?: number;
  renderer: (value: any, row: T) => ReactNode;
  cell?: () => ReactNode;
  className?: string;
}

// Extract checkbox cell into a reusable component
export const FileCheckbox = ({ 
  checked, 
  onChange, 
  stopPropagation,
  ariaLabel 
}: { 
  checked: boolean; 
  onChange: () => void; 
  stopPropagation?: (e: React.MouseEvent) => void;
  ariaLabel: string 
}) => (
  <div className="flex items-center justify-center">
    <Checkbox
      checked={checked}
      onCheckedChange={onChange}
      onClick={stopPropagation}
      aria-label={ariaLabel}
    />
  </div>
);

// Extract file name cell into a reusable component
export const FileNameCell = ({ 
  name, 
  IconComponent, 
  isFolder 
}: { 
  name: string; 
  IconComponent: React.ElementType | null; 
  isFolder: boolean 
}) => (
  <div className="flex items-center gap-3">
    {IconComponent && (
      <IconComponent
        className={cn("h-5 w-5", !isFolder && "text-gray-500")}
      />
    )}
    <span className="font-medium">{name}</span>
  </div>
);

// Extract sort header into a reusable component
export const SortHeader = ({ 
  label, 
  field, 
  sortField, 
  sortDirection,
  onClick,
  justify = "start"
}: { 
  label: string; 
  field: "name" | "modified" | "size"; 
  sortField: string; 
  sortDirection: "asc" | "desc";
  onClick: () => void;
  justify?: "start" | "end"
}) => {
  const isActive = sortField === field;
  const direction = sortDirection === "asc";
  
  return (
    <div 
      className={`flex cursor-pointer items-center ${justify === "end" ? "justify-end" : ""} gap-2`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        direction ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
      )}
    </div>
  );
};

/**
 * Get column definitions for the project list table
 */
export const getProjectListColumns = (
  sortField: "name" | "modified" | "size",
  sortDirection: "asc" | "desc",
  selectedFiles: string[],
  isMobile: boolean,
  selectedProjectId: string | null,
  handlers: {
    toggleSelectAll: () => void,
    handleSort: (field: "name" | "modified" | "size") => void,
    toggleSelectFile: (fileId: string) => void,
    stopPropagation: (e: React.MouseEvent) => void,
    onFileClick: (file: FileItem) => void,
  }
): ColumnDef<FileItem>[] => {
  const { toggleSelectAll, handleSort, toggleSelectFile, stopPropagation } = handlers;

  // Base columns
  const columns: ColumnDef<FileItem>[] = [
    {
      headingName: "",
      type: "Custom",
      accessorKey: "checkbox",
      width: 60,
      renderer: (_: any, file: FileItem) => (
        <FileCheckbox 
          checked={selectedFiles.includes(file.id)}
          onChange={() => toggleSelectFile(file.id)}
          stopPropagation={stopPropagation}
          ariaLabel={`Select ${file.name}`}
        />
      ),
      cell: () => (
        <FileCheckbox 
          checked={selectedFiles.length > 0}
          onChange={toggleSelectAll}
          ariaLabel="Select all files"
        />
      ),
    },
    {
      headingName: (
        <SortHeader 
          label="Files" 
          field="name" 
          sortField={sortField} 
          sortDirection={sortDirection}
          onClick={() => handleSort("name")}
        />
      ),
      type: "Custom",
      accessorKey: "name",
      renderer: (name: string, file: FileItem) => {
        const IconComponent = selectedProjectId === file.id 
          ? file.openIcon || null 
          : file.closeIcon || null;
          
        return (
          <FileNameCell 
            name={name} 
            IconComponent={IconComponent} 
            isFolder={file.type === "folder"}
          />
        );
      }
    },
  ];

  // Add responsive columns for desktop
  if (!isMobile) {
    columns.push(
      {
        headingName: (
          <SortHeader 
            label="Date" 
            field="modified" 
            sortField={sortField} 
            sortDirection={sortDirection}
            onClick={() => handleSort("modified")}
            justify="end"
          />
        ),
        type: "Custom",
        accessorKey: "modified",
        renderer: (modified: string) => (
          <div className="text-right text-muted-foreground">{modified}</div>
        )
      },
      {
        headingName: (
          <SortHeader 
            label="Size" 
            field="size" 
            sortField={sortField} 
            sortDirection={sortDirection}
            onClick={() => handleSort("size")}
            justify="end"
          />
        ),
        type: "Custom",
        accessorKey: "size",
        renderer: (size: {value: string, unit: string}) => (
          <div className="text-right text-muted-foreground">
            {size.value} {size.unit}
          </div>
        )
      }
    );
  }

  // Always add actions column
  columns.push({
    headingName: "Action",
    type: "Custom",
    accessorKey: "actions",
    width: isMobile ? 100 : 60,
    renderer: (_: any, file: FileItem) => (
      <div className="text-right" onClick={stopPropagation}>
        <ProjectActionsMenu
          projectId={file.id}
          className="mr-1 h-5 w-5 cursor-pointer sm:mr-2 sm:h-6 sm:w-6"
        />
      </div>
    )
  });

  return columns;
};

/**
 * Sort files based on sort field and direction
 */
export const sortFiles = (
  files: FileItem[], 
  sortField: "name" | "modified" | "size", 
  sortDirection: "asc" | "desc"
): FileItem[] => {
  return [...files].sort((a, b) => {
    let comparison = 0;

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "modified") {
      try {
        const dateA = new Date(a.modified).getTime();
        const dateB = new Date(b.modified).getTime();
        if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
          comparison = 0;
        } else {
          comparison = dateA - dateB;
        }
      } catch (error) {
        console.error("Error parsing dates:", error);
        comparison = 0;
      }
    } else if (sortField === "size") {
      try {
        comparison = getBytes(a) - getBytes(b);
      } catch (error) {
        console.error("Error comparing file sizes:", error);
        comparison = 0;
      }
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });
};
