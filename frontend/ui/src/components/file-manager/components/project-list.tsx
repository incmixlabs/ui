import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ScrollArea } from "@base"
import { DataTable } from "@incmix/ui/tanstack-table"
import { useMediaQuery } from "@hooks/use-media-query"
import { cn } from "@utils"
import { getBytes } from "@utils/getBytes"
import type { FileItem } from "../data"
import { getProjectListColumns, sortFiles } from "./project-list-utils"
import { ProjectActionsMenu } from "./project-actions-menu"

interface ProjectListViewProps {
  files: FileItem[]
  onFileClick: (file: FileItem) => void
  selectedProjectId: string | null
}

type SortField = "name" | "modified" | "size"
type SortDirection = "asc" | "desc"

export function ProjectListView({
  files,
  onFileClick,
  selectedProjectId,
}: ProjectListViewProps) {
  const isMobile = useMediaQuery("(min-width: 640px)")

  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedFiles = sortFiles(files, sortField, sortDirection);

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(files.map((file) => file.id))
    }
  }

  const toggleSelectFile = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    )
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleRowClick = (file: FileItem) => {
    onFileClick(file)
  }

  // Get columns for DataTable using our utility
  const columns = getProjectListColumns(
    sortField,
    sortDirection, 
    selectedFiles,
    isMobile,
    selectedProjectId,
    {
      toggleSelectAll,
      handleSort,
      toggleSelectFile,
      stopPropagation,
      onFileClick,
    }
  );

  return (
    <ScrollArea
      className="w-full rounded-md border border-gray-5"
      scrollbars="horizontal"
    >
      <DataTable
        columns={columns as any}
        data={sortedFiles}
        onRowClick={handleRowClick}
        enableSorting={false} // We're handling sorting manually
        enableRowSelection={false} // We're handling selection manually
        enablePagination={false}
        enableColumnVisibility={false}
        className="w-full overflow-hidden"
      />
    </ScrollArea>
  )
}
