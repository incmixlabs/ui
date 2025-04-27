import { LoadingPage } from "@common"
import {
  Button,
  CardContainer,
  Container,
  Dialog,
  Flex,
  Heading,
  Text,
} from "@incmix/ui/base"
import { DataTable } from "@incmix/ui/tanstack-table"
import type { Organization } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  useCreateOrganization,
  useOrganizations,
  useValidateHandle,
} from "./utils"
import AutoForm from "@incmix/ui/auto-form"
import jsonSchemaToZod from "json-schema-to-zod"
import { z } from "zod"
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
      <Heading size="6">{t("organizations:title")}</Heading>
      <Button onClick={onCreateClick}>
        {t("organizations:createOrganization")}
      </Button>
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

  // Convert JSON schema to Zod schema
  const convertToZod = (schema: any) => {
    try {
      // Generate Zod code from JSON Schema
      const zodString = jsonSchemaToZod(schema)

      // Create a function that returns the Zod schema
      const zodSchemaFunction = new Function("z", `return ${zodString}`)

      // Return the Zod schema
      return zodSchemaFunction(z)
    } catch (error) {
      console.error("Error converting to Zod:", error, {
        schemaId: schema.id || "unknown",
      })
      return null
    }
  }

  // Handle form values change
  const handleValuesChange = (values: any) => {
    setFormData(values)
  }

  // Handle form submission
  const handleSubmit = (data: any) => {
    handleCreateOrganization(data.organizationName, data.organizationHandle, [])
    setFormData({}) // Reset form
    onCreateOrganization()
  }

  // Convert the JSON schema to Zod schema
  const zodSchema = convertToZod(organizationFormSchema.formSchema)

  // Add custom validation for the organization handle field
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
        <Dialog.Title>{t("organizations:createNewOrganization")}</Dialog.Title>
        <Dialog.Description className="sr-only">
          {t("organizations:createNewOrganization")}
        </Dialog.Description>
        <div className="py-4">
          {zodSchema && (
            <AutoForm
              formSchema={zodSchema}
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
          )}
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
    <DashboardLayout
      breadcrumbItems={[
        { label: t("organizations:title"), url: "/organizations" },
      ]}
    >
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
