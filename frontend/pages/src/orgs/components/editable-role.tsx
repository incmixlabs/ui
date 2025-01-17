import { CheckIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons"
import { Button, Flex, Select, Spinner, Text, Tooltip } from "@radix-ui/themes"
import type { MemberRole } from "@jsprtmnn/utils/types"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

interface EditableRoleProps {
  currentRole: MemberRole
  onUpdateRole: (newRole: MemberRole) => Promise<void>
  editable: boolean
}

export const EditableRole: React.FC<EditableRoleProps> = ({
  currentRole,
  onUpdateRole,
  editable,
}) => {
  const { t } = useTranslation(["common", "roles", "organizationDetails"])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedRole, setSelectedRole] = useState<MemberRole>(currentRole)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    setSelectedRole(currentRole)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSelectedRole(currentRole)
  }

  const handleConfirm = async () => {
    if (selectedRole !== currentRole) {
      setIsLoading(true)
      try {
        await onUpdateRole(selectedRole)
        setSelectedRole(selectedRole)
        toast.success(t("organizationDetails:success.updateMemberRole"))
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : t("organizationDetails:error.updateMemberRole")
        toast.error(message)
        setSelectedRole(currentRole)
      } finally {
        setIsLoading(false)
        setIsEditing(false)
      }
    } else {
      setIsEditing(false)
    }
  }

  if (isEditing && editable) {
    return (
      <Flex gap="3" align="center">
        <Select.Root
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as MemberRole)}
          disabled={isLoading}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="owner">{t("roles:owner")}</Select.Item>
            <Select.Item value="admin">{t("roles:admin")}</Select.Item>
            <Select.Item value="editor">{t("roles:editor")}</Select.Item>
            <Select.Item value="commenter">{t("roles:commenter")}</Select.Item>
            <Select.Item value="viewer">{t("roles:viewer")}</Select.Item>
          </Select.Content>
        </Select.Root>
        <Tooltip content={t("common:confirm")}>
          <Button
            size="1"
            variant="soft"
            color="green"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="1" /> : <CheckIcon />}
          </Button>
        </Tooltip>
        <Tooltip content={t("common:cancel")}>
          <Button
            size="1"
            variant="soft"
            color="red"
            onClick={handleCancel}
            disabled={isLoading}
          >
            <Cross1Icon />
          </Button>
        </Tooltip>
      </Flex>
    )
  }

  return (
    <Flex gap="3" align="center">
      <Text>{t(`roles:${currentRole}`)}</Text>
      <Tooltip content={t("organizationDetails:editRole")}>
        {editable && (
          <Button size="1" variant="ghost" onClick={handleEdit}>
            <Pencil1Icon />
          </Button>
        )}
      </Tooltip>
    </Flex>
  )
}
