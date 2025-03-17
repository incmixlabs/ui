import { useState } from "react"
import { ChevronLeft, ChevronRight, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import { type FileItem, ITEMS_PER_PAGE, getChildrenOfFolder } from "../data"
import { FileDetails } from "../components/file-details"
import { FileCard } from "../components/file-card"
import { Input } from "@components/form"
import { DropdownMenu, IconButton } from "@radix-ui/themes"

interface FileGridProps {
  folderId: string | null
  title: string
}

export function FileGrid({ folderId, title }: FileGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const items = getChildrenOfFolder(folderId)
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
  }

  const handleCloseDetails = () => {
    setSelectedFile(null)
  }

  return (
    <div className="flex w-full">
      <div className={`flex-1 transition-all ${selectedFile ? "pr-4" : ""}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8"
              />
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger >
                <IconButton variant="outline" >
                  <SlidersHorizontal className="h-4 w-4" />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <div className="flex items-center gap-1 p-2">
                  <IconButton
                    variant={viewMode === "grid" ? "outline" : "solid"}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    variant={viewMode === "list" ? "outline" : "solid"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </IconButton>
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>

        {paginatedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p>No files found</p>
          </div>
        ) : (
          <div
            className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"} gap-4`}
          >
            {paginatedItems.map((item) => (
              <FileCard key={item.id} file={item} onClick={() => handleFileClick(item)} viewMode={viewMode} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-6 gap-1">
            <IconButton variant="outline"  onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </IconButton>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number

              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <IconButton
                  key={pageNum}
                  variant={currentPage === pageNum ? "outline" : "solid"}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </IconButton>
              )
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="mx-1">...</span>
                <IconButton variant="outline" onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </IconButton>
              </>
            )}

            <IconButton variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </IconButton>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="w-80 border-l pl-4 animate-in slide-in-from-right">
          <FileDetails file={selectedFile} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  )
}

