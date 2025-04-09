import { DashboardLayout } from "@/layouts/admin-panel/layout"
import { FileManager } from "@incmix/ui2"

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
