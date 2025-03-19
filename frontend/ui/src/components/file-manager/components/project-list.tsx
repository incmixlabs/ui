import { getBytes } from "@utils/getBytes"
import { Checkbox } from "@components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table"
import { useMediaQuery } from "@hooks/use-media-query"
import { ScrollArea } from "@radix-ui/themes"
import { cn } from "@utils"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import type { FileItem } from "../data"
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

  const sortedFiles = [...files].sort((a, b) => {
    let comparison = 0

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "modified") {
      comparison =
        new Date(a.modified).getTime() - new Date(b.modified).getTime()
    } else if (sortField === "size") {
      comparison = getBytes(a) - getBytes(b)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(files.map((file) => file.id))
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    )
  }

  return (
    <ScrollArea
      className="w-full rounded-md border border-gray-5"
      scrollbars="horizontal"
    >
      <Table className="w-full overflow-hidden">
        <TableHeader className="bg-gray-3">
          <TableRow className="border-gray-5 ">
            <TableHead className="w-8 md:w-12">
              <Checkbox
                checked={
                  selectedFiles.length === files.length && files.length > 0
                }
                // @ts-ignore
                indeterminate={
                  selectedFiles.length > 0 &&
                  selectedFiles.length < files.length
                }
                onCheckedChange={toggleSelectAll}
                aria-label="Select all files"
              />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-2">
                Files {getSortIcon("name")}
              </div>
            </TableHead>
            {isMobile && (
              <>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("modified")}
                >
                  <div className="flex items-center justify-end gap-2">
                    Date {getSortIcon("modified")}
                  </div>
                </TableHead>

                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("size")}
                >
                  <div className="flex items-center justify-end gap-2">
                    Size {getSortIcon("size")}
                  </div>
                </TableHead>
              </>
            )}

            <TableHead className="w-10 text-right md:w-20 lg:w-32">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="px-2">
          {sortedFiles.map((file) => {
            const IconComponent =
              selectedProjectId === file.id
                ? file.openIcon || null
                : file.closeIcon || null

            return (
              <TableRow
                key={file.id}
                className={cn(
                  "h-14 cursor-pointer border-gray-5 border-t hover:bg-sidebar-secondary-active/15 ",
                  selectedProjectId === file.id &&
                    "bg-sidebar-secondary-active/15"
                )}
                onClick={() => onFileClick(file)}
              >
                <TableCell
                  className="w-8 px-2 md:w-12"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={selectedFiles.includes(file.id)}
                    onCheckedChange={() => {
                      setSelectedFiles((prev) =>
                        prev.includes(file.id)
                          ? prev.filter((id) => id !== file.id)
                          : [...prev, file.id]
                      )
                    }}
                    aria-label={`Select ${file.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {IconComponent && (
                      <IconComponent
                        className={cn(
                          "h-5 w-5",
                          file.type !== "folder" && "text-gray-500"
                        )}
                      />
                    )}
                    <span className="font-medium">{file.name}</span>
                  </div>
                </TableCell>
                {isMobile && (
                  <>
                    <TableCell className="text-right text-muted-foreground">
                      {file.modified}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {file.size.value} {file.size.unit}
                    </TableCell>
                  </>
                )}

                <TableCell
                  className="w-10 text-right md:w-20 lg:w-32"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ProjectActionsMenu
                    projectId={file?.id}
                    className="mr-1 h-5 w-5 cursor-pointer sm:mr-2 sm:h-6 sm:w-6"
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
