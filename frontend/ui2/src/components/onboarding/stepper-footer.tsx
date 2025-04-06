import { Button } from "@/components/radixui/button"
import { useStepper } from "../stepper"

export function StepperFooter() {
  const { prevStep, resetSteps, hasCompletedAllSteps, activeStep, isLastStep } =
    useStepper()

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="1" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            onClick={prevStep}
            size="1"
            variant="soft"
            disabled={activeStep === 0}
          >
            Prev
          </Button>
          <Button type="submit" size="1">
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  )
}
