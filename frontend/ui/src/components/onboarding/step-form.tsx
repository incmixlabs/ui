import { useStepper } from "../stepper"
import { AuthWrapper } from "../auth-wrapper"
import AutoForm from "../auto-form"
import { z } from "zod"
import jsonSchemaToZod from "json-schema-to-zod"
import { StepperFooter } from "./stepper-footer"

interface StepFormProps {
  step: any
  index: number
  stepData: Record<number, any>
  setStepData: React.Dispatch<React.SetStateAction<Record<number, any>>>
  onFinalSubmit: (data: Record<number, any>) => void
}

export const StepForm = ({
  step,
  index,
  stepData,
  setStepData,
  onFinalSubmit,
}: StepFormProps) => {
  const { nextStep, activeStep, isLastStep } = useStepper()

  const convertToZod = (schema: any) => {
    try {
      const zodSchemaFunction = new Function(
        "z",
        `return ${jsonSchemaToZod(schema)}`
      )
      return zodSchemaFunction(z)
    } catch {
      return null
    }
  }

  // Add this function to continuously save form data as it changes
  const handleValuesChange = (values: any) => {
    setStepData((prev) => ({
      ...prev,
      [activeStep]: values,
    }))
  }

  const handleSubmit = (data: any) => {
    // Update the step data with the current form data
    const updatedStepData = {
      ...stepData,
      [activeStep]: data,
    }

    // Save the updated step data
    setStepData(updatedStepData)

    if (isLastStep) {
      // Call final submit with all data
      onFinalSubmit(updatedStepData)
      // Move to completed state
      nextStep()
    } else {
      // Move to next step
      nextStep()
    }
  }

  return (
    <AuthWrapper
      title="Welcome!"
      subTitle={step.label}
      image={`step${index + 1}`}
    >
      <AutoForm
        key={`form-${activeStep}`}
        onSubmit={handleSubmit}
        onValuesChange={handleValuesChange}
        formSchema={convertToZod(step.formSchema)}
        values={stepData[activeStep] || {}}
        fieldConfig={step?.fieldConfig ?? {}}
        dependencies={step?.dependencies ?? {}}
      >
        <StepperFooter />
      </AutoForm>
    </AuthWrapper>
  )
}
