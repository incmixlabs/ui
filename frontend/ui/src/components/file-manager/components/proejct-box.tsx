import { Input } from "@components/form"
import { Box, DropdownMenu, Flex, IconButton } from "@radix-ui/themes"
import { cn } from "@utils"
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { type FileItem, ITEMS_PER_PAGE, projectFolders } from "../data"
import FileCard from "./project-card"
import { FileDetails } from "./project-details"

interface FileGridProps {
  title: string
}
const ProjectBox = ({ title }: FileGridProps) => {
  const [selectedProjectId, setSelectedProjectId] = useQueryState("projectId", {
    defaultValue: "",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const items = projectFolders
  const filteredItems = items.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const _paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

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
    setSelectedProjectId(file?.id)
  }

  const handleCloseDetails = () => {
    setSelectedProjectId("")
  }

  return (
    <Flex className="w-full overflow-x-hidden" gap={"5"}>
      <Box
        className={`flex-1 rounded-lg border border-gray-4 transition-all ${selectedProjectId ? "pr-4" : ""}`}
      >
        <Box className="p-8">
          <Flex align={"center"} justify={"between"} className="mb-4">
            <h2 className="font-semibold text-2xl">{title}</h2>
            <Flex align={"center"} gap={"2"}>
              <Box className="relative w-64">
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                />
              </Box>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="outline">
                    <SlidersHorizontal className="h-4 w-4" />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  <Flex align={"center"} gap={"1"} className="p-2">
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
                  </Flex>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
          </Flex>
          {projectFolders.length === 0 ? (
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              className="h-64 text-muted-foreground"
            >
              <p>No files found</p>
            </Flex>
          ) : (
            <Box
              className={`grid ${viewMode === "grid" ? (!selectedProjectId ? " grid-cols-3 gap-5 2xl:grid-cols-4 " : " grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 ") : "grid-cols-1"} gap-4`}
            >
              {projectFolders.map((item) => (
                <FileCard
                  key={item.id}
                  file={item}
                  onClick={() => handleFileClick(item)}
                  viewMode={viewMode}
                  isSelected={selectedProjectId === item.id}
                />
              ))}
            </Box>
          )}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-1">
              <IconButton
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
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
                  <IconButton
                    variant="outline"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </IconButton>
                </>
              )}

              <IconButton
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </IconButton>
            </div>
          )}
        </Box>
      </Box>
      {selectedProjectId && (
        <Box
          className={cn(
            "slide-in-from-right w-80 animate-in rounded-md border border-gray-4"
          )}
        >
          <FileDetails
            projectId={selectedProjectId}
            onClose={handleCloseDetails}
          />
        </Box>
      )}
    </Flex>
  )
}

export default ProjectBox
