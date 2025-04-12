/* eslint-disable react-refresh/only-export-components */
"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

import type { StepperProps } from "./stepper-types"
interface StepperContextValue extends StepperProps {
  clickable?: boolean
  isError?: boolean
  isLoading?: boolean
  isVertical?: boolean
  stepCount?: number
  expandVerticalSteps?: boolean
  activeStep: number
  initialStep: number
}

type StepperContextProviderProps = {
  value: Omit<StepperContextValue, "activeStep">
  children: React.ReactNode
}

const StepperContext = createContext<
  StepperContextValue & {
    nextStep: () => void
    prevStep: () => void
    resetSteps: () => void
    setStep: (step: number) => void
  }
>({
  steps: [],
  activeStep: 0,
  initialStep: 0,
  nextStep: () => {},
  prevStep: () => {},
  resetSteps: () => {},
  setStep: () => {},
})

const StepperProvider = ({ value, children }: StepperContextProviderProps) => {
  const isError = value.state === "error"
  const isLoading = value.state === "loading"

  const [activeStep, setActiveStep] = useState(value.initialStep)

  const nextStep = () => {
    setActiveStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  const resetSteps = () => {
    setActiveStep(value.initialStep)
  }

  const setStep = (step: number) => {
    setActiveStep(step)
  }

  return (
    <StepperContext.Provider
      value={{
        ...value,
        isError,
        isLoading,
        activeStep,
        nextStep,
        prevStep,
        resetSteps,
        setStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     🪝 USE STEPPER 🪝                       */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// TODO: Export this in @/registry/hooks
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

//
export function useStepper() {
  const context = useContext(StepperContext)

  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider")
  }

  const { ...rest } = context

  const isLastStep = context.activeStep === context.steps.length - 1
  const hasCompletedAllSteps = context.activeStep === context.steps.length

  const previousActiveStep = usePrevious(context.activeStep)

  const currentStep = context.steps[context.activeStep]
  const isOptionalStep = !!currentStep?.optional

  const isDisabledStep = context.activeStep === 0

  return {
    ...rest,
    isLastStep,
    hasCompletedAllSteps,
    isOptionalStep,
    isDisabledStep,
    currentStep,
    previousActiveStep,
  }
}

export { StepperProvider }
