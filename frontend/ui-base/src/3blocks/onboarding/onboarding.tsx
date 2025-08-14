import { useMediaQuery } from "@/hooks/use-media-query"
import { useEffect, useState } from "react"
import { StepperProvider } from "../stepper"
import { formSchema } from "./form-schema"
import { StepForm } from "./step-form"

export type OnboardingProps = {
  onComplete: (data: any, userData: any) => Promise<void>
  onError?: (error: Error) => void
}

export const Onboarding = ({ onComplete, onError }: OnboardingProps) => {
  const [stepData, setStepData] = useState<Record<number, any>>({})
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const handleFinalSubmit = async (finalData: Record<number, any>) => {
    if (!userData) {
      const error = new Error(
        "User data not found for onboarding. Please sign up again."
      )
      console.error(error.message)
      onError?.(error)
      return
    }

    // Combine all step data
    const onboardingData = Object.values(finalData).reduce((acc, curr) => {
      return Object.assign(acc, curr)
    }, {})

    // Add user data from signup
    const completeData = {
      ...onboardingData,
      userId: userData.userId,
      email: userData.email,
    }

    try {
      // Call the onComplete callback with the combined data
      await onComplete(completeData, userData)
    } catch (error) {
      console.error("Onboarding submission error:", error)
      onError?.(error instanceof Error ? error : new Error(String(error)))
    }
  }

  useEffect(() => {
    // Retrieve user data from localStorage
    try {
      const raw = localStorage.getItem("signupUserData")
      if (raw) {
        setUserData(JSON.parse(raw))
      } else {
        const err = new Error("Missing signupUserData in localStorage")
        console.warn(err.message)
        onError?.(err)
        setUserData(null)
      }
    } catch (e) {
      console.error("Corrupted signupUserData in localStorage", e)
      onError?.(e instanceof Error ? e : new Error(String(e)))
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }, [onError])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-blue-500 border-t-2 border-b-2" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md text-center text-muted text-sm">
          <p>
            User data not found. Please sign up again to continue onboarding.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900">
      <StepperProvider
        value={{
          steps: formSchema.steps.map((step) => ({
            label: step.label,
            icon: typeof step.stepIcon === "string" ? undefined : step.stepIcon,
            description:
              typeof step.stepIcon === "string" ? step.stepIcon : undefined,
          })),
          initialStep: 0,
        }}
      >
        <StepForm
          steps={formSchema.steps}
          stepData={stepData}
          setStepData={setStepData}
          onFinalSubmit={handleFinalSubmit}
        />
      </StepperProvider>
    </div>
  )
}
