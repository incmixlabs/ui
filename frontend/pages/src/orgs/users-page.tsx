import { Link } from "@tanstack/react-router"
import { ArrowLeft as ArrowLeftIcon } from "lucide-react"
import { forwardRef, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import {
  Button,
  CardContainer,
  Container,
  Flex,
  Select,
  Separator,
  Text,
  TextField,
  Tooltip,
} from "@incmix/ui/base"
import { DataTable } from "@incmix/ui/tanstack-table"
import {
  type MemberDetails,
  type Organization,
  type UserRole,
  UserRoles,
} from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"

import { useAuth } from "../auth"
import { UserProfileImage } from "../common/components/user-profile-image"
import LoadingPage from "../common/loading-page"
import { EditableName } from "./components/editable-name"
import { EditableRole } from "./components/editable-role"
import { OrganizationLayout } from "./layouts/organisation-layout"
import { OrganisationUsersRoute } from "./routes"
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
import { getOrganizationMembersColumns } from "./utils/organization-members-table-utils"

const OrganizationHeader: React.FC<{
  organization: Organization
  onUpdateName: (newName: string) => Promise<void>
}> = ({ organization, onUpdateName }) => {
  const { t } = useTranslation(["common"])
  const ability = useContext(AbilityContext)

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

const OrganizationUsersPage: React.FC = () => {
  const { t } = useTranslation(["organizationDetails", "common"])
  const { orgHandle } = OrganisationUsersRoute.useParams()
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

  // Handle role change for a member
  const handleRoleChange = useCallback(
    async (member: MemberDetails, newRole: UserRole) => {
      if (organization) {
        await handleUpdateMemberRole(organization.id, member.userId, newRole)
      }
    },
    [organization, handleUpdateMemberRole]
  )

  // Handle removal of a member
  const handleRemoveMember = useCallback(
    (userId: string) => {
      if (organization) {
        handleRemoveMembers(organization.id, [userId])
      }
    },
    [organization, handleRemoveMembers]
  )

  // Check if a user is the current user
  const isCurrentUser = useCallback(
    (userId: string) => {
      return currentUser?.id === userId
    },
    [currentUser]
  )

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

  // Render functions for each column - these don't use hooks directly
  const renderUserName = (
    userId: string,
    fullName: string,
    isCurrent: boolean
  ) => (
    <Flex align="center" gap="2">
      <UserProfileImage size="2" userId={userId} />
      <Text>
        {fullName}
        {isCurrent && ` (${t("common:you")})`}
      </Text>
    </Flex>
  )

  const renderEmail = (email: string) => (
    <Flex align="center" className="h-full">
      {email}
    </Flex>
  )

  const renderRole = (role: UserRole, member: MemberDetails) => (
    <Flex align="center" className="h-full">
      <EditableRole
        currentRole={role}
        onUpdateRole={(newRole) => handleRoleChange(member, newRole)}
        editable={ability.can("update", "Member")}
      />
    </Flex>
  )

  const renderActions = (member: MemberDetails) => {
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

  // Get columns for the DataTable
  const columns = getOrganizationMembersColumns(
    t,
    currentUser?.id,
    ability,
    renderUserName,
    renderEmail,
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
          {
            label: "Members",
            url: `/organization/${orgHandle}/users`,
          },
        ]}
      >
        <OrganizationLayout activeTab="users">
          <Container size="3">
            <CardContainer>
              <Flex direction="column" gap="4">
                <OrganizationHeader
                  organization={organization}
                  onUpdateName={handleUpdateName}
                />
                <Separator size="4" />

                {/* DataTable replaces the previous Table component */}
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
        </OrganizationLayout>
      </DashboardLayout>
    </AbilityContext.Provider>
  )
}

export default OrganizationUsersPage
