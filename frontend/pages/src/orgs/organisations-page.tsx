import { LoadingPage } from "@common"
import { Button, CardContainer, FormField } from "@incmix/ui"
import type { Organization } from "@jsprtmnn/utils/types"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import {
  Box,
  Container,
  Dialog,
  Flex,
  Heading,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"
import { Field, Form } from "houseform"
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

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>{t("organizations:createNewOrganization")}</Dialog.Title>
        <Dialog.Description className="sr-only">
          {t("organizations:createNewOrganization")}
        </Dialog.Description>
        <Form
          onSubmit={(values) => {
            handleCreateOrganization(
              values.organizationName,
              values.organizationHandle,
              []
            )
          }}
        >
          {({ submit, value: formValues }) => {
            const orgName: string = formValues.organizationName || ""
            const [defaultHandle] = orgName?.length ? orgName.split(" ") : [""]
            formValues.organizationHandle = defaultHandle
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  submit().then(() => {
                    onCreateOrganization()
                  })
                }}
              >
                <Flex direction="column" gap="2">
                  <FormField
                    name="organizationName"
                    label={t("organizations:organizationName")}
                  />

                  <Field
                    name="organizationHandle"
                    onChangeValidate={handleValidateOrganization}
                    listenTo={["organizationName"]}
                  >
                    {({
                      value,
                      setValue,
                      onBlur,
                      errors,
                      isTouched,
                      setIsTouched,
                    }) => {
                      const handleChange = (newValue: string) => {
                        setIsTouched(true)
                        setValue(newValue)
                      }

                      return (
                        <Flex direction="column">
                          <TextField.Root
                            defaultValue={defaultHandle.toLowerCase()}
                            value={
                              isTouched ? value : defaultHandle.toLowerCase()
                            }
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={onBlur}
                            placeholder={t("organizations:organizationHandle")}
                          />
                          <Box>
                            {errors.map((error) => (
                              <Text key={error} color="red" size="1">
                                {error}
                              </Text>
                            ))}
                          </Box>
                        </Flex>
                      )
                    }}
                  </Field>
                  <Button disabled={isCreatingOrganization || isValidating}>
                    {isCreatingOrganization
                      ? t("common:creating")
                      : t("common:create")}
                  </Button>
                </Flex>
              </form>
            )
          }}
        </Form>
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
