import { DashboardLayout } from "@/layouts/admin-panel/layout"
import { NoteComponent } from "@incmix/ui2"

const NotesPage = () => {
  return (
    <DashboardLayout breadcrumbItems={[{ label: "Notes", url: "/notes" }]}>
      <NoteComponent />
    </DashboardLayout>
  )
}

export default NotesPage
