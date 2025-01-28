import {
  Box,
  Flex,
  Grid,
  Heading,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { z } from "zod"

import { useCurrentUser, useProfileUpdate } from "@auth"
import { LoadingPage } from "@common"
import { useLanguageStore, useThemeStore } from "@incmix/store"
import { Button, CardContainer, FormField } from "@incmix/ui"
import type { UserProfile } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { PageLayout } from "../common/components/layouts/page-layout"
import { CurrentUserProfileImage } from "../common/components/user-profile-image"

const _FormButton: React.FC<{
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
  const { t } = useTranslation(["profile"])

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await handleUpdateUser(value.name.trim())
        toast.success(t("success.updateUser"))
        queryClient.invalidateQueries({ queryKey: ["user"] })
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("error.updateUser")
        toast.error(message)
      }
    },
  })

  return {
    form,
    isUpdatingUser,
    updateUserError,
  }
}

const usePasswordChangeForm = () => {
  const { t } = useTranslation(["profile"])

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      try {
        // TODO: Implement password change logic here
        console.log(value)
        toast.success(t("success.changePassword"))
      } catch (error) {
        const message =
          error instanceof Error ? error.message : t("error.changePassword")
        toast.error(message)
      }
    },
  })

  return { form }
}

const ProfileSection: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <CardContainer>
      <Flex align="center" mb="4">
        <CurrentUserProfileImage size="8" editable />
        <Box ml="4">
          <Heading size="4" color="gray">
            {user.name}
          </Heading>
          <Text color="gray">{user.email}</Text>
        </Box>
      </Flex>
    </CardContainer>
  )
}

const GeneralInfoForm: React.FC<ReturnType<typeof useGeneralInfoForm>> = ({
  form,
  isUpdatingUser,
  updateUserError,
}) => {
  const { t } = useTranslation(["settings", "common"])
  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("generalInfo")}
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Flex direction="column" gap="4">
          <form.Field
            name="name"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(1, t("nameRequired")),
            }}
          >
            {(field) => (
              <FormField
                name="name"
                label={t("common:name")}
                field={field}
              />
            )}
          </form.Field>
          <Button type="submit" disabled={isUpdatingUser}>
            {isUpdatingUser ? t("saving") : t("saveChanges")}
          </Button>
          {updateUserError && (
            <Text color="red">{updateUserError.message}</Text>
          )}
        </Flex>
      </form>
    </CardContainer>
  )
}

const PasswordChangeForm: React.FC<
  ReturnType<typeof usePasswordChangeForm>
> = ({ form }) => {
  const { t } = useTranslation(["settings", "common"])
  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("changePassword")}
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <Flex direction="column" gap="4">
          <form.Field
            name="currentPassword"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(1, t("currentPasswordRequired")),
            }}
          >
            {(field) => (
              <FormField
                name="currentPassword"
                label={t("currentPassword")}
                type="password"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="newPassword"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(8, t("newPasswordLength")),
            }}
          >
            {(field) => (
              <FormField
                name="newPassword"
                label={t("newPassword")}
                type="password"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="confirmPassword"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(1, t("confirmPasswordRequired")),
            }}
          >
            {(field) => (
              <FormField
                name="confirmPassword"
                label={t("confirmNewPassword")}
                type="password"
                field={field}
              />
            )}
          </form.Field>
          <Button type="submit">{t("changePassword")}</Button>
        </Flex>
      </form>
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
    <DashboardLayout
      breadcrumbItems={[{ label: t("settings"), url: "/settings" }]}
    >
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
    </DashboardLayout>
  )
}

export default SettingsPage
