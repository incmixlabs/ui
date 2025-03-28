import { useState, lazy, Suspense } from "react"
import { Box } from "@incmix/ui"

// Dynamically import component
const ProjectBox = lazy(() => import("./components/project-box"))
export function FileManager() {
  const [_currentFolderId, _setCurrentFolderId] = useState<string | null>(null)
  const [breadcrumbs, _setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([{ id: "", name: "File manager" }])

  const currentFolder = breadcrumbs[breadcrumbs.length - 1]

  return (
    <>
      <Suspense fallback={<Box className="p-4">Loading project box...</Box>}>
        <ProjectBox
          title={
            currentFolder.name === "File manager"
              ? "Projects"
              : currentFolder.name
          }
        />
      </Suspense>
    </>
  )
}
