
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

import {  IconButton } from "@radix-ui/themes"
import { FileGrid } from "./components/file-grid"
import { getBreadcrumbPath } from "./data"

export  function FileManager() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([{ id: "", name: "File manager" }])

  const handleFolderClick = (folderId: string) => {
    const path = getBreadcrumbPath(folderId)
    const newBreadcrumbs = [{ id: "", name: "File manager" }, ...path.map((item) => ({ id: item.id, name: item.name }))]

    setCurrentFolderId(folderId)
    setBreadcrumbs(newBreadcrumbs)
  }

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    const folderId = newBreadcrumbs[newBreadcrumbs.length - 1].id || null

    setCurrentFolderId(folderId)
    setBreadcrumbs(newBreadcrumbs)
  }

  const currentFolder = breadcrumbs[breadcrumbs.length - 1]

  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        {breadcrumbs.length > 1 && (
          <IconButton variant="ghost"  onClick={() => handleBreadcrumbClick(breadcrumbs.length - 2)}>
            <ChevronLeft className="h-4 w-4" />
          </IconButton>
        )}

        <div className="flex items-center">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-muted-foreground">/</span>}
              <IconButton
                className={`p-0 ${index === breadcrumbs.length - 1 ? "font-semibold" : ""}`}
                onClick={() => handleBreadcrumbClick(index)}
              >
                {crumb.name}
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <FileGrid
        folderId={currentFolderId}
        title={currentFolder.name === "File manager" ? "Files" : currentFolder.name}
      />
    </div>
  )
}

