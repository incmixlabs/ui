import { AuthWrapper } from "@incmix/ui/auth-wrapper"
import {
  Step,
  type StepItem,
  Stepper,
  StepperProvider,
} from "@incmix/ui/stepper"
import { Flex } from "@incmix/ui"
import { StepperFooter } from "./stepper-footer"
import { formSchema } from "./form-schema"

import { jsonSchemaToZod } from "json-schema-to-zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import AutoForm from "../auto-form"

const convertToZod = (schema: any) => {
  try {
    const zodSchemaString = jsonSchemaToZod(schema)

    if (!zodSchemaString) {
      console.error("Failed to convert schema to Zod")
      return z.object({})
    }
    const zodSchemaFunction = new Function("z", `return ${zodSchemaString}`)
    return zodSchemaFunction(z)
  } catch (error) {
    console.error("Error converting schema to Zod:", error)
    return z.object({})
  }
}

export const Onboarding = () => {
  const [stepData, setStepData] = useState<Record<number, any>>({})
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [totalSteps, setTotalSteps] = useState<number>(0)

  useEffect(() => {
    if (formSchema) setTotalSteps(formSchema.steps.length)
  }, [])

  const handleFormDataChange = (newData: any) => {
    setStepData({ ...stepData, [currentStep]: newData })
  }

  const handleFormSubmit = async () => {
    // This will be called when clicking next/finish
    const currentFormData = stepData[currentStep] || {}
    console.log("Current form data: ", currentFormData)

    if (currentStep === totalSteps - 1) {
      // On last step, handle final submission
      const finalDataArray = Object.entries({
        ...stepData,
        [currentStep]: currentFormData,
      }).map(([key, value]) => ({
        stepIcon: formSchema.steps[Number.parseInt(key)].stepIcon,
        label: formSchema.steps[Number.parseInt(key)].label,
        data: value,
      }))
      console.log(finalDataArray)
    } else {
      // On intermediate steps, just save the data and move to next step
      handleFormDataChange(currentFormData)
      setCurrentStep(currentStep + 1)
    }
    return true
  }

  if (formSchema && (!formSchema.steps || formSchema.steps.length === 0)) {
    return (
      <div>
        <p>There are no steps to display.</p>
      </div>
    )
  }

  return (
    <div className="h-full">
      <Flex className="h-full" direction="column" justify="center">
        <StepperProvider
          value={{
            steps: formSchema.steps.map((step) => ({
              label: step.label,
              description: step.stepIcon,
            })),
            initialStep: currentStep,
          }}
        >
          <Stepper
            orientation="horizontal"
            steps={formSchema.steps.map((step) => ({
              label: step.label,
              description: step.stepIcon,
            }))}
            initialStep={currentStep}
          >
            {formSchema.steps.map((step, index) => (
              <Step
                key={step.label}
                label={step.label}
                description={step.stepIcon}
              >
                <AuthWrapper
                  title={step.stepIcon}
                  subTitle={step.label}
                  image={`step${index + 1}`}
                >
                  <div className="mt-8">
                    <AutoForm
                      formSchema={convertToZod(step.formSchema)}
                      fieldConfig={step.fieldConfig}
                      values={stepData[index]}
                      onValuesChange={(values) => {
                        setStepData((prev) => ({ ...prev, [index]: values }))
                      }}
                    />
                  </div>
                </AuthWrapper>
              </Step>
            ))}
            <StepperFooter
              formSubmit={handleFormSubmit}
              onStepChange={(step) => setCurrentStep(step)}
            />
          </Stepper>
        </StepperProvider>
      </Flex>
    </div>
  )
}
