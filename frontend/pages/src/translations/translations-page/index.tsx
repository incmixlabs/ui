import { Container } from "@incmix/ui"
import { DashboardLayout } from "../../common/components/layouts/admin-panel/layout"
import { TranslationsTable } from "./translations-table"

const TranslationsPage = () => {
  return (
    <DashboardLayout
      breadcrumbItems={[{ label: "Translations", url: "/translations" }]}
    >
      <Container>
        <TranslationsTable />
      </Container>
    </DashboardLayout>
  )
}

export default TranslationsPage
