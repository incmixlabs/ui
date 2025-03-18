import { ChevronLeft } from "lucide-react"
import { useState } from "react"

import { Container, IconButton } from "@radix-ui/themes"
import { useQueryState } from "nuqs"
import ProjectBox from "./components/proejct-box"

export function FileManager() {
  const [_currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([{ id: "", name: "File manager" }])

  const _handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    const folderId = newBreadcrumbs[newBreadcrumbs.length - 1].id || null

    setCurrentFolderId(folderId)
    setBreadcrumbs(newBreadcrumbs)
  }

  const currentFolder = breadcrumbs[breadcrumbs.length - 1]

  return (
    <>
      <ProjectBox
        title={
          currentFolder.name === "File manager"
            ? "Projects"
            : currentFolder.name
        }
      />
    </>
  )
}
