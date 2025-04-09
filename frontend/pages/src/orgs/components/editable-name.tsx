import { Button, Flex, Heading, TextField, Tooltip } from "@incmix/ui"
import { CheckIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

interface EditableNameProps {
  currentName: string
  onUpdateName: (newName: string) => Promise<void>
  editable: boolean
}

export const EditableName: React.FC<EditableNameProps> = ({
  currentName,
  onUpdateName,
  editable,
}) => {
  const { t } = useTranslation(["common", "organizationDetails"])
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(currentName)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = () => {
    setEditedName(currentName)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedName(currentName)
  }

  const handleConfirm = async () => {
    if (editedName !== currentName && editedName.trim() !== "") {
      setIsLoading(true)
      try {
        await onUpdateName(editedName.trim())
        setIsEditing(false)
        toast.success(t("organizationDetails:success.updateOrganizationName"))
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : t("organizationDetails:error.updateOrganizationName")
        toast.error(message)
        setEditedName(currentName)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsEditing(false)
    }
  }

  if (isEditing && editable) {
    return (
      <Flex gap="3" align="center">
        <TextField.Root
          className="min-w-80"
          size="3"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          disabled={isLoading}
        />
        <Tooltip content={t("common:confirm")}>
          <Button
            size="2"
            variant="soft"
            color="green"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "..." : <CheckIcon />}
          </Button>
        </Tooltip>
        <Tooltip content={t("common:cancel")}>
          <Button
            size="2"
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
      <Heading size="6" className="mb-0">
        {currentName}
      </Heading>
      {editable && (
        <Tooltip content={t("organizationDetails:editName")}>
          <Button size="2" variant="ghost" onClick={handleEdit}>
            <Pencil1Icon />
          </Button>
        </Tooltip>
      )}
    </Flex>
  )
}
