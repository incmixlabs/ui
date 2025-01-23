"use client"
import { Box, Flex } from "@radix-ui/themes"
import * as React from "react"
import { type PropsWithChildren, useMemo } from "react"

import { CheckIcon, LoaderCircleIcon as Loader, XIcon as X } from "@incmix/ui/icons"
import { useMediaQuery } from "../../hooks/use-media-query"
import * as Collapsible from "@radix-ui/react-collapsible"
import { cn } from "@incmix/ui/utils/cn"
import { cva } from "@incmix/ui/utils/cva"
import { StepperProvider, useStepper } from "./stepper-context"
import type {
  FullStepProps,
  StepIconProps,
  StepLabelProps,
  StepProps,
  StepSharedProps,
  StepperProps,
} from "./stepper-types"

const Step = React.forwardRef<HTMLLIElement, StepProps>(
  (props, ref: React.Ref<any>) => {
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
          return (
            <VerticalStep ref={ref} {...sharedProps}>
              {children}
            </VerticalStep>
          )
        default:
          return <HorizontalStep ref={ref} {...sharedProps} />
      }
    }

    return renderStep()
  }
)
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
    "data-[completed=true]:[&:not(:last-child)]:after:bg-gray-12",
    "data-[invalid=true]:[&:not(:last-child)]:after:bg-red-9",
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

const VerticalStep = React.forwardRef<HTMLDivElement, VerticalStepProps>(
  (props, ref) => {
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
          <Collapsible.Root open={isCurrentStep}>
            <Collapsible.Content
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
              className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
            >
              {children}
            </Collapsible.Content>
          </Collapsible.Root>
        )
      }
      return children
    }

    return (
      <div
        ref={ref}
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
            onClickStep?.(index || 0, setStep) ||
              onClickStepGeneral?.(index || 0, setStep)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            onClickStep?.(index || 0, setStep) ||
              onClickStepGeneral?.(index || 0, setStep)
          }
        }}
        onClick={() =>
          onClickStep?.(index || 0, setStep) ||
          onClickStepGeneral?.(index || 0, setStep)
        }
      >
        <div
          data-vertical={true}
          data-active={active}
          className={cn(
            "stepper__vertical-step-container",
            (clickable || !!onClickStep || !!onClickStepGeneral) &&
              "cursor-pointer",
            "flex items-center",
            variant === "line" &&
              "border-s-[3px] py-2 ps-3 data-[active=true]:border-gray-12",
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
            variant !== "line" && "ps-[--step-icon-size]",
            variant === "line" && orientation === "vertical" && "min-h-0",
            styles?.["vertical-step-content"]
          )}
        >
          {renderChildren()}
        </div>
      </div>
    )
  }
)
VerticalStep.displayName = "VerticalStep"

const HorizontalStep = React.forwardRef<HTMLDivElement, StepSharedProps>(
  (props, ref) => {
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
          (clickable || !!onClickStep) && "cursor-pointer",
          "relative flex items-center transition-all duration-200",
          "[&:not(:last-child)]:flex-1",
          "[&:not(:last-child)]:after:transition-all [&:not(:last-child)]:after:duration-200",
          "[&:not(:last-child)]:after:h-[2px] [&:not(:last-child)]:after:bg-border [&:not(:last-child)]:after:content-['']",
          "data-[completed=true]:[&:not(:last-child)]:after:bg-gray-12",
          "data-[invalid=true]:[&:not(:last-child)]:after:bg-red-9",
          variant === "circle-alt" &&
            "flex-1 flex-col justify-start [&:not(:last-child)]:after:relative [&:not(:last-child)]:after:start-[50%] [&:not(:last-child)]:after:end-[50%] [&:not(:last-child)]:after:top-[calc(var(--step-icon-size)/2)] [&:not(:last-child)]:after:order-[-1] [&:not(:last-child)]:after:w-[calc((100%-var(--step-icon-size))-(var(--step-gap)))]",
          variant === "circle" &&
            "[&:not(:last-child)]:after:ms-[var(--step-gap)] [&:not(:last-child)]:after:me-[var(--step-gap)] [&:not(:last-child)]:after:flex-1",
          variant === "line" &&
            "flex-1 flex-col border-gray-4 border-t-[3px] data-[active=true]:border-gray-12",
          styles?.["horizontal-step"]
        )}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            onClickStep?.(index || 0, setStep)
          }
        }}
        data-optional={steps[index || 0]?.optional}
        data-completed={isCompletedStep}
        data-active={active}
        data-invalid={localIsError}
        data-clickable={clickable}
        onClick={() => onClickStep?.(index || 0, setStep)}
        ref={ref}
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
)
HorizontalStep.displayName = "HorizontalStep"

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>(
  (props, ref) => {
    const { size } = useStepper()

    const {
      isCompletedStep,
      isCurrentStep,
      isError,
      isLoading,
      isKeepError,
      icon: CustomIcon,
      index,
      checkIcon: CustomCheckIcon,
      errorIcon: CustomErrorIcon,
    } = props

    const Icon = useMemo(() => (CustomIcon ? CustomIcon : null), [CustomIcon])

    const ErrorIcon = useMemo(
      () => (CustomErrorIcon ? CustomErrorIcon : null),
      [CustomErrorIcon]
    )

    const Check = useMemo(
      () => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
      [CustomCheckIcon]
    )

    return useMemo(() => {
      const IconContainer = React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
      >((props, ref) => (
        <Flex
          ref={ref}
          className={cn(iconVariants({ size }), props.className)}
          align="center"
          justify="center"
          {...props}
        />
      ))

      if (isCompletedStep) {
        if (isError && isKeepError) {
          return (
            <IconContainer key="icon">
              <X className={cn(iconVariants({ size }))} />
            </IconContainer>
          )
        }
        return (
          <IconContainer
            key="check-icon"
            className={cn(iconVariants({ size }))}
          >
            <Check name="Check" />
          </IconContainer>
        )
      }
      if (isCurrentStep) {
        if (isError && ErrorIcon) {
          return (
            <IconContainer
              key="error-icon"
              className={cn(iconVariants({ size }))}
            >
              <ErrorIcon name="X" />
            </IconContainer>
          )
        }
        if (isError) {
          return (
            <IconContainer key="icon">
              <X className={cn(iconVariants({ size }))} />
            </IconContainer>
          )
        }
        if (isLoading) {
          return (
            <Loader className={cn(iconVariants({ size }), "animate-spin")} />
          )
        }
      }
      if (Icon) {
        return (
          <IconContainer key="step-icon" className={cn(iconVariants({ size }))}>
            <Icon name="Check" />
          </IconContainer>
        )
      }
      return (
        <span
          ref={ref}
          key="label"
          className={cn("text-center font-medium text-md")}
        >
          {(index || 0) + 1}
        </span>
      )
    }, [
      isCompletedStep,
      isCurrentStep,
      isError,
      isLoading,
      Icon,
      index,
      Check,
      ErrorIcon,
      isKeepError,
      ref,
      size,
    ])
  }
)
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
    <Box
      tabIndex={currentStepClickable ? 0 : -1}
      className={cn(
        "m-0 transition-all duration-200",
        "border-gray-4 bg-gray-1 text-gray-12",
        "stepper__step-button-container",
        "pointer-events-none rounded-full p-0",
        "h-[var(--step-icon-size)] w-[var(--step-icon-size)]",
        "flex items-center justify-center rounded-full border-2",
        "data-[clickable=true]:pointer-events-auto",
        "data-[active=true]:border-gray-12 data-[active=true]:bg-gray-12 data-[active=true]:text-gray-1",
        "data-[current=true]:border-gray-12 data-[current=true]:bg-gray-1",
        "data-[invalid=true]:border-red-9 data-[invalid=true]:bg-red-9 data-[invalid=true]:text-gray-1",
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
    </Box>
  )
}

const VARIABLE_SIZES = {
  sm: "36px",
  md: "40px",
  lg: "44px",
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      size = "md",
      orientation = "horizontal",
      responsive = true,
      initialStep = 0,
      ...props
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      className,
      children,
      state,
      checkIcon,
      errorIcon,
      onClickStep,
      mobileBreakpoint,
      expandVerticalSteps = false,
      steps,
      variant,
      styles,
      variables,
      scrollTracking = false,
      ...rest
    } = props

    const childArr = React.Children.toArray(children)

    const items = [] as React.ReactElement[]

    const footer = childArr.map((child, _index) => {
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

    const isMobile = useMediaQuery(
      `(max-width: ${mobileBreakpoint || "768px"})`
    )

    const clickable = !!onClickStep

    const orientationValue = isMobile && responsive ? "vertical" : orientation
    const isVertical = orientationValue === "vertical"

    return (
      <StepperProvider
        value={{
          initialStep,
          orientation: orientationValue,
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
          ref={ref}
          className={cn(
            "stepper__main-container",
            "flex w-full flex-wrap",
            stepCount === 1 ? "justify-end" : "justify-between",
            orientationValue === "vertical" ? "flex-col" : "flex-row",
            variant === "line" && orientationValue === "horizontal" && "gap-4",
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
)
Stepper.displayName = "Stepper"

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
        return React.Children.map(node.props.children, (childNode) => childNode)
      })}
    </>
  )
}

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
