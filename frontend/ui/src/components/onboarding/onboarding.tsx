import { useMediaQuery } from "@hooks/use-media-query"
import { useState } from "react"
import { formSchema } from "./form-schema"
import { StepForm } from "./step-form"
import { StepperProvider } from "@incmix/ui/stepper"

export const Onboarding = () => {
  const [stepData, setStepData] = useState<Record<number, any>>({})
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleFinalSubmit = (finalData: Record<number, any>) => {
    // Combine all step data using Object.assign instead of spread
    const combinedData = Object.values(finalData).reduce((acc, curr) => {
      return Object.assign(acc, curr)
    }, {})

    console.log("Final Combined Data:", combinedData)
  }

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-900">
      <StepperProvider
        value={{
          steps: formSchema.steps.map((step) => ({
            label: step.label,
            icon: typeof step.stepIcon === 'string' ? undefined : step.stepIcon,
            description: typeof step.stepIcon === 'string' ? step.stepIcon : undefined,
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