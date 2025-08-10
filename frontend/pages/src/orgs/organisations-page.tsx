import { LoadingPage } from "@common"
import { PageHeader } from "@incmix/ui"
import AutoForm from "@incmix/ui/auto-form"
import {
  Button,
  CardContainer,
  Container,
  Dialog,
  Flex,
  Text,
} from "@incmix/ui/base"
import {
  TanstackDataTable as DataTable,
  TaskStatusDemo,
} from "@incmix/ui/tanstack-table"
import type { Organization } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import ColorPicker from "../../../ui/src/components/tanstack-table/components/ColorPicker"
import DropdownCellEditor from "../../../ui/src/components/tanstack-table/components/DropdownCellEditor"
import {
  useCreateOrganization,
  useOrganizations,
  useValidateHandle,
} from "./utils"
import { organizationFormSchema } from "./utils/organisaiton-form-schema"
import {
  getOrganizationColumns,
  getOrganizationRowActions,
} from "./utils/organization-table-utils"

const OrganizationHeader: React.FC<{ onCreateClick: () => void }> = ({
  onCreateClick,
}) => {
  const { t } = useTranslation(["organizations"])
  return (
    <Flex justify="between" align="center">
      <PageHeader
        title={t("organizations:title")}
        className="w-full"
        actions={
          <Button onClick={onCreateClick}>
            {t("organizations:createOrganization")}
          </Button>
        }
      />
    </Flex>
  )
}

const CreateOrganizationDialog: React.FC<{
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCreateOrganization: () => void
}> = ({ isOpen, onOpenChange, onCreateOrganization }) => {
  const { t } = useTranslation(["organizations"])
  const { handleValidateOrganization, isValidating } = useValidateHandle()
  const { handleCreateOrganization, isCreatingOrganization } =
    useCreateOrganization()
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleValuesChange = (values: any) => {
    setFormData(values)
  }

  const handleSubmit = (data: any) => {
    handleCreateOrganization(data.organizationName, data.organizationHandle, [])
    setFormData({})
    onCreateOrganization()
  }

  const fieldConfigWithValidation = {
    ...organizationFormSchema.fieldConfig,
    organizationHandle: {
      ...organizationFormSchema.fieldConfig.organizationHandle,
      validate: (value: string) => {
        const isValid = handleValidateOrganization(value)
        if (!isValid) {
          return "Organization handle is already taken"
        }
        return true
      },
    },
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title className="font-semibold">
          {t("organizations:createNewOrganization")}
        </Dialog.Title>
        <Dialog.Description className="sr-only">
          {t("organizations:createNewOrganization")}
        </Dialog.Description>
        <div className="py-4">
          <AutoForm
            formSchema={organizationFormSchema.formSchema}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            values={formData}
            fieldConfig={fieldConfigWithValidation}
          >
            <div className="mt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isCreatingOrganization || isValidating}
              >
                {isCreatingOrganization
                  ? t("common:creating")
                  : t("common:create")}
              </Button>
            </div>
          </AutoForm>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const OrganizationsPage: React.FC = () => {
  const { t } = useTranslation(["organizations", "common"])
  const { organizations, isLoading, isError } = useOrganizations()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const navigate = useNavigate()

  // Handle navigation to organization details
  const handleNavigateToOrg = (handle: string) => {
    navigate({ to: `/organization/${handle}` })
  }

  // Handle row click
  const handleRowClick = (org: Organization) => {
    handleNavigateToOrg(org.handle)
  }

  const renderContent = () => {
    if (isLoading) {
      return <LoadingPage />
    }

    if (isError) {
      return (
        <Text className="text-center text-lg">
          {t("organizations:errorLoading")}
        </Text>
      )
    }

    if (!organizations || organizations.length === 0) {
      return (
        <Text className="text-center text-lg">
          {t("organizations:noOrganizations")}
        </Text>
      )
    }

    // Need to transform organizations here to include a calculated field for members count
    // since the DataTable will be using a direct accessorKey
    const tableData = organizations.map((org) => ({
      ...org,
      // Add a members count field for the DataTable to use
      members: org.members,
    }))

    return (
      <DataTable
        columns={getOrganizationColumns(t)}
        data={tableData}
        enableRowSelection={false}
        enableSorting={true}
        enablePagination={false}
        filterColumn="name"
        filterPlaceholder={t("common:filterByName")}
        onRowClick={handleRowClick}
        rowActions={getOrganizationRowActions(handleNavigateToOrg)}
        className="w-full"
      />
    )
  }

  return (
    <DashboardLayout>
      <Container>
        <CardContainer>
          <Flex direction="column" gap="4">
            <OrganizationHeader
              onCreateClick={() => setIsCreateDialogOpen(true)}
            />
            {renderContent()}
          </Flex>
        </CardContainer>
      </Container>
      <CreateOrganizationDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateOrganization={() => setIsCreateDialogOpen(false)}
      />
    </DashboardLayout>
  )
}

export default OrganizationsPage
