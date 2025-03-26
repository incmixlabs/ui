import { NoteComponent } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"

const NotesPage = () => {
  return (
    <DashboardLayout breadcrumbItems={[{ label: "Notes", url: "/notes" }]}>
      <NoteComponent />
    </DashboardLayout>
  )
}

export default NotesPage
