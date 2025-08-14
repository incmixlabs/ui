import { AuthWrapper } from "@/layouts/auth-wrapper"
import AutoForm from "../auto-form"
import { useStepper } from "../stepper"
import { StepperFooter } from "./stepper-footer"

interface StepFormProps {
  steps: any[]
  stepData: Record<number, any>
  setStepData: React.Dispatch<React.SetStateAction<Record<number, any>>>
  onFinalSubmit: (data: Record<number, any>) => void
}

export const StepForm = ({
  steps,
  stepData,
  setStepData,
  onFinalSubmit,
}: StepFormProps) => {
  const { nextStep, activeStep, isLastStep } = useStepper()

  // Get current step
  const step = steps[activeStep]

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
      // Don't move to next step if it's the last step
      // This prevents going to a "completed" state that might show errors
    } else {
      // Move to next step
      nextStep()
    }
  }

  // Configure title and subtitle based on step
  const title = ""
  const subtitle = activeStep === 0 ? "Hi! Welcome to Incmix" : step.label

  // Map current step index to the correct image number after removal of Account Details step
  const getStepImageNumber = (currentStep: number) => {
    // If we're on step 0, use image 1
    // If we're on step 1 or higher, add 2 to account for the removed Account Details step
    return currentStep === 0 ? 1 : currentStep + 2
  }

  return (
    <AuthWrapper
      title={title}
      subTitle={subtitle}
      image={`step${getStepImageNumber(activeStep)}`}
      step={activeStep + 1}
      showFooterLinks={false}
      totalSteps={steps.length}
    >
      {/* Pass JSON schema directly to AutoForm */}
      <AutoForm
        key={`form-${activeStep}`}
        onSubmit={handleSubmit}
        onValuesChange={handleValuesChange}
        formSchema={step.formSchema}
        values={stepData[activeStep] || {}}
        fieldConfig={step?.fieldConfig ?? {}}
        dependencies={step?.dependencies ?? {}}
      >
        <StepperFooter />
      </AutoForm>
    </AuthWrapper>
  )
}
