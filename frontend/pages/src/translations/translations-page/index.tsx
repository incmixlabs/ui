import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Container } from "@radix-ui/themes"
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
