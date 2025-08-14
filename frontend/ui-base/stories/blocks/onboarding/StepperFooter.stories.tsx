import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme } from "../../../src/1base"
import { StepperFooter } from "../../../src/3blocks/onboarding/stepper-footer"
import { StepperProvider } from "../../../src/3blocks/stepper"

const meta: Meta<typeof StepperFooter> = {
  title: "3 Blocks/Onboarding/StepperFooter",
  component: StepperFooter,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px", padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock stepper steps
const mockSteps = [
  { label: "Step 1", description: "First step" },
  { label: "Step 2", description: "Second step" },
  { label: "Step 3", description: "Third step" },
  { label: "Step 4", description: "Fourth step" },
]

// Wrapper component to provide different stepper states
const StepperFooterWrapper = ({ 
  initialStep = 0, 
  steps = mockSteps,
  hasCompleted = false 
}: { 
  initialStep?: number
  steps?: any[]
  hasCompleted?: boolean
}) => {
  return (
    <StepperProvider
      value={{
        steps,
        initialStep,
      }}
    >
      <div style={{ 
        background: "var(--gray-1)", 
        borderRadius: "8px", 
        padding: "20px",
        border: "1px solid var(--gray-6)"
      }}>
        <div style={{ 
          marginBottom: "20px", 
          padding: "16px", 
          background: "white", 
          borderRadius: "4px",
          textAlign: "center"
        }}>
          <h3>Sample Form Content</h3>
          <p>This represents the form content above the footer.</p>
          {hasCompleted && (
            <div style={{ 
              padding: "12px", 
              background: "var(--green-2)", 
              borderRadius: "4px",
              marginTop: "12px"
            }}>
              ✅ All steps completed!
            </div>
          )}
        </div>
        <StepperFooter />
      </div>
    </StepperProvider>
  )
}

// First step - only Continue button, no Back button
export const FirstStep: Story = {
  render: () => (
    <StepperFooterWrapper initialStep={0} />
  ),
}

// Middle step - both Back and Continue buttons
export const MiddleStep: Story = {
  render: () => (
    <StepperFooterWrapper initialStep={1} />
  ),
}

// Last step - Back and Finish buttons
export const LastStep: Story = {
  render: () => (
    <StepperFooterWrapper initialStep={3} />
  ),
}

// Completed state - Reset button
export const CompletedState: Story = {
  render: () => (
    <StepperFooterWrapper initialStep={4} hasCompleted={true} />
  ),
}

// Interactive demo showing all states
export const InteractiveDemo: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [isCompleted, setIsCompleted] = React.useState(false)
    const totalSteps = 4

    const handleNext = () => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsCompleted(true)
      }
    }

    const handlePrev = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1)
      }
    }

    const handleReset = () => {
      setCurrentStep(0)
      setIsCompleted(false)
    }

    return (
      <div>
        <div style={{ 
          marginBottom: "20px", 
          padding: "12px", 
          background: "var(--blue-2)", 
          borderRadius: "4px" 
        }}>
          <strong>Interactive Demo:</strong> Click the buttons to navigate through different states
        </div>
        
        <StepperProvider
          value={{
            steps: mockSteps,
            initialStep: currentStep,
          }}
        >
          <div style={{ 
            background: "var(--gray-1)", 
            borderRadius: "8px", 
            padding: "20px",
            border: "1px solid var(--gray-6)"
          }}>
            <div style={{ 
              marginBottom: "20px", 
              padding: "16px", 
              background: "white", 
              borderRadius: "4px",
              textAlign: "center"
            }}>
              <h3>Step {currentStep + 1} of {totalSteps}</h3>
              <p>{mockSteps[currentStep]?.description || "All steps completed!"}</p>
              
              {isCompleted && (
                <div style={{ 
                  padding: "12px", 
                  background: "var(--green-2)", 
                  borderRadius: "4px",
                  marginTop: "12px"
                }}>
                  🎉 Onboarding completed!
                </div>
              )}
              
              <div style={{ 
                display: "flex", 
                gap: "8px", 
                justifyContent: "center",
                marginTop: "12px" 
              }}>
                {mockSteps.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: index <= currentStep ? "var(--blue-9)" : "var(--gray-6)",
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Custom buttons to simulate stepper behavior */}
            <div style={{ display: "none" }}>
              <button onClick={handlePrev}>Prev</button>
              <button onClick={handleNext}>Next</button>
              <button onClick={handleReset}>Reset</button>
            </div>
            
            <StepperFooter />
          </div>
        </StepperProvider>
        
        <div style={{ 
          marginTop: "20px", 
          padding: "12px", 
          background: "var(--gray-2)", 
          borderRadius: "4px",
          fontSize: "14px"
        }}>
          <strong>Current State:</strong> 
          {isCompleted ? " Completed (shows Reset button)" : 
           currentStep === 0 ? " First Step (Continue only)" :
           currentStep === totalSteps - 1 ? " Last Step (Back + Finish)" :
           " Middle Step (Back + Continue)"}
        </div>
      </div>
    )
  },
}

// Different button text scenarios
export const ButtonTextVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h4 style={{ marginBottom: "10px" }}>First Step (Continue button):</h4>
        <StepperFooterWrapper initialStep={0} />
      </div>
      
      <div>
        <h4 style={{ marginBottom: "10px" }}>Middle Step (Continue button):</h4>
        <StepperFooterWrapper initialStep={1} />
      </div>
      
      <div>
        <h4 style={{ marginBottom: "10px" }}>Last Step (Finish button):</h4>
        <StepperFooterWrapper initialStep={3} />
      </div>
      
      <div>
        <h4 style={{ marginBottom: "10px" }}>Completed (Reset button):</h4>
        <StepperFooterWrapper initialStep={4} hasCompleted={true} />
      </div>
    </div>
  ),
}

// Dark mode demonstration
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <Theme>
        <div className="dark" style={{ 
          width: "400px", 
          padding: "20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "8px"
        }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <StepperFooterWrapper initialStep={0} />
      <StepperFooterWrapper initialStep={1} />
      <StepperFooterWrapper initialStep={3} />
    </div>
  ),
}