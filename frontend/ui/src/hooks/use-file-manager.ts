import { useQueryState } from "nuqs"

export const useFileManager = () => {
  // Query state for folder navigation and file selection
  const [folderId, setFolderId] = useQueryState("folderId", {
    defaultValue: "",
  })
  const [fileId, setFileId] = useQueryState("fileId", { defaultValue: "" })
  const [viewMode, setViewMode] = useQueryState("view", {
    defaultValue: "grid",
  })
  const [page, setPage] = useQueryState("page", { defaultValue: "1" })
  const [search, setSearch] = useQueryState("search", { defaultValue: "" })

  // Open a folder
  const handleOpenFolder = async (id: string) => {
    await setFolderId(id)
    await setPage("1") // Reset to first page when changing folders
    await setFileId("") // Clear selected file when changing folders
  }

  // Go back to parent folder
  const handleGoBack = async () => {
    await setFolderId("")
    await setPage("1")
    await setFileId("")
  }

  // Select a file to view details
  const handleSelectFile = async (id: string) => {
    await setFileId(id)
  }

  // Close file details
  const handleCloseFileDetails = async () => {
    await setFileId("")
  }

  // Change view mode (grid or list)
  const handleChangeViewMode = async (mode: "grid" | "list") => {
    await setViewMode(mode)
  }

  // Change page
  const handleChangePage = async (newPage: number) => {
    await setPage(newPage.toString())
  }

  // Search files
  const handleSearch = async (query: string) => {
    await setSearch(query)
    await setPage("1") // Reset to first page when searching
  }

  return {
    folderId,
    fileId,
    viewMode: viewMode as "grid" | "list",
    page: Number.parseInt(page),
    search,
    handleOpenFolder,
    handleGoBack,
    handleSelectFile,
    handleCloseFileDetails,
    handleChangeViewMode,
    handleChangePage,
    handleSearch,
  }
}
