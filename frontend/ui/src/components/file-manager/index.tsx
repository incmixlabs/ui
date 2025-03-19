import { useState } from "react"
import ProjectBox from "./components/project-box"
export function FileManager() {
  const [_currentFolderId, _setCurrentFolderId] = useState<string | null>(null)
  const [breadcrumbs, _setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([{ id: "", name: "File manager" }])

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
