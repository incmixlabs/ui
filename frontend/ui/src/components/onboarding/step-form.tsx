import { zodResolver } from "@hookform/resolvers/zod"
import jsonSchemaToZod from "json-schema-to-zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AuthWrapper } from "../auth-wrapper"
import AutoForm from "../auto-form"
import { useStepper } from "../stepper"
import { formSchema } from "./form-schema"
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

  const handleSubmit = (data: any) => {
    // First save the data
    setStepData({
      ...stepData,
      [activeStep]: data,
    })

    if (isLastStep) {
      // Call final submit with all data
      onFinalSubmit({
        ...stepData,
        [activeStep]: data,
      })
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
        key={activeStep}
        onSubmit={handleSubmit}
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
