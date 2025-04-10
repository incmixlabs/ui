/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

"use client"
import CheckIcon from "@/components/icons/check"
import Loader from "@/components/icons/loader"
import X from "@/components/icons/x"
import { Button } from "@/components/radixui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cva } from "@/lib/cva"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent } from "@/primitives/collapsible"
import React, { useMemo, type PropsWithChildren } from "react"
import { StepperProvider, useStepper } from "./stepper-context"
import type {
  FullStepProps,
  StepIconProps,
  StepLabelProps,
  StepProps,
  StepSharedProps,
  StepperProps,
} from "./stepper-types"

function Step(props: StepProps) {
  const {
    children,
    description,
    icon,
    state,
    checkIcon,
    errorIcon,
    index,
    isCompletedStep,
    isCurrentStep,
    isLastStep,
    isKeepError,
    label,
    onClickStep,
  } = props as FullStepProps

  const { isVertical, isError, isLoading, clickable } = useStepper()

  const hasVisited = isCurrentStep || isCompletedStep

  const sharedProps = {
    isLastStep,
    isCompletedStep,
    isCurrentStep,
    index,
    isError,
    isLoading,
    clickable,
    label,
    description,
    hasVisited,
    icon,
    isKeepError,
    checkIcon,
    state,
    errorIcon,
    onClickStep,
  }

  const renderStep = () => {
    switch (isVertical) {
      case true:
        return <VerticalStep {...sharedProps}>{children}</VerticalStep>
      default:
        return <HorizontalStep {...sharedProps} />
    }
  }

  return renderStep()
}
Step.displayName = "Step"

const labelVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const descriptionVariants = cva("", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const StepLabel = ({
  isCurrentStep,
  opacity,
  label,
  description,
}: StepLabelProps) => {
  const { variant, styles, size, orientation } = useStepper()
  const shouldRender = !!label || !!description

  return shouldRender ? (
    <div
      aria-current={isCurrentStep ? "step" : undefined}
      className={cn(
        "stepper__step-label-container",
        "flex flex-col",
        variant !== "line" ? "ms-2" : orientation === "horizontal" && "my-2",
        variant === "circle-alt" && "text-center",
        variant === "circle-alt" && orientation === "horizontal" && "ms-0",
        variant === "circle-alt" && orientation === "vertical" && "text-start",
        styles?.["step-label-container"]
      )}
      style={{
        opacity,
      }}
    >
      {!!label && (
        <span
          className={cn(
            "stepper__step-label",
            labelVariants({ size }),
            styles?.["step-label"]
          )}
        >
          {label}
        </span>
      )}
      {!!description && (
        <span
          className={cn(
            "stepper__step-description",
            "text-muted-foreground",
            descriptionVariants({ size }),
            styles?.["step-description"]
          )}
        >
          {description}
        </span>
      )}
    </div>
  ) : null
}
StepLabel.displayName = "StepLabel"

type VerticalStepProps = StepSharedProps & {
  children?: React.ReactNode
}

const verticalStepVariants = cva(
  [
    "relative flex flex-col transition-all duration-200",
    "data-[completed=true]:[&:not(:last-child)]:after:bg-primary",
    "data-[invalid=true]:[&:not(:last-child)]:after:bg-destructive",
  ],
  {
    variants: {
      variant: {
        circle: cn(
          "[&:not(:last-child)]:gap-[var(--step-gap)] [&:not(:last-child)]:pb-[var(--step-gap)]",
          "[&:not(:last-child)]:after:w-[2px] [&:not(:last-child)]:after:bg-border [&:not(:last-child)]:after:content-['']",
          "[&:not(:last-child)]:after:inset-x-[calc(var(--step-icon-size)/2)]",
          "[&:not(:last-child)]:after:absolute",
          "[&:not(:last-child)]:after:top-[calc(var(--step-icon-size)+var(--step-gap))]",
          "[&:not(:last-child)]:after:bottom-[var(--step-gap)]",
          "[&:not(:last-child)]:after:transition-all [&:not(:last-child)]:after:duration-200"
        ),
        line: "mb-4 flex-1 border-t-0",
      },
    },
  }
)

function VerticalStep(props: VerticalStepProps) {
  const {
    children,
    index,
    isCompletedStep,
    isCurrentStep,
    label,
    description,
    icon,
    hasVisited,
    state,
    checkIcon: checkIconProp,
    errorIcon: errorIconProp,
    onClickStep,
  } = props

  const {
    checkIcon: checkIconContext,
    errorIcon: errorIconContext,
    isError,
    isLoading,
    variant,
    onClickStep: onClickStepGeneral,
    clickable,
    expandVerticalSteps,
    styles,
    scrollTracking,
    orientation,
    steps,
    setStep,
    isLastStep: isLastStepCurrentStep,
    previousActiveStep,
  } = useStepper()

  const opacity = hasVisited ? 1 : 0.8
  const localIsLoading = isLoading || state === "loading"
  const localIsError = isError || state === "error"

  const isLastStep = index === steps.length - 1

  const active =
    variant === "line" ? isCompletedStep || isCurrentStep : isCompletedStep
  const checkIcon = checkIconProp || checkIconContext
  const errorIcon = errorIconProp || errorIconContext

  const renderChildren = () => {
    if (!expandVerticalSteps) {
      return (
        <Collapsible open={isCurrentStep}>
          <CollapsibleContent
            ref={(node) => {
              if (
                // If the step is the first step and the previous step
                // was the last step or if the step is not the first step
                // This prevents initial scrolling when the stepper
                // is located anywhere other than the top of the view.
                scrollTracking &&
                ((index === 0 &&
                  previousActiveStep &&
                  previousActiveStep === steps.length) ||
                  (index && index > 0))
              ) {
                node?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
            }}
            className="overflow-hidden data-[state=closed]:animate-collapsibleUp data-[state=open]:animate-collapsibleDown"
          >
            {children}
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return children
  }

  return (
    <div
      className={cn(
        "stepper__vertical-step",
        verticalStepVariants({
          variant: variant?.includes("circle") ? "circle" : "line",
        }),
        isLastStepCurrentStep && "gap-[var(--step-gap)]",
        styles?.["vertical-step"]
      )}
      data-optional={steps[index || 0]?.optional}
      data-completed={isCompletedStep}
      data-active={active}
      data-clickable={clickable || !!onClickStep}
      data-invalid={localIsError}
      onKeyUp={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          if (onClickStep) {
            onClickStep(index || 0, setStep)
          } else if (onClickStepGeneral) {
            onClickStepGeneral(index || 0, setStep)
          }
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          if (onClickStep) {
            onClickStep(index || 0, setStep)
          } else if (onClickStepGeneral) {
            onClickStepGeneral(index || 0, setStep)
          }
        }
      }}
      onClick={() => {
        if (onClickStep) {
          onClickStep(index || 0, setStep)
        } else if (onClickStepGeneral) {
          onClickStepGeneral(index || 0, setStep)
        }
      }}
    >
      <div
        data-vertical={true}
        data-active={active}
        className={cn(
          "stepper__vertical-step-container",
          "flex items-center",
          variant === "line" &&
            "border-s-[3px] py-2 ps-3 data-[active=true]:border-primary",
          styles?.["vertical-step-container"]
        )}
      >
        <StepButtonContainer
          {...{ isLoading: localIsLoading, isError: localIsError, ...props }}
        >
          <StepIcon
            {...{
              index,
              isError: localIsError,
              isLoading: localIsLoading,
              isCurrentStep,
              isCompletedStep,
            }}
            icon={icon}
            checkIcon={checkIcon}
            errorIcon={errorIcon}
          />
        </StepButtonContainer>
        <StepLabel
          label={label}
          description={description}
          {...{ isCurrentStep, opacity }}
        />
      </div>
      <div
        className={cn(
          "stepper__vertical-step-content",
          !isLastStep && "min-h-4",
          variant !== "line" && "ps-[var(--step-icon-size)]",
          variant === "line" && orientation === "vertical" && "min-h-0",
          styles?.["vertical-step-content"]
        )}
      >
        {renderChildren()}
      </div>
    </div>
  )
}
VerticalStep.displayName = "VerticalStep"

function HorizontalStep(props: StepSharedProps) {
  const {
    isError,
    isLoading,
    onClickStep,
    variant,
    clickable,
    checkIcon: checkIconContext,
    errorIcon: errorIconContext,
    styles,
    steps,
    setStep,
  } = useStepper()

  const {
    index,
    isCompletedStep,
    isCurrentStep,
    hasVisited,
    icon,
    label,
    description,
    isKeepError,
    state,
    checkIcon: checkIconProp,
    errorIcon: errorIconProp,
  } = props

  const localIsLoading = isLoading || state === "loading"
  const localIsError = isError || state === "error"

  const opacity = hasVisited ? 1 : 0.8

  const active =
    variant === "line" ? isCompletedStep || isCurrentStep : isCompletedStep

  const checkIcon = checkIconProp || checkIconContext
  const errorIcon = errorIconProp || errorIconContext

  return (
    <div
      aria-disabled={!hasVisited}
      className={cn(
        "stepper__horizontal-step",
        "relative flex items-center transition-all duration-200",
        "[&:not(:last-child)]:flex-1",
        "[&:not(:last-child)]:after:transition-all [&:not(:last-child)]:after:duration-200",
        "[&:not(:last-child)]:after:h-[2px] [&:not(:last-child)]:after:bg-border [&:not(:last-child)]:after:content-['']",
        "data-[completed=true]:[&:not(:last-child)]:after:bg-primary",
        "data-[invalid=true]:[&:not(:last-child)]:after:bg-destructive",
        variant === "circle-alt" &&
          "flex-1 flex-col justify-start [&:not(:last-child)]:after:relative [&:not(:last-child)]:after:start-[50%] [&:not(:last-child)]:after:end-[50%] [&:not(:last-child)]:after:top-[calc(var(--step-icon-size)/2)] [&:not(:last-child)]:after:order-[-1] [&:not(:last-child)]:after:w-[calc((100%-var(--step-icon-size))-(var(--step-gap)))]",
        variant === "circle" &&
          "[&:not(:last-child)]:after:ms-[var(--step-gap)] [&:not(:last-child)]:after:me-[var(--step-gap)] [&:not(:last-child)]:after:flex-1",
        variant === "line" &&
          "flex-1 flex-col border-t-[3px] data-[active=true]:border-primary",
        styles?.["horizontal-step"]
      )}
      onKeyUp={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          if (onClickStep) {
            onClickStep(index || 0, setStep)
          }
        }
      }}
      data-optional={steps[index || 0]?.optional}
      data-completed={isCompletedStep}
      data-active={active}
      data-invalid={localIsError}
      data-clickable={clickable}
      onClick={() => {
        if (onClickStep) {
          onClickStep(index || 0, setStep)
        }
      }}
    >
      <div
        className={cn(
          "stepper__horizontal-step-container",
          "flex items-center",
          variant === "circle-alt" && "flex-col justify-center gap-1",
          variant === "line" && "w-full",
          styles?.["horizontal-step-container"]
        )}
      >
        <StepButtonContainer
          {...{ ...props, isError: localIsError, isLoading: localIsLoading }}
        >
          <StepIcon
            {...{
              index,
              isCompletedStep,
              isCurrentStep,
              isError: localIsError,
              isKeepError,
              isLoading: localIsLoading,
            }}
            icon={icon}
            checkIcon={checkIcon}
            errorIcon={errorIcon}
          />
        </StepButtonContainer>
        <StepLabel
          label={label}
          description={description}
          {...{ isCurrentStep, opacity }}
        />
      </div>
    </div>
  )
}
HorizontalStep.displayName = "HorizontalStep"

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// Removed complex renderIcon function

function StepIcon(props: StepIconProps) {
  const { size } = useStepper()
  const iconClassName = cn(iconVariants({ size }))

  const {
    isCompletedStep,
    isCurrentStep,
    isError,
    isLoading,
    isKeepError,
    index,
  } = props

  return useMemo(() => {
    if (isCompletedStep) {
      if (isError && isKeepError) {
        return (
          <div key="icon">
            <X className={iconClassName} />
          </div>
        )
      }
      return (
        <div key="check-icon">
          <CheckIcon className={iconClassName} />
        </div>
      )
    }

    if (isCurrentStep) {
      if (isError) {
        return (
          <div key="error-icon">
            <X className={iconClassName} />
          </div>
        )
      }
      if (isLoading) {
        return <Loader className={cn(iconClassName, "animate-spin")} />
      }
    }

    // For number display as fallback
    return (
      <span key="label" className={cn("text-center font-medium text-md")}>
        {(index || 0) + 1}
      </span>
    )
  }, [
    isCompletedStep,
    isCurrentStep,
    isError,
    isLoading,
    index,
    isKeepError,
    iconClassName,
  ])
}
StepIcon.displayName = "StepIcon"

type StepButtonContainerProps = StepSharedProps & {
  children?: React.ReactNode
}

const StepButtonContainer = ({
  isCurrentStep,
  isCompletedStep,
  children,
  isError,
  isLoading: isLoadingProp,
  onClickStep,
}: StepButtonContainerProps) => {
  const {
    clickable,
    isLoading: isLoadingContext,
    variant,
    styles,
  } = useStepper()

  const currentStepClickable = clickable || !!onClickStep

  const isLoading = isLoadingProp || isLoadingContext

  if (variant === "line") {
    return null
  }

  return (
    <Button
      variant="ghost"
      tabIndex={currentStepClickable ? 0 : -1}
      className={cn(
        "stepper__step-button-container",
        "pointer-events-none rounded-full p-0",
        "h-[var(--step-icon-size)] w-[var(--step-icon-size)]",
        "flex items-center justify-center rounded-full border-2",
        "data-[clickable=true]:pointer-events-auto",
        "data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
        "data-[current=true]:border-primary data-[current=true]:bg-secondary",
        "data-[invalid=true]:border-destructive data-[invalid=true]:bg-destructive data-[invalid=true]:text-destructive-foreground",
        styles?.["step-button-container"]
      )}
      aria-current={isCurrentStep ? "step" : undefined}
      data-current={isCurrentStep}
      data-invalid={isError && (isCurrentStep || isCompletedStep)}
      data-active={isCompletedStep}
      data-clickable={currentStepClickable}
      data-loading={isLoading && (isCurrentStep || isCompletedStep)}
    >
      {children}
    </Button>
  )
}

const VARIABLE_SIZES = {
  sm: "36px",
  md: "40px",
  lg: "44px",
}

function Stepper(props: StepperProps) {
  const {
    className,
    children,
    orientation: orientationProp,
    state,
    responsive,
    checkIcon,
    errorIcon,
    onClickStep,
    mobileBreakpoint,
    expandVerticalSteps = false,
    initialStep = 0,
    size,
    steps,
    variant,
    styles,
    variables,
    scrollTracking = false,
    ...rest
  } = props

  const childArr = React.Children.toArray(children)

  const items = [] as React.ReactElement[]

  const footer = childArr.map((child) => {
    if (!React.isValidElement(child)) {
      throw new Error("Stepper children must be valid React elements.")
    }
    if (child.type === Step) {
      items.push(child)
      return null
    }

    return child
  })

  const stepCount = items.length

  // Using the imported useMediaQuery
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint || "768px"})`)

  const clickable = !!onClickStep

  const orientation = isMobile && responsive ? "vertical" : orientationProp
  const isVertical = orientation === "vertical"

  return (
    <StepperProvider
      value={{
        initialStep,
        orientation,
        state,
        size,
        responsive,
        checkIcon,
        errorIcon,
        onClickStep,
        clickable,
        stepCount,
        isVertical,
        variant: variant || "circle",
        expandVerticalSteps,
        steps,
        scrollTracking,
        styles,
      }}
    >
      <div
        className={cn(
          "stepper__main-container",
          "flex w-full flex-wrap",
          stepCount === 1 ? "justify-end" : "justify-between",
          orientation === "vertical" ? "flex-col" : "flex-row",
          variant === "line" && orientation === "horizontal" && "gap-4",
          className,
          styles?.["main-container"]
        )}
        style={
          {
            "--step-icon-size":
              variables?.["--step-icon-size"] ||
              `${VARIABLE_SIZES[size || "md"]}`,
            "--step-gap": variables?.["--step-gap"] || "8px",
          } as React.CSSProperties
        }
        {...rest}
      >
        <VerticalContent>{items}</VerticalContent>
      </div>
      {orientation === "horizontal" && (
        <HorizontalContent>{items}</HorizontalContent>
      )}
      {footer}
    </StepperProvider>
  )
}
Stepper.displayName = "Stepper"

Stepper.defaultProps = {
  size: "md",
  orientation: "horizontal",
  responsive: true,
}

const VerticalContent = ({ children }: PropsWithChildren) => {
  const { activeStep } = useStepper()

  const childArr = React.Children.toArray(children)
  const stepCount = childArr.length

  return (
    <>
      {React.Children.map(children, (child, i) => {
        const isCompletedStep =
          (React.isValidElement(child) &&
            (child.props as any).isCompletedStep) ??
          i < activeStep
        const isLastStep = i === stepCount - 1
        const isCurrentStep = i === activeStep

        const stepProps = {
          index: i,
          isCompletedStep,
          isCurrentStep,
          isLastStep,
        }

        if (React.isValidElement(child)) {
          return React.cloneElement(child, stepProps)
        }
        return null
      })}
    </>
  )
}

const HorizontalContent = ({ children }: PropsWithChildren) => {
  const { activeStep } = useStepper()
  const childArr = React.Children.toArray(children)

  if (activeStep > childArr.length) {
    return null
  }

  return (
    <>
      {React.Children.map(childArr[activeStep], (node) => {
        if (!React.isValidElement(node)) {
          return null
        }
        // @ts-expect-error
        return React.Children.map(node.props.children, (childNode) => childNode)
      })}
    </>
  )
}

//
export {
  HorizontalStep,
  Step,
  StepButtonContainer,
  StepIcon,
  StepLabel,
  Stepper,
  VerticalStep,
  useStepper,
}
