import jsonSchemaToZod from "json-schema-to-zod"
import { z } from "zod"
import { AuthWrapper } from "../auth-wrapper"
import AutoForm from "../auto-form"
import { useStepper } from "../stepper"
import { StepperFooter } from "./stepper-footer"
import { Separator } from "../separator"

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
      console.error("Error converting to Zod:", error, {
        schemaId: schema.id || "unknown",
      })
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

  // Configure title and subtitle based on step
  const title = ""
  const subtitle = activeStep === 0 ? "Hi! Welcome to Incmix" :
                  activeStep === 1 ? "Create your account!" : step.label

  return (
    <AuthWrapper
      title={title}
      subTitle={subtitle}
      image={`step${activeStep + 1}`}
      step={activeStep + 1}
      showFooterLinks={activeStep === 0}
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

        {/* Add Google login button after Submit button on first step */}
        {activeStep === 0 && (
  <>
    <div className="my-4 relative flex w-full items-center">
      <div className="flex-grow">
        <Separator className="bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="px-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
      </div>
      <div className="flex-grow">
        <Separator className="bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>

    <button
      type="button"
      className="flex w-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
      </svg>
      Continue with Google
    </button>

    <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
      Already have an account? <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Log In</a>
    </div>
  </>
)}
      </AutoForm>
    </AuthWrapper>
  )
}