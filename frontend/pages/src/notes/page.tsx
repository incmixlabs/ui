import { NoteComponent } from "@incmix/ui"
import { DashboardLayout } from "../common/components/layouts/admin-panel/layout"


const NotesPage = () => {
  return (
    <DashboardLayout breadcrumbItems={[{ label: "Notes", url: "/notes" }]}>
      <NoteComponent />
    </DashboardLayout>
  )
}

export default NotesPage
