import { NoteComponent } from "@incmix/ui2"
import { DashboardLayout } from "../common/components/layouts/admin-panel/layout"


const NotesPage = () => {
  return (
    <DashboardLayout breadcrumbItems={[{ label: "Notes", url: "/notes" }]}>
      <NoteComponent />
    </DashboardLayout>
  )
}

export default NotesPage
