import { useTranslation } from "react-i18next"
import { FileManager } from "@incmix/ui2"
import { DashboardLayout } from "../common/components/layouts/admin-panel/layout"


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
