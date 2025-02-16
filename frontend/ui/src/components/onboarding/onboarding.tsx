import { Button, Card, Flex } from "@incmix/ui"
import { Step, Stepper, StepperProvider, useStepper } from "@incmix/ui/stepper"
import { useMediaQuery } from "@hooks/use-media-query"
import { formSchema } from "./form-schema"
import { useState } from "react"

import { StepForm } from "./step-form"

export const Onboarding = () => {
  const [stepData, setStepData] = useState<Record<number, any>>({})

  const isDesktop = useMediaQuery("(min-width: 768px)")

  console.log(" Step Data: ", stepData)

  const handleFinalSubmit = (finalData: Record<number, any>) => {
    // Combine all step data using Object.assign instead of spread
    const combinedData = Object.values(finalData).reduce((acc, curr) => {
      return Object.assign(acc, curr)
    }, {})

    console.log("Final Combined Data:", combinedData)
  }

  return (
    <div className="h-full w-[1000px] p-4 ">
      <Flex
        className="h-full"
        direction="column"
        justify="center"
        align="center"
      >
        <Card className="w-full p-6">
          <Flex direction="column" gap="4">
            <StepperProvider
              value={{
                steps: formSchema.steps.map((step) => ({
                  label: step.label,
                  description: step.stepIcon,
                })),
                initialStep: 0,
              }}
            >
              <Stepper
                steps={formSchema.steps}
                orientation={isDesktop ? "horizontal" : "vertical"}
              >
                {formSchema.steps.map((step, index) => (
                  <Step
                    key={step.label}
                    label={step.label}
                    description={step.stepIcon}
                  >
                    <StepForm
                      step={step}
                      index={index}
                      stepData={stepData}
                      setStepData={setStepData}
                      onFinalSubmit={handleFinalSubmit}
                    />
                  </Step>
                ))}
              </Stepper>
            </StepperProvider>
          </Flex>
        </Card>
      </Flex>
    </div>
  )
}
