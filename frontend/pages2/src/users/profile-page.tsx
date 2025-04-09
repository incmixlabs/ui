import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useAuth, useCurrentUser } from "@auth"
import { CardContainer } from "@incmix/ui2"
import { Box, Flex, Heading, Text } from "@incmix/ui2"
import type { UserProfile } from "@incmix/utils/types"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { CurrentUserProfileImage } from "../common/components/user-profile-image"
import LoadingPage from "../common/loading-page"

const InfoField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Box>
    <Text as="p" size="2" color="gray">
      {label}
    </Text>
    <Box className="mt-1 w-full rounded-md bg-gray-4 p-2">
      <Text color="gray">{value}</Text>
    </Box>
  </Box>
)

const ProfileHeader: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <Box className="w-full rounded-5 p-6 md:w-1/3">
      <Flex direction="column" align="center">
        <CurrentUserProfileImage size="9" />
        <Heading as="h2" size="5" color="gray" className="mt-4">
          {user?.fullName}
        </Heading>
        <Text size="2" color="gray">
          {user?.email}
        </Text>
      </Flex>
    </Box>
  )
}

const ProfileInformation: React.FC<{ user: UserProfile }> = ({ user }) => {
  const { t } = useTranslation(["profile", "common"])
  return (
    <Box className="w-full p-6 md:w-2/3">
      <Heading as="h1" size="6" className="mb-6">
        {t("profileInformation")}
      </Heading>
      <Flex direction="column" gap="4">
        <InfoField label={t("common:name")} value={user?.fullName} />
        <InfoField label={t("common:email")} value={user?.email} />
      </Flex>
    </Box>
  )
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { authUser, isLoading: isAuthLoading, isError: isAuthError } = useAuth()
  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useCurrentUser()

  useEffect(() => {
    if ((!authUser && !isAuthLoading) || isAuthError) {
      navigate({ to: "/login" })
    }
  }, [authUser, isAuthLoading, isAuthError, navigate])

  if (isUserLoading) return <LoadingPage />
  if (isUserError || !user) return null

  return (
    <DashboardLayout breadcrumbItems={[{ label: "Profile", url: "/profile" }]}>
      <CardContainer className="overflow-hidden">
        <Flex direction={{ initial: "column", md: "row" }}>
          <ProfileHeader user={user} />
          <ProfileInformation user={user} />
        </Flex>
      </CardContainer>
    </DashboardLayout>
  )
}

export default ProfilePage
