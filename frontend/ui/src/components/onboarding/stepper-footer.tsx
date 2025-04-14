import { Button } from "@components/button"
import { useStepper } from "../stepper"

export function StepperFooter() {
  const { prevStep, resetSteps, hasCompletedAllSteps, activeStep, isLastStep } =
    useStepper()

  return (
    <div className="mt-6 flex w-full justify-between gap-2">
      {hasCompletedAllSteps ? (
        <Button
          size="1"
          onClick={resetSteps}
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Reset
        </Button>
      ) : (
        <>
          {activeStep > 0 ? (
            <Button
              onClick={prevStep}
              size="1"
              variant="soft"
              className="w-1/3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain space
          )}

          <Button
            type="submit"
            size="1"
            className={`${activeStep > 0 ? 'w-2/3' : 'w-full'} rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600`}
          >
            {activeStep === 0 ? "Continue" : isLastStep ? "Finish" : "Continue"}
          </Button>
        </>
      )}
    </div>
  )
}