import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { Text } from "@incmix/ui"
import { USERS_API_URL } from "@incmix/ui/constants"
import { Onboarding } from "@incmix/ui/onboarding"

interface OnboardingData {
  email: string
  companyName: string
  companySize: string
  teamSize: string
  purpose: string
  role: string
  manageFirst: string
  focusFirst: string
  referralSources: string[]
}

interface UserData {
  email: string
  userId: string
}

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  // Use TanStack Query's useMutation hook for the API call
  const onboardingMutation = useMutation<
    any,
    Error,
    { formData: any; userData: UserData }
  >({
    mutationFn: async ({ formData, userData }) => {
      // Prepare request payload
      const requestData: OnboardingData = {
        email: userData.email,
        companyName: formData.companyName || "",
        companySize: formData.companySize || "",
        teamSize: formData.teamSize || "",
        purpose: formData.purpose || "",
        role: formData.role || "",
        manageFirst: formData.manageFirst || "",
        focusFirst: formData.focusFirst || "",
        referralSources: Array.isArray(formData.referralSources)
          ? formData.referralSources
          : [],
      }

      // Log the request data for debugging
      console.log("Sending onboarding data:", JSON.stringify(requestData))

      // Call the users/onboarding API endpoint
      const response = await fetch(`${USERS_API_URL}/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit onboarding data")
      }

      const user = await response.json()
      return user
    },
    onSuccess: (_responseData, variables) => {
      // Get userData from the variables that were passed to mutate()
      const { userData } = variables
      console.log("User Data from onboarding:", userData)

      // Clear the signup data from localStorage after successful submission
      localStorage.removeItem("signupUserData")

      // Redirect to welcome page with email in URL
      navigate({
        to: "/welcome",
        search: { email: userData.email },
      })
    },
    onError: (error: Error) => {
      console.error("Onboarding submission error:", error)
      setError(error.message)
    },
  })

  // Handle onboarding completion

  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleOnboardingComplete = async (
    formData: any,
    userData: UserData
  ) => {
    try {
      // Add additional validation and logging before mutation
      console.log("Form data received:", formData)
      console.log("referralSources type:", typeof formData.referralSources)
      console.log("referralSources value:", formData.referralSources)

      onboardingMutation.mutate({ formData, userData })
    } catch (err) {
      console.error("Error in handleOnboardingComplete:", err)
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const handleError = (error: Error) => {
    setError(error.message)
    console.error("Onboarding error:", error)
  }

  return (
    <div>
      {error && (
        <div
          className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {onboardingMutation.isSuccess && (
        <Text color="green" size="2" className="mb-4">
          Onboarding completed successfully!
        </Text>
      )}

      <Onboarding onComplete={handleOnboardingComplete} onError={handleError} />
    </div>
  )
}

export default OnboardingPage
