import type { TextField } from "@/src/1base"
import type { LucideIconCompType } from "@/src/1base/radix-ui/icons"
import type { z } from "zod"

export interface FullStepProps extends StepProps, StepInternalConfig {}

type IconType = LucideIconCompType | React.ComponentType<any> | undefined

export type Field = {
  name: string
  label: string
  type?: TextField.RootProps["type"] | "textarea"
  initialValue?: string
  validation?: z.ZodSchema<string>
}

export type StepItem = {
  id?: string
  label?: string
  description?: string
  icon?: IconType
  optional?: boolean
  fields?: Field[]
}

export type StepIconProps = {
  isCompletedStep?: boolean
  isCurrentStep?: boolean
  isError?: boolean
  isLoading?: boolean
  isKeepError?: boolean
  icon?: IconType
  index?: number
  checkIcon?: IconType
  errorIcon?: IconType
}

export type StepperProps = StepOptions & {
  children?: React.ReactNode
  className?: string
  initialStep?: number
  steps: StepItem[]
}

export type StepProps = React.HTMLAttributes<HTMLLIElement> & {
  label?: string | React.ReactNode
  description?: string
  icon?: IconType
  state?: "loading" | "error"
  checkIcon?: IconType
  errorIcon?: IconType
  isCompletedStep?: boolean
  isKeepError?: boolean
  onClickStep?: (step: number, setStep: (step: number) => void) => void
}

export type StepSharedProps = StepProps & {
  isLastStep?: boolean
  isCurrentStep?: boolean
  index?: number
  hasVisited: boolean | undefined
  isError?: boolean
  isLoading?: boolean
}

export type StepLabelProps = {
  isCurrentStep?: boolean
  opacity: number
  label?: string | React.ReactNode
  description?: string | null
}

//
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                      ✨ INTERNAL ✨                         */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Props which shouldn't be passed to to the Step component from the user
type StepInternalConfig = {
  index: number
  isCompletedStep?: boolean
  isCurrentStep?: boolean
  isLastStep?: boolean
}

export type StepOptions = {
  orientation?: "vertical" | "horizontal"
  state?: "loading" | "error"
  responsive?: boolean
  checkIcon?: IconType
  errorIcon?: IconType
  onClickStep?: (step: number, setStep: (step: number) => void) => void
  mobileBreakpoint?: string
  variant?: "circle" | "circle-alt" | "line"
  expandVerticalSteps?: boolean
  size?: "sm" | "md" | "lg"
  styles?: {
    "main-container"?: string
    "horizontal-step"?: string
    "horizontal-step-container"?: string
    "vertical-step"?: string
    "vertical-step-container"?: string
    "vertical-step-content"?: string
    "step-button-container"?: string
    "step-label-container"?: string
    "step-label"?: string
    "step-description"?: string
  }
  variables?: {
    "--step-icon-size"?: string
    "--step-gap"?: string
  }
  scrollTracking?: boolean
}
