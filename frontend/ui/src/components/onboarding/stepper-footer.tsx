import { Button } from "@incmix/ui/button"
import { Card, Flex, Text } from "@incmix/ui"
import * as Collapsible from "@radix-ui/react-collapsible"
import { cn } from "@incmix/ui/utils"
import { useStepper } from "@incmix/ui/stepper"

interface StepperFooterProps {
  onlyLastStep?: boolean
  orientation?: "horizontal" | "vertical"
  formSubmit?: () => Promise<boolean>
  onStepChange?: (step: number) => void
}

export function StepperFooter({
  onlyLastStep = false,
  orientation = "horizontal",
  formSubmit,
  onStepChange,
}: StepperFooterProps) {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    isError,
    isLoading,
    currentStep,
  } = useStepper() as { currentStep: number } & ReturnType<typeof useStepper>

  const handleNext = async () => {
    if (!formSubmit || await formSubmit()) {
      nextStep()
      onStepChange?.(currentStep + 1)
    }
  }

  const handlePrev = () => {
    prevStep()
    onStepChange?.(currentStep - 1)
  }

  const handleReset = () => {
    resetSteps()
    onStepChange?.(0)
  }

  const FinalCard = () => (
    <Card className="my-2 h-40">
      <Flex className="h-full" justify="center" align="center">
        <Text className="text-xl">Woohoo! All steps completed! 🎉</Text>
      </Flex>
    </Card>
  )

  return (
    <>
      {orientation === "horizontal" ? (
        hasCompletedAllSteps && <FinalCard />
      ) : (
        <Collapsible.Root open={hasCompletedAllSteps}>
          <Collapsible.Content
            className={cn(
              "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
            )}
          >
            <FinalCard />
          </Collapsible.Content>
        </Collapsible.Root>
      )}
      {(!onlyLastStep || hasCompletedAllSteps) && (
        <div className="flex w-full justify-end gap-2">
          {hasCompletedAllSteps ? (
            <Button size="1" onClick={handleReset}>
              Reset
            </Button>
          ) : (
            <>
              <Button
                disabled={isDisabledStep}
                onClick={handlePrev}
                size="1"
                variant="soft"
              >
                Prev
              </Button>
              <Button
                size="1"
                variant="soft"
                onClick={handleNext}
                disabled={isError || isLoading}
              >
                {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
              </Button>
            </>
          )}
        </div>
      )}
    </>
  )
}
