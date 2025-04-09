import { ProjectPageComponents, RoadmapView } from "@incmix/ui2"
import { DashboardLayout } from "@layouts/admin-panel/layout"

const ProjectsPage = () => {
  return (
    <DashboardLayout
      breadcrumbItems={[{ label: "Projects", url: "/projects" }]}
    >
      <ProjectPageComponents />
      {/* <RoadmapView /> */}
    </DashboardLayout>
  )
}

export default ProjectsPage
