import { LoadingPage } from "@common"
import { Button, CardContainer } from "@incmix/ui"
import {
  Container,
  Flex,
  Select,
  Separator,
  Text,
  TextField,
  Tooltip,
} from "@incmix/ui"
import { DataTable } from "@incmix/ui/tanstack-table"
import type { MemberDetails, Organization, UserRole } from "@incmix/utils/types"
import { UserRoles } from "@incmix/utils/types"
import { ArrowLeft as ArrowLeftIcon } from "lucide-react"
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
import { getOrganizationDetailsMembersColumns } from "./utils/organization-details-table-utils"

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
            <ArrowLeftIcon /> {t("common:back")}
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

const AddUserForm: React.FC<{
  onAddMember: (email: string, role: UserRole) => void
}> = ({ onAddMember }) => {
  const { t } = useTranslation(["organizationDetails", "common", "roles"])
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<UserRole>(
    UserRoles.ROLE_VIEWER
  )

  const handleAddNewMember = () => {
    if (newMemberEmail && newMemberRole) {
      onAddMember(newMemberEmail, newMemberRole)
      setNewMemberEmail("")
      setNewMemberRole(UserRoles.ROLE_VIEWER)
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
        onValueChange={(value) => setNewMemberRole(value as UserRole)}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Item value={UserRoles.ROLE_OWNER}>
            {t("roles:owner")}
          </Select.Item>
          <Select.Item value={UserRoles.ROLE_ADMIN}>
            {t("roles:admin")}
          </Select.Item>
          <Select.Item value={UserRoles.ROLE_VIEWER}>
            {t("roles:viewer")}
          </Select.Item>
          <Select.Item value={UserRoles.ROLE_COMMENTER}>
            {t("roles:commenter")}
          </Select.Item>
          <Select.Item value={UserRoles.ROLE_EDITOR}>
            {t("roles:editor")}
          </Select.Item>
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
  const { authUser: currentUser } = useAuth()
  const { handleRemoveMembers } = useRemoveMembers()

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

  const handleAddNewMember = async (email: string, role: UserRole) => {
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

  const handleRoleChange = async (member: MemberDetails, newRole: UserRole) => {
    if (organization) {
      await handleUpdateMemberRole(organization.id, member.userId, newRole)
    }
  }

  const handleRemoveMember = (userId: string) => {
    if (organization) {
      handleRemoveMembers(organization.id, [userId])
    }
  }

  const isCurrentUser = (userId: string) => {
    return currentUser?.id === userId
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

  // Render functions for table columns
  const renderRole = (role: UserRole, member: MemberDetails) => {
    // We've already checked ability exists before rendering, but TS doesn't know that
    if (!ability) return null

    return (
      <Flex align="center" className="h-full">
        <EditableRole
          currentRole={role}
          onUpdateRole={(newRole) => handleRoleChange(member, newRole)}
          editable={ability.can("update", "Member")}
        />
      </Flex>
    )
  }

  const renderActions = (member: MemberDetails) => {
    if (!ability) return null

    const isDisabled = isCurrentUser(member.userId)
    const canDelete = ability.can("delete", "Member")

    return (
      <Flex align="center" className="h-full">
        {isDisabled || !canDelete ? (
          <Tooltip
            content={
              isDisabled
                ? t("organizationDetails:cannotRemoveSelf")
                : t("organizationDetails:cannotRemoveMember")
            }
          >
            <Button color="red" variant="soft" size="1" disabled={true}>
              {t("common:remove")}
            </Button>
          </Tooltip>
        ) : (
          <Button
            color="red"
            variant="soft"
            size="1"
            onClick={() => handleRemoveMember(member.userId)}
          >
            {t("common:remove")}
          </Button>
        )}
      </Flex>
    )
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

  // Get columns for the DataTable
  const columns = getOrganizationDetailsMembersColumns(
    t,
    currentUser?.id,
    ability,
    renderRole,
    renderActions
  )

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
              <DataTable
                columns={columns}
                data={members}
                enableRowSelection={false}
                enableSorting={true}
                enablePagination={false}
                enableColumnVisibility={false}
                className="w-full"
              />
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
