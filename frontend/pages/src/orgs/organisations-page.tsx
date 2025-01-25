import { LoadingPage } from "@common"
import { Button, CardContainer, FormField } from "@incmix/ui"
import type { Organization } from "@incmix/utils/types"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import {
  Container,
  Dialog,
  Flex,
  Heading,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes"
import { useForm } from "@tanstack/react-form"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { PageLayout } from "../common/components/layouts/page-layout"
import {
  useCreateOrganization,
  useOrganizations,
  useValidateHandle,
} from "./utils"

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

const OrganizationRow: React.FC<{ org: Organization }> = ({ org }) => {
  return (
    <Table.Row key={org.id} style={{ cursor: "pointer" }}>
      <Table.Cell>
        <Link
          to={`/organization/${org.handle}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          {org.name}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          to={`/organization/${org.handle}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          {org.members.length}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          to={`/organization/${org.handle}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <Flex justify="end">
            <ChevronRightIcon />
          </Flex>
        </Link>
      </Table.Cell>
    </Table.Row>
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

  const form = useForm({
    defaultValues: {
      organizationName: "",
      organizationHandle: "",
    },
    onSubmit: ({ value }) => {
      handleCreateOrganization(
        value.organizationName,
        value.organizationHandle,
        []
      )
      onCreateOrganization()
    },
  })

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>{t("organizations:createNewOrganization")}</Dialog.Title>
        <Dialog.Description className="sr-only">
          {t("organizations:createNewOrganization")}
        </Dialog.Description>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <Flex direction="column" gap="2">
            <form.Field
              name="organizationName"
              validators={{
                onChange: ({ value }) =>
                  !value || value.trim() === ""
                    ? "Organization name is required"
                    : undefined,
              }}
            >
              {(field) => (
                <FormField
                  name="organizationName"
                  label={t("organizations:organizationName")}
                  field={field}
                />
              )}
            </form.Field>

            <form.Field
              name="organizationHandle"
              validators={{
                onChange: ({ value }) => {
                  const isValid = handleValidateOrganization(value)
                  if (!isValid) {
                    return "Organization handle is already taken"
                  }
                  return
                },
              }}
            >
              {(field) => (
                <TextField.Root
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t("organizations:organizationHandle")}
                />
              )}
            </form.Field>
            <Button disabled={isCreatingOrganization || isValidating}>
              {isCreatingOrganization
                ? t("common:creating")
                : t("common:create")}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const OrganizationsPage: React.FC = () => {
  const { t } = useTranslation(["organizations", "common"])
  const { organizations, isLoading, isError } = useOrganizations()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

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

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{t("common:name")}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              {t("common:members")}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {organizations.map((org) => (
            <OrganizationRow key={org.id} org={org} />
          ))}
        </Table.Body>
      </Table.Root>
    )
  }

  return (
    <PageLayout>
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
    </PageLayout>
  )
}

export default OrganizationsPage
