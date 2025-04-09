/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import { Card, Flex } from "@/components/radixui"
import { Step, Stepper, StepperProvider } from "@/components/stepper"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState } from "react"
import { formSchema } from "./form-schema"

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
        <Card.Root className="w-full p-6">
          <Flex direction="column" gap="4">
            <StepperProvider
              value={{
                steps: formSchema.steps.map((step) => ({
                  label: step.label,
                  description:
                    typeof step.stepIcon === "string"
                      ? step.stepIcon
                      : undefined,
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
        </Card.Root>
      </Flex>
    </div>
  )
}
