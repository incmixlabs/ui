import { Input } from "@components/form"
import { FilterIcon } from "@components/icons/filter"

import { MotionSheet } from "@components/custom-sheet"
import { useMediaQuery } from "@hooks/use-media-query"
import { Box, Button, Flex, IconButton, iconSize } from "@incmix/ui"
import { cn } from "@utils"
import {
  ChevronLeft,
  Columns2,
  LayoutGrid,
  List,
  Plus,
  Search,
  Upload,
} from "lucide-react"
import { useQueryState } from "nuqs"
import { type SetStateAction, useState } from "react"
import { type FileItem, projectFolders } from "../data"
import ProjectCard from "./project-card"
import { ProjectDetails } from "./project-details"
import { ProjectListView } from "./project-list"

interface FileGridProps {
  title: string
}
const ProjectBox = ({ title }: FileGridProps) => {
  const isDesktop = useMediaQuery("(min-width: 1536px)")
  const isMobile = useMediaQuery("(min-width: 640px)")
  const [selectedProjectId, setSelectedProjectId] = useQueryState("projectId", {
    defaultValue: "",
  })
  const [viewMode, setViewMode] = useState<"grid" | "list" | "side">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [projectSearchQuery, setProjectSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6
  const totalPages = Math.ceil(projectFolders.length / itemsPerPage)

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = projectFolders.slice(indexOfFirstItem, indexOfLastItem)
  // Change page
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber)
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      if (startPage > 2) {
        pageNumbers.push("ellipsis1")
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis2")
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const handleFileClick = (file: FileItem) => {
    setSelectedProjectId(file.id === selectedProjectId ? null : file.id)
  }
  const handleCloseDetails = () => {
    setSelectedProjectId("")
  }

  return (
    <Flex className="w-full overflow-x-hidden" gap={"5"}>
      <Box className={"flex-1 rounded-lg border border-gray-5 transition-all "}>
        <Flex
          className="border-gray-5 border-b px-8 py-4 font-medium text-gray-10"
          gap={"1"}
        >
          <IconButton
            className={`mr-2 rounded-full ${iconSize}`}
            onClick={() => {
              /* Add navigation logic here */
            }}
          >
            <ChevronLeft />
          </IconButton>
          <span>File Manager</span> /{" "}
          <span className="text-blue-10">{title}</span>
        </Flex>
        <Box className="p-4 sm:p-8 ">
          <Flex align={"center"} justify={"between"} className="mb-4 gap-4 ">
            {isMobile && (
              <Box className="relative flex h-11 w-full items-center rounded-md bg-gray-3">
                <Search className="ml-3 h-5 w-5 text-gray-10" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="absolute top-0 left-0 h-full w-full rounded-md bg-transparent pl-10"
                />
              </Box>
            )}
            <Button variant="solid" className="h-11">
              <Plus /> Add Folder
            </Button>
            <Button variant="solid" className="h-11">
              <Upload /> Upload
            </Button>
          </Flex>
          <Flex align={"center"} justify={"between"} className="mb-4">
            <h2 className="font-semibold text-xl sm:text-2xl">{title}</h2>
            <Flex align={"center"} gap={"2"}>
              <Flex
                align={"center"}
                justify={"between"}
                gap={"2"}
                className="w-full"
              >
                <Box className="relative flex h-9 w-10 cursor-pointer items-center rounded-lg border border-gray-5 md:w-64 md:cursor-default md:border-none">
                  <Search className="ml-2 h-5 w-5 text-gray-10" />
                  <Input
                    placeholder="Search files..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className="absolute top-0 left-0 hidden h-full w-full bg-transparent md:block md:pl-8"
                  />
                </Box>
                <Box className="h-9 w-9 rounded-md border border-gray-5">
                  <IconButton
                    className={cn(
                      "grid h-full w-full cursor-pointer place-content-center border-none bg-transparent"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <FilterIcon className="h-5 w-5 stroke-gray-8" />
                  </IconButton>
                </Box>
              </Flex>
              <Flex
                align={"center"}
                gap={"1"}
                className="h-9 rounded-md border border-gray-5 p-1"
              >
                <IconButton
                  className={cn(
                    " h-7 cursor-pointer border-none ",
                    viewMode === "list"
                      ? "bg-sidebar-secondary-active dark:bg-sidebar-secondary-active/20 "
                      : "bg-transparent text-gray-10"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-5 w-5" />
                </IconButton>
                <IconButton
                  className={cn(
                    " h-7 cursor-pointer border-none",
                    viewMode === "grid"
                      ? "bg-sidebar-secondary-active dark:bg-sidebar-secondary-active/20 "
                      : "bg-transparent text-gray-10"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className={cn("h-5 w-5")} />
                </IconButton>
                {isMobile && (
                  <IconButton
                    className={cn(
                      " h-7 cursor-pointer border-none",
                      viewMode === "side"
                        ? "bg-sidebar-secondary-active dark:bg-sidebar-secondary-active/20 "
                        : "bg-transparent text-gray-10"
                    )}
                    onClick={() => setViewMode("side")}
                  >
                    <Columns2 className={cn("h-5 w-5")} />
                  </IconButton>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Box className="w-full">
            {projectFolders.length === 0 ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                className="h-64 text-muted-foreground"
              >
                <p>No files found</p>
              </Flex>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <Box
                    className={`grid pb-10 ${
                      !selectedProjectId && isDesktop
                        ? "grid-cols-3 gap-5 2xl:grid-cols-4"
                        : "grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3"
                    } gap-4 border-gray-5 border-t pt-5`}
                  >
                    {currentItems.map((item) => (
                      <ProjectCard
                        key={item.id}
                        file={item}
                        onClick={() => handleFileClick(item)}
                        viewMode={viewMode}
                        isSelected={selectedProjectId === item.id}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box className="border-gray-5 border-t pt-5">
                    <ProjectListView
                      files={currentItems}
                      onFileClick={handleFileClick}
                      selectedProjectId={selectedProjectId}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
          {/* Pagination */}
          {projectFolders.length > 0 && (
            <Flex
              align="center"
              justify={"between"}
              gap="2"
              className="border-gray-5 border-t py-8"
            >
              {!isMobile && (
                <Box className="w-full font-medium">
                  <span>
                    Page{" "}
                    <span className="font-semibold italic">{currentPage}</span>{" "}
                    of {totalPages}
                  </span>
                </Box>
              )}

              <Button
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                variant={currentPage === 1 ? "outline" : "solid"}
                className={
                  "flex cursor-pointer items-center gap-1 rounded-md p-2 font-medium text-sm transition-colors"
                }
                disabled={currentPage === 1}
              >
                <ChevronLeft className={`${iconSize}`} />
                Previous
              </Button>
              {isMobile && (
                <Flex gap="2" align={"center"}>
                  {getPageNumbers().map((page) =>
                    page === "ellipsis1" || page === "ellipsis2" ? (
                      <span key={`ellipsis-${page}`} className="px-2">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "solid" : "outline"}
                        onClick={() => paginate(page as number)}
                        className={
                          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md font-medium text-sm transition-colors"
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}
                </Flex>
              )}

              <Button
                onClick={() =>
                  currentPage < totalPages && paginate(currentPage + 1)
                }
                variant={currentPage === totalPages ? "outline" : "solid"}
                className={
                  "flex cursor-pointer items-center gap-1 rounded-md p-2 font-medium text-sm transition-colors"
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronLeft className={`${iconSize} rotate-180`} />
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
      <MotionSheet
        open={Boolean(selectedProjectId)}
        onOpenChange={handleCloseDetails}
        showCloseButton={false}
        side="right"
        isFilterClassName={"w-80 h-full"}
        isFilter={Boolean(isDesktop)}
        className="w-80 p-0 "
        shadow="0 0 10px rgba(0, 0, 0, 0)"
      >
        <Box
          className={cn(
            "slide-in-from-right h-full w-full animate-in rounded-md border border-gray-4"
          )}
        >
          <ProjectDetails
            projectId={selectedProjectId}
            onClose={handleCloseDetails}
          />
        </Box>
      </MotionSheet>
    </Flex>
  )
}

export default ProjectBox
