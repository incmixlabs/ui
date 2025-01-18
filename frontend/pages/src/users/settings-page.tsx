import {
  Box,
  Flex,
  Grid,
  Heading,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes"
import { useQueryClient } from "@tanstack/react-query"
import { Form as HouseForm } from "houseform"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"

import { useCurrentUser, useProfileUpdate } from "@auth"
import { LoadingPage } from "@common"
import { useLanguageStore, useThemeStore } from "@incmix/store"
import { Button, CardContainer, FormField } from "@incmix/ui"
import type { UserProfile } from "@jsprtmnn/utils/types"
import { PageLayout } from "../common/components/layouts/page-layout"
import { CurrentUserProfileImage } from "../common/components/user-profile-image"

const FormButton: React.FC<{
  onClick: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}> = ({ onClick, disabled, className, children }) => (
  <Button onClick={onClick} className={`${className}`} disabled={disabled}>
    {children}
  </Button>
)

const useGeneralInfoForm = (userId: string) => {
  const queryClient = useQueryClient()
  const { handleUpdateUser, isUpdatingUser, updateUserError } =
    useProfileUpdate(userId)
  const [fullName, setFullName] = useState("")
  const { t } = useTranslation(["profile"])

  const handleSubmit = async () => {
    try {
      await handleUpdateUser(fullName.trim())
      toast.success(t("success.updateUser"))
      queryClient.invalidateQueries({ queryKey: ["user"] })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("error.updateUser")
      toast.error(message)
    }
  }

  return {
    fullName,
    setFullName,
    handleSubmit,
    isUpdatingUser,
    updateUserError,
  }
}

const usePasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { t } = useTranslation(["profile"])

  const handleSubmit = () => {
    try {
      // TODO: Implement password change logic here
      console.log({ currentPassword, newPassword, confirmPassword })
      // After successful password change:
      toast.success(t("success.changePassword"))
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("error.changePassword")
      toast.error(message)
    }
  }

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  }
}

const ProfileSection: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <CardContainer>
      <Flex align="center" mb="4">
        <CurrentUserProfileImage size="8" editable />
        <Box ml="4">
          <Heading size="4" color="gray">
            {user.fullName}
          </Heading>
          <Text color="gray">{user.email}</Text>
        </Box>
      </Flex>
    </CardContainer>
  )
}

const GeneralInfoForm: React.FC<ReturnType<typeof useGeneralInfoForm>> = ({
  fullName,
  setFullName,
  handleSubmit,
  isUpdatingUser,
  updateUserError,
}) => {
  const { t } = useTranslation(["settings", "common"])
  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("generalInfo")}
      </Heading>
      <HouseForm onSubmit={handleSubmit}>
        {({ submit }) => (
          <Flex direction="column" gap="4">
            <FormField
              name="fullName"
              label={t("common:fullName")}
              value={fullName}
              onChange={setFullName}
              validation={z.string().min(1, t("nameRequired"))}
            />
            <FormButton onClick={submit} disabled={isUpdatingUser}>
              {isUpdatingUser ? t("saving") : t("saveChanges")}
            </FormButton>
            {updateUserError && (
              <Text color="red">{updateUserError.message}</Text>
            )}
          </Flex>
        )}
      </HouseForm>
    </CardContainer>
  )
}

const PasswordChangeForm: React.FC<
  ReturnType<typeof usePasswordChangeForm>
> = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
}) => {
  const { t } = useTranslation(["settings", "common"])
  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("changePassword")}
      </Heading>
      <HouseForm onSubmit={handleSubmit}>
        {({ submit }) => (
          <Flex direction="column" gap="4">
            <FormField
              name="currentPassword"
              label={t("currentPassword")}
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              validation={z.string().min(1, t("currentPasswordRequired"))}
            />
            <FormField
              name="newPassword"
              label={t("newPassword")}
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              validation={z.string().min(8, t("newPasswordLength"))}
            />
            <FormField
              name="confirmPassword"
              label={t("confirmNewPassword")}
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              validation={z.string().min(1, t("confirmPasswordRequired"))}
            />
            <FormButton onClick={submit} className="mt-4">
              {t("changePassword")}
            </FormButton>
          </Flex>
        )}
      </HouseForm>
    </CardContainer>
  )
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguageStore()
  const { t } = useTranslation(["settings", "common"])

  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("languageSettings")}
      </Heading>
      <Flex direction="column" gap="2">
        <Text as="label" size="2" color="gray">
          {t("selectLanguage")}
        </Text>
        <Select.Root value={language} onValueChange={setLanguage}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="en">English</Select.Item>
            <Select.Item value="pt">Português</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </CardContainer>
  )
}

const ThemeSettings: React.FC = () => {
  const { t } = useTranslation(["settings", "common"])
  const { theme, toggleTheme } = useThemeStore()

  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("themeSettings")}
      </Heading>
      <Flex align="center" justify="between">
        <Text>{t("darkMode")}</Text>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => toggleTheme()}
        />
      </Flex>
    </CardContainer>
  )
}

const SettingsPage: React.FC = () => {
  const { t } = useTranslation(["settings", "common"])
  const { user, isLoading, isError } = useCurrentUser()
  const generalInfoForm = useGeneralInfoForm(user?.id ?? "")
  const passwordChangeForm = usePasswordChangeForm()

  if (isLoading) return <LoadingPage />
  if (isError || !user) return null

  return (
    <PageLayout>
      <Flex direction="column" className="min-h-full">
        <Heading size="6" mb="6">
          {t("settings")}
        </Heading>

        <Grid
          columns={{ initial: "1", md: "2" }}
          gap="6"
          className="w-full flex-1"
        >
          <Flex direction="column" gap="6">
            <ProfileSection user={user} />
            <LanguageSelector />
            <ThemeSettings />
          </Flex>

          <Flex direction="column" gap="6">
            <GeneralInfoForm {...generalInfoForm} />
            <PasswordChangeForm {...passwordChangeForm} />
          </Flex>
        </Grid>
      </Flex>
    </PageLayout>
  )
}

export default SettingsPage
