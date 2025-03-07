import jsonSchemaToZod from "json-schema-to-zod"
import { z } from "zod"
import { AuthWrapper } from "../auth-wrapper"
import AutoForm from "../auto-form"
import { useStepper } from "../stepper"
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

  // Simplified conversion - using json-schema-to-zod directly
  const convertToZod = (schema: any) => {
    try {
      // Generate Zod code from JSON Schema
      const zodString = jsonSchemaToZod(schema)

      // Create a function that returns the Zod schema
      const zodSchemaFunction = new Function("z", `return ${zodString}`)

      // Return the Zod schema
      return zodSchemaFunction(z)
    } catch (error) {
      console.error("Error converting to Zod:", error)
      return null
    }
  }

  // Handle form values change
  const handleValuesChange = (values: any) => {
    setStepData((prev) => ({
      ...prev,
      [activeStep]: values,
    }))
  }

  // Handle form submission
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

  // Convert the JSON schema to Zod schema
  const zodSchema = convertToZod(step.formSchema)

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
        formSchema={zodSchema}
        values={stepData[activeStep] || {}}
        fieldConfig={step?.fieldConfig ?? {}}
        dependencies={step?.dependencies ?? {}}
      >
        <StepperFooter />
      </AutoForm>
    </AuthWrapper>
  )
}
