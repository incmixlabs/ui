import { Box, Flex, Grid, Heading, Select, Switch, Text } from "@incmix/ui"
import AutoForm from "@incmix/ui/auto-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { useCurrentUser, useProfileUpdate } from "@auth"
import { LoadingPage } from "@common"
import { useLanguageStore, useThemeStore } from "@incmix/store"
import { Button, CardContainer, ReactiveButton } from "@incmix/ui"
import { AUTH_API_URL } from "@incmix/ui/constants"
import type { UserProfile } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { CurrentUserProfileImage } from "../common/components/user-profile-image"
import {
  generalInfoFormSchema,
  passwordChangeFormSchema,
} from "./settings-form-schema"

const useGeneralInfoForm = (userId: string, initialName: string) => {
  const queryClient = useQueryClient()
  const { handleUpdateUser, isUpdatingUser, updateUserError } =
    useProfileUpdate(userId)
  const { t } = useTranslation(["profile"])

  // Create a schema with translated validation messages
  const schemaWithTranslations = {
    ...generalInfoFormSchema.formSchema,
    properties: {
      ...generalInfoFormSchema.formSchema.properties,
      name: {
        ...generalInfoFormSchema.formSchema.properties.name,
        errorMessage: {
          minLength: t("nameRequired"),
        },
      },
    },
  }

  const handleSubmit = async (values: { [key: string]: any }) => {
    try {
      await handleUpdateUser(values.name.trim())
      toast.success(t("success.updateUser"))
      queryClient.invalidateQueries({ queryKey: ["user"] })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("error.updateUser")
      toast.error(message)
    }
  }

  return {
    schemaWithTranslations,
    initialValues: { name: initialName },
    handleSubmit,
    isUpdatingUser,
    updateUserError,
  }
}

const usePasswordChangeForm = () => {
  const { t } = useTranslation(["profile"])

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: { currentPassword: string; newPassword: string }) => {
      const response = await fetch(`${AUTH_API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(t("error.changePassword"))
      }

      return response.json() as Promise<{ message: string }>
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // Create a schema with translated validation messages
  const schemaWithTranslations = {
    ...passwordChangeFormSchema.formSchema,
    properties: {
      ...passwordChangeFormSchema.formSchema.properties,
      currentPassword: {
        ...passwordChangeFormSchema.formSchema.properties.currentPassword,
        errorMessage: {
          minLength: t("currentPasswordRequired"),
        },
      },
      newPassword: {
        ...passwordChangeFormSchema.formSchema.properties.newPassword,
        errorMessage: {
          minLength: t("newPasswordLength"),
        },
      },
      confirmPassword: {
        ...passwordChangeFormSchema.formSchema.properties.confirmPassword,
        errorMessage: {
          minLength: t("confirmPasswordRequired"),
        },
      },
    },
  }

  const handleSubmit = (values: { [key: string]: any }) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        toast.error(t("error.confirmPassword"))
        return
      }
      mutate({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("error.changePassword")
      toast.error(message)
    }
  }

  return {
    schemaWithTranslations,
    handleSubmit,
    isPasswordChangePending: isPending,
    passwordChangeError: error,
  }
}

const ProfileSection: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <CardContainer>
      <Flex align="center" mb="4">
        <CurrentUserProfileImage size="8" editable />
        <Box ml="4">
          <Heading size="4" color="gray">
            {user?.name}
          </Heading>
          <Text color="gray">{user.email}</Text>
        </Box>
      </Flex>
    </CardContainer>
  )
}

const GeneralInfoForm: React.FC<ReturnType<typeof useGeneralInfoForm>> = ({
  schemaWithTranslations,
  initialValues,
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
      <AutoForm
        formSchema={schemaWithTranslations}
        fieldConfig={generalInfoFormSchema.fieldConfig}
        onSubmit={handleSubmit}
        values={initialValues}
        className="space-y-4"
      >
        {updateUserError && <Text color="red">{updateUserError.message}</Text>}
        <ReactiveButton
          type="submit"
          loading={isUpdatingUser}
          color="blue"
          className="w-full"
        >
          {isUpdatingUser ? t("saving") : t("saveChanges")}
        </ReactiveButton>
      </AutoForm>
    </CardContainer>
  )
}

const PasswordChangeForm: React.FC<
  ReturnType<typeof usePasswordChangeForm>
> = ({
  schemaWithTranslations,
  handleSubmit,
  isPasswordChangePending,
  passwordChangeError,
}) => {
  const { t } = useTranslation(["settings", "common"])
  return (
    <CardContainer>
      <Heading size="4" mb="4" color="gray">
        {t("changePassword")}
      </Heading>
      <AutoForm
        formSchema={schemaWithTranslations}
        fieldConfig={passwordChangeFormSchema.fieldConfig}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {passwordChangeError && (
          <Text color="red">{passwordChangeError.message}</Text>
        )}
        <ReactiveButton
          type="submit"
          color="blue"
          loading={isPasswordChangePending}
          className="w-full"
        >
          {t("changePassword")}
        </ReactiveButton>
      </AutoForm>
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
  const generalInfoForm = useGeneralInfoForm(user?.id ?? "", user?.name ?? "")
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
