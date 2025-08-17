import { toast } from "@incmix/ui"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import { Avatar, AvatarEditable } from "@incmix/ui"
import {
  useCurrentUser,
  useProfilePicture,
  useProfilePictureUrl,
  useUser,
} from "../../auth"

export type UserProfileImageProps = {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  editable?: boolean
  onImageChange?: () => void
  onImageDelete?: () => void
  userId: string
}

export const UserProfileImage: React.FC<UserProfileImageProps> = ({
  size = "3",
  editable = false,
  onImageChange,
  onImageDelete,
  userId,
}) => {
  const { t } = useTranslation(["profile", "common"])
  const queryClient = useQueryClient()
  const { user } = useUser(userId)
  const {
    handleAddProfilePicture,
    handleDeleteProfilePicture,
    isDeletingProfilePicture,
  } = useProfilePicture(user?.id ?? "")
  const profilePictureUrl = useProfilePictureUrl(user?.id ?? "")

  if (!user) {
    return null
  }

  const handleImageUpload = async (file: File) => {
    try {
      await handleAddProfilePicture(file)
      queryClient.invalidateQueries({
        queryKey: ["profilePictureUrl", userId],
      })
      toast.success(t("success.uploadProfilePicture"))
      onImageChange?.()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("error.uploadProfilePicture")
      toast.error(message)
    }
  }

  const handleImageDelete = async () => {
    try {
      await handleDeleteProfilePicture()
      queryClient.invalidateQueries({
        queryKey: ["profilePictureUrl", userId],
      })
      toast.success(t("success.deleteProfilePicture"))
      onImageDelete?.()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("error.deleteProfilePicture")
      toast.error(message)
    }
  }

  const avatarUrl = profilePictureUrl || user?.avatar || undefined

  if (!editable) {
    return <Avatar size={size} src={avatarUrl} name={user?.name} />
  }

  return (
    <AvatarEditable
      size={size}
      src={avatarUrl}
      name={user?.name}
      className="h-64 w-64 rounded-app"
      onImageChange={handleImageUpload}
      onImageDelete={handleImageDelete}
      isDeletingImage={isDeletingProfilePicture}
    />
  )
}

type CurrentUserProfileImageProps = Omit<UserProfileImageProps, "userId">

export const CurrentUserProfileImage: React.FC<
  CurrentUserProfileImageProps
> = ({ size = "3", editable = false, onImageChange, onImageDelete }) => {
  const { user } = useCurrentUser()
  return (
    <UserProfileImage
      userId={user?.id ?? ""}
      size={size}
      editable={editable}
      onImageChange={onImageChange}
      onImageDelete={onImageDelete}
    />
  )
}
