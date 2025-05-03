import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { Text } from "@incmix/ui"
import { USERS_API_URL } from "@incmix/ui/constants"
import { Onboarding } from "@incmix/ui/onboarding"

interface OnboardingData {
  email: string
  userId: string
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
        userId: userData.userId,
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

      try {
        // Create AbortController for request cancellation
        const controller = new AbortController()

        // Call the users/onboarding API endpoint
        const response = await fetch(`${USERS_API_URL}/onboarding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          credentials: "include",
          signal: controller.signal,
        })

        // Handle empty successful responses
        if (response.status === 204 || response.status === 205) {
          return null
        }

        // Safely parse JSON (might be empty)
        const payload = await response.json().catch(() => ({}))

        // Check if response was not successful
        if (!response.ok) {
          throw new Error(payload.message || "Failed to submit onboarding data")
        }

        return payload
      } catch (error) {
        // Handle fetch errors (network issues, etc.)
        console.error("API call failed:", error)
        throw error instanceof Error
          ? error
          : new Error("Network error or service unavailable")
      }
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

  const handleOnboardingComplete = async (
    formData: any,
    userData: UserData
  ) => {
    // Add additional validation and logging before mutation
    console.log("Form data received:", formData)
    console.log("referralSources type:", typeof formData.referralSources)
    console.log("referralSources value:", formData.referralSources)

    try {
      // Use mutateAsync with await to catch errors locally
      await onboardingMutation.mutateAsync({ formData, userData })
    } catch (err) {
      console.error("Error in handleOnboardingComplete:", err)
      // Note: The onError callback in useMutation will also fire
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
