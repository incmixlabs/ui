import { Button } from "@components/button"
import { useStepper } from "../stepper"

export function StepperFooter() {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
  } = useStepper()

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-2 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="1" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="1"
              variant="soft"
            >
              Prev
            </Button>
            <Button type="submit" size="1">
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
