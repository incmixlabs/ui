import {
  Box,
  CardContainer,
  Container,
  Flex,
  Grid,
  Heading,
  PageHeader,
  ReactiveButton,
  Select,
  Text,
  ThemePlayground,
} from "@incmix/ui"
import AutoForm from "@incmix/ui/auto-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { useCurrentUser, useProfileUpdate } from "@auth"
import { LoadingPage } from "@common"
import { useAppearanceStore } from "@incmix/store/use-settings-store"
import { AUTH_API_URL } from "@incmix/ui/constants"
import type { UserProfile } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { Aperture, Globe, Info, Lock, Palette } from "lucide-react"
import {
  ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../ui/src/components/shadcn"
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
    }: {
      currentPassword: string
      newPassword: string
    }) => {
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

const ProfileSection: React.FC<{ user?: UserProfile }> = ({ user }) => {
  console.log(user)

  return (
    <CardContainer className="w-fit shrink-0">
      <Heading
        size="4"
        mb="4"
        color="gray"
        weight="regular"
        className="flex items-center gap-2"
      >
        <Aperture size={20} />
        Profile Photo
      </Heading>
      <CurrentUserProfileImage size="9" editable />
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
    <CardContainer className="w-full">
      <Heading
        size="4"
        mb="4"
        color="gray"
        weight="regular"
        className="flex items-center gap-2"
      >
        <Info size={20} /> {t("generalInfo")}
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
          className="h-11 w-full"
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
      <Heading
        size="5"
        mb="4"
        color="gray"
        weight={"regular"}
        className="flex items-center gap-2"
      >
        <Lock size={20} /> {t("changePassword")}
      </Heading>
      <AutoForm
        formSchema={schemaWithTranslations}
        fieldConfig={passwordChangeFormSchema.fieldConfig}
        onSubmit={handleSubmit}
        className="space-y-1"
      >
        {passwordChangeError && (
          <Text color="red">{passwordChangeError.message}</Text>
        )}
        <ReactiveButton
          type="submit"
          loading={isPasswordChangePending}
          className="h-11 w-full"
        >
          {t("changePassword")}
        </ReactiveButton>
      </AutoForm>
    </CardContainer>
  )
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useAppearanceStore()
  const { t } = useTranslation(["settings", "common"])

  return (
    <CardContainer>
      <Heading
        size="5"
        mb="4"
        color="gray"
        weight="regular"
        className="flex items-center gap-2"
      >
        <Globe size={20} /> {t("languageSettings")}
      </Heading>
      <Flex direction="column" gap="2">
        <Text as="label" size="2" color="gray">
          {t("selectLanguage")}
        </Text>
        <Select.Root value={language} onValueChange={setLanguage}>
          <Select.Trigger className="h-11" />
          <Select.Content>
            <Select.Item value="en">English</Select.Item>
            <Select.Item value="pt">Português</Select.Item>
          </Select.Content>
        </Select.Root>
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
    <DashboardLayout>
      <Box className="px-12">
        <PageHeader title={t("Account Settings")} isPreviousIcon />
        <ShadcnTabs defaultValue={"general"}>
          <TabsList className="w-full">
            <Box className="w-full px-0.5">
              <TabsTrigger value="general" className="h-9">
                <Info size={20} />
                {t("General")}
              </TabsTrigger>
              <TabsTrigger value="theme-settings" className="h-9">
                <Palette size={20} />
                {t("Theme Settings")}
              </TabsTrigger>
            </Box>
          </TabsList>
          <TabsContent value="general" className="h-full space-y-4 pt-2">
            <Flex gap="4" className="w-full">
              <ProfileSection user={user} />
              <GeneralInfoForm {...generalInfoForm} />
            </Flex>
            <PasswordChangeForm {...passwordChangeForm} />
            <LanguageSelector />
          </TabsContent>
          <TabsContent value="theme-settings" className="h-full">
            <ThemePlayground />
          </TabsContent>
        </ShadcnTabs>
      </Box>
    </DashboardLayout>
  )
}

export default SettingsPage
