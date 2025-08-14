import { Button } from "@/base"
import { useStepper } from "../stepper"

export function StepperFooter() {
  const { prevStep, resetSteps, hasCompletedAllSteps, activeStep, isLastStep } =
    useStepper()

  return (
    <div className="mt-8 flex w-full justify-between gap-2">
      {hasCompletedAllSteps ? (
        <Button
          onClick={resetSteps}
          className="h-[42px] w-full rounded-md bg-blue-500 py-2 font-medium text-base text-white hover:bg-blue-600"
        >
          Reset
        </Button>
      ) : (
        <>
          {activeStep > 0 ? (
            <Button
              onClick={prevStep}
              variant="outline"
              className="h-[42px] w-1/3 rounded-md border border-gray-300 bg-white py-2 font-medium text-base text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Back
            </Button>
          ) : (
            <div/> // Empty div to maintain space
          )}

          <Button
            type="submit"
            className={`${activeStep > 0 ? 'w-2/3' : 'w-full'} h-[42px] rounded-md py-2 `}
          >
            {activeStep === 0 ? "Continue" : isLastStep ? "Finish" : "Continue"}
          </Button>
        </>
      )}``
    </div>
  )
}
