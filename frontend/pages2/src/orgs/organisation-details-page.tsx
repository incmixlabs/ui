import { LoadingPage } from "@common"
import { Button, CardContainer } from "@incmix/ui"
import {
  Container,
  Flex,
  Select,
  Separator,
  Table,
  Text,
  TextField,
  Tooltip,
} from "@incmix/ui"
import type {
  MemberDetails,
  MemberRole,
  Organization,
} from "@incmix/utils/types"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../auth"
import { UserProfileImage } from "../common/components/user-profile-image"

import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Link } from "@tanstack/react-router"
import React from "react"
import { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { EditableName } from "./components/editable-name"
import { EditableRole } from "./components/editable-role"
import { OrganisationDetailsRoute } from "./routes"
import {
  useAddMember,
  useDeleteOrganization,
  useOrganization,
  useOrganizationMemberAbility,
  useOrganizationMembers,
  useRemoveMembers,
  useUpdateMemberRole,
  useUpdateOrganization,
} from "./utils"
import { AbilityContext, Can } from "./utils/ability-context"

const RemoveButton: React.FC<{ member: MemberDetails; orgHandle: string }> = ({
  member,
  orgHandle,
}) => {
  const { organization } = useOrganization(orgHandle)
  const { authUser: currentUser } = useAuth()
  const { t } = useTranslation(["organizationDetails", "common"])
  const { handleRemoveMembers } = useRemoveMembers()

  const handleRemove = () => {
    if (organization) {
      handleRemoveMembers(organization.id, [member.userId])
    }
  }

  const BareRemoveButton = forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
  >((props, ref) => {
    const { t } = useTranslation(["common"])
    return (
      <Button
        color="red"
        variant="soft"
        size="1"
        onClick={handleRemove}
        disabled={!!currentUser && currentUser.id === member.userId}
        ref={ref}
        {...props}
      >
        {t("common:remove")}
      </Button>
    )
  })

  const isCurrentUser = currentUser && currentUser.id === member.userId

  return isCurrentUser ? (
    <Tooltip content={t("organizationDetails:cannotRemoveSelf")}>
      <BareRemoveButton />
    </Tooltip>
  ) : (
    <BareRemoveButton />
  )
}

const OrganizationHeader: React.FC<{
  organization: Organization
  onUpdateName: (newName: string) => Promise<void>
}> = ({ organization, onUpdateName }) => {
  const { t } = useTranslation(["common"])
  const ability = React.useContext(AbilityContext)

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Link to="/organizations">
          <Button variant="ghost" size="2">
            <ArrowLeft /> {t("common:back")}
          </Button>
        </Link>
      </Flex>
      <EditableName
        currentName={organization.name}
        onUpdateName={onUpdateName}
        editable={ability.can("update", "Organisation")}
      />
    </Flex>
  )
}

const UserRow: React.FC<{
  member: MemberDetails
  orgId: string
  onUpdateRole: (member: MemberDetails, newRole: MemberRole) => Promise<void>
}> = ({ member, orgId, onUpdateRole }) => {
  const { authUser: currentUser } = useAuth()
  const { t } = useTranslation(["common"])
  const ability = React.useContext(AbilityContext)
  return (
    <Table.Row key={member.userId}>
      <Table.Cell>
        <Flex align="center" gap="2">
          <UserProfileImage size="2" userId={member.userId} />
          <Text>
            {member.name}
            {currentUser &&
              currentUser.id === member.userId &&
              ` (${t("common:you")})`}
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Flex align="center" className="h-full">
          {member.email}
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Flex align="center" className="h-full">
          <EditableRole
            currentRole={member.role}
            onUpdateRole={(newRole) => onUpdateRole(member, newRole)}
            editable={ability.can("update", "Member")}
          />
        </Flex>
      </Table.Cell>
      {(ability.can("update", "Member") || ability.can("delete", "Member")) && (
        <Table.Cell>
          <Flex align="center" className="h-full">
            <RemoveButton member={member} orgHandle={orgId} />
          </Flex>
        </Table.Cell>
      )}
    </Table.Row>
  )
}

const AddUserForm: React.FC<{
  onAddMember: (email: string, role: MemberRole) => void
}> = ({ onAddMember }) => {
  const { t } = useTranslation(["organizationDetails", "common", "roles"])
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<MemberRole>("viewer")

  const handleAddNewMember = () => {
    if (newMemberEmail && newMemberRole) {
      onAddMember(newMemberEmail, newMemberRole)
      setNewMemberEmail("")
      setNewMemberRole("viewer")
    }
  }

  return (
    <Flex gap="3" align="end">
      <TextField.Root
        size="2"
        style={{ flexGrow: 1 }}
        placeholder={t("organizationDetails:newMemberEmail")}
        value={newMemberEmail}
        onChange={(e) => setNewMemberEmail(e.target.value)}
      />
      <Select.Root
        value={newMemberRole}
        onValueChange={(value) => setNewMemberRole(value as MemberRole)}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="owner">{t("roles:owner")}</Select.Item>
          <Select.Item value="admin">{t("roles:admin")}</Select.Item>
          <Select.Item value="viewer">{t("roles:viewer")}</Select.Item>
          <Select.Item value="commenter">{t("roles:commenter")}</Select.Item>
          <Select.Item value="editor">{t("roles:editor")}</Select.Item>
        </Select.Content>
      </Select.Root>
      <Button onClick={handleAddNewMember}>
        {t("organizationDetails:addMember")}
      </Button>
    </Flex>
  )
}

const OrganizationDetailsPage: React.FC = () => {
  const { t } = useTranslation(["organizationDetails", "common"])
  const { orgHandle } = OrganisationDetailsRoute.useParams()
  const { organization, isLoading: isOrgLoading } = useOrganization(orgHandle)
  const { members, isLoading: isMembersLoading } =
    useOrganizationMembers(orgHandle)
  const { handleUpdateOrganization } = useUpdateOrganization()
  const { handleAddMember } = useAddMember()
  const { handleUpdateMemberRole } = useUpdateMemberRole()
  const { handleDeleteOrganization } = useDeleteOrganization()
  const { ability, isLoading: isAbilityLoading } =
    useOrganizationMemberAbility(orgHandle)

  const handleUpdateName = async (newName: string) => {
    if (organization) {
      try {
        await handleUpdateOrganization(organization.id, newName)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : t("error.updateOrganizationName")
        toast.error(message)
      }
    }
  }

  const handleAddNewMember = async (email: string, role: MemberRole) => {
    if (organization) {
      try {
        await handleAddMember(organization.id, email, role)
        toast.success(t("success.addMember"))
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("error.addMember")
        toast.error(message)
      }
    }
  }

  const handleRoleChange = async (
    member: MemberDetails,
    newRole: MemberRole
  ) => {
    if (organization) {
      await handleUpdateMemberRole(organization.id, member.userId, newRole)
    }
  }

  const handleDelete = async () => {
    if (
      organization &&
      confirm(
        t("organizationDetails:deleteConfirmation", {
          name: organization.name,
        })
      )
    ) {
      await handleDeleteOrganization(organization.id)
    }
  }

  if (isOrgLoading || isMembersLoading || isAbilityLoading) {
    return <LoadingPage />
  }

  if (!organization || !members || !ability) {
    if (!ability) console.error("No ability found")
    if (!organization) console.error("No organization found")
    if (!members) console.error("No members found")
    return <div>{t("organizationDetails:notFound")}</div>
  }

  return (
    <AbilityContext.Provider value={ability}>
      <DashboardLayout
        breadcrumbItems={[
          {
            label: organization.name,
            url: `/organization/${orgHandle}`,
          },
        ]}
      >
        <Container size="3">
          <CardContainer>
            <Flex direction="column" gap="4">
              <OrganizationHeader
                organization={organization}
                onUpdateName={handleUpdateName}
              />
              <Separator size="4" />
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>
                      {t("organizationDetails:name")}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      {t("organizationDetails:email")}
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      {t("organizationDetails:role")}
                    </Table.ColumnHeaderCell>
                    {ability.can("delete", "Member") && (
                      <Table.ColumnHeaderCell>
                        {t("organizationDetails:actions")}
                      </Table.ColumnHeaderCell>
                    )}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {members.map((member) => (
                    <UserRow
                      key={member.userId}
                      member={member}
                      orgId={orgHandle}
                      onUpdateRole={handleRoleChange}
                    />
                  ))}
                </Table.Body>
              </Table.Root>
              <Can I="create" a="Member">
                <AddUserForm onAddMember={handleAddNewMember} />
              </Can>
              <Can I="delete" a="Organisation">
                <Button color="red" variant="soft" onClick={handleDelete}>
                  {t("organizationDetails:deleteOrganization")}
                </Button>
              </Can>
            </Flex>
          </CardContainer>
        </Container>
      </DashboardLayout>
    </AbilityContext.Provider>
  )
}

export default OrganizationDetailsPage
