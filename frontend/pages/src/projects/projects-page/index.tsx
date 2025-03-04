import { ProjectPageComponents } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"

const ProjectsPage = () => {
  return (
    <DashboardLayout breadcrumbItems={[{ label: "Tasks", url: "/tasks" }]}>
      <ProjectPageComponents />
    </DashboardLayout>
  )
}

export default ProjectsPage
