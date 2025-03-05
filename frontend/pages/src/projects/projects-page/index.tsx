import { ProjectPageComponents } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"

const ProjectsPage = () => {
  return (
    <DashboardLayout
      breadcrumbItems={[{ label: "Projects", url: "/projects" }]}
    >
      <ProjectPageComponents />
    </DashboardLayout>
  )
}

export default ProjectsPage
