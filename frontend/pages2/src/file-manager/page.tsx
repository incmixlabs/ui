import { FileManager } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"

const FileManagerPage = () => {
  return (
    <DashboardLayout
      breadcrumbItems={[{ label: "File Manager", url: "/file-manager" }]}
    >
      <FileManager />
    </DashboardLayout>
  )
}

export default FileManagerPage
