import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme } from "../../../src/1base"
import { StepForm } from "../../../src/3blocks/onboarding/step-form"
import { StepperProvider } from "../../../src/3blocks/stepper"
import { formSchema } from "../../../src/3blocks/onboarding/form-schema"

const meta: Meta<typeof StepForm> = {
  title: "3 Blocks/Onboarding/StepForm",
  component: StepForm,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ minHeight: "100vh" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    onFinalSubmit: {
      action: "onFinalSubmit",
      description: "Callback function called when final step is submitted",
    },
    setStepData: {
      action: "setStepData",
      description: "Function to update step data",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock step data for different scenarios
const mockStepData = {
  0: { companyName: "Acme Corp" },
  1: { purpose: "working", role: "director" },
  2: { teamSize: "6-10", companySize: "50-99" },
  3: { manageFirst: "operations" },
  4: { focusFirst: "project_management" },
  5: { referralSources: ["linkedin", "friend_colleague"] },
}

// Wrapper component to provide stepper context
const StepFormWrapper = ({ 
  initialStep = 0, 
  children, 
  ...props 
}: { 
  initialStep?: number
  children: React.ReactNode
  [key: string]: any 
}) => {
  const [stepData, setStepData] = React.useState<Record<number, any>>({})
  
  return (
    <StepperProvider
      value={{
        steps: formSchema.steps.map((step, index) => ({
          label: step.label,
          icon: typeof step.stepIcon === 'string' ? undefined : step.stepIcon,
          description: typeof step.stepIcon === 'string' ? step.stepIcon : undefined,
        })),
        initialStep,
      }}
    >
      <StepForm
        steps={formSchema.steps}
        {...props}
        stepData={stepData}
        setStepData={setStepData}
        onFinalSubmit={(data) => {
          console.log("Final submit:", data)
          props.onFinalSubmit?.(data)
        }}
      />
    </StepperProvider>
  )
}

// Default story - Company Details step
export const CompanyDetailsStep: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Step form final submission:", data)
      alert("Company Details step completed!")
    },
  },
  render: (args) => (
    <StepFormWrapper initialStep={0} {...args} />
  ),
}

// About You step
export const AboutYouStep: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Step form final submission:", data)
      alert("About You step completed!")
    },
  },
  render: (args) => (
    <StepFormWrapper initialStep={1} {...args} />
  ),
}

// Team Size step
export const TeamSizeStep: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Step form final submission:", data)
      alert("Team Size step completed!")
    },
  },
  render: (args) => (
    <StepFormWrapper initialStep={2} {...args} />
  ),
}

// Management Preferences step
export const ManagementPreferencesStep: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Step form final submission:", data)
      alert("Management Preferences step completed!")
    },
  },
  render: (args) => (
    <StepFormWrapper initialStep={3} {...args} />
  ),
}

// Focus Area step
export const FocusAreaStep: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Step form final submission:", data)
      alert("Focus Area step completed!")
    },
  },
  render: (args) => (
    <StepFormWrapper initialStep={4} {...args} />
  ),
}

// How You Found Us step (final step)
export const HowYouFoundUsStep: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Final step submission:", data)
      alert("🎉 Onboarding completed! All steps finished.")
    },
  },
  render: (args) => (
    <StepFormWrapper initialStep={5} {...args} />
  ),
}

// Story with pre-filled data
export const WithPrefilledData: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Step form with prefilled data submission:", data)
      alert("Step completed with prefilled data!")
    },
  },
  render: (args) => {
    const [stepData, setStepData] = React.useState<Record<number, any>>(mockStepData)
    
    return (
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
          onFinalSubmit={(data) => {
            console.log("Final submit with prefilled data:", data)
            args.onFinalSubmit?.(data)
          }}
        />
      </StepperProvider>
    )
  },
}

// Story demonstrating complete flow
export const CompleteFlow: Story = {
  args: {
    onFinalSubmit: (data: Record<number, any>) => {
      console.log("Complete flow final submission:", data)
      
      // Show a summary of all collected data
      const summary = Object.entries(data).map(([stepIndex, stepData]) => {
        const stepName = formSchema.steps[parseInt(stepIndex)]?.label || `Step ${parseInt(stepIndex) + 1}`
        return `${stepName}: ${JSON.stringify(stepData, null, 2)}`
      }).join('\n\n')
      
      alert(`🎉 Complete Onboarding Data:\n\n${summary}`)
    },
  },
  render: (args) => {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [stepData, setStepData] = React.useState<Record<number, any>>({})
    
    React.useEffect(() => {
      console.log(`Current step: ${currentStep}`)
      console.log("Current step data:", stepData)
    }, [currentStep, stepData])
    
    return (
      <div>
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          background: "var(--blue-3)", 
          padding: "8px 16px", 
          fontSize: "14px",
          zIndex: 1000
        }}>
          <strong>Demo Mode:</strong> Step {currentStep + 1} of {formSchema.steps.length} - {formSchema.steps[currentStep]?.label}
        </div>
        <div style={{ paddingTop: "40px" }}>
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
              setStepData={(newStepData) => {
                console.log("Step data updated:", newStepData)
                setStepData(newStepData)
              }}
              onFinalSubmit={(data) => {
                console.log("Final submit in complete flow:", data)
                args.onFinalSubmit?.(data)
              }}
            />
          </StepperProvider>
        </div>
      </div>
    )
  },
}