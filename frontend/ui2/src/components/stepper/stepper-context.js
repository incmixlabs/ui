/* eslint-disable react-refresh/only-export-components */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState } from "react";
const StepperContext = createContext({
    steps: [],
    activeStep: 0,
    initialStep: 0,
    nextStep: () => { },
    prevStep: () => { },
    resetSteps: () => { },
    setStep: () => { },
});
const StepperProvider = ({ value, children }) => {
    const isError = value.state === "error";
    const isLoading = value.state === "loading";
    const [activeStep, setActiveStep] = useState(value.initialStep);
    const nextStep = () => {
        setActiveStep((prev) => prev + 1);
    };
    const prevStep = () => {
        setActiveStep((prev) => prev - 1);
    };
    const resetSteps = () => {
        setActiveStep(value.initialStep);
    };
    const setStep = (step) => {
        setActiveStep(step);
    };
    return (_jsx(StepperContext.Provider, { value: {
            ...value,
            isError,
            isLoading,
            activeStep,
            nextStep,
            prevStep,
            resetSteps,
            setStep,
        }, children: children }));
};
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     🪝 USE STEPPER 🪝                       */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
// TODO: Export this in @/registry/hooks
function usePrevious(value) {
    const ref = useRef(undefined);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
//
export function useStepper() {
    const context = useContext(StepperContext);
    if (context === undefined) {
        throw new Error("useStepper must be used within a StepperProvider");
    }
    const { ...rest } = context;
    const isLastStep = context.activeStep === context.steps.length - 1;
    const hasCompletedAllSteps = context.activeStep === context.steps.length;
    const previousActiveStep = usePrevious(context.activeStep);
    const currentStep = context.steps[context.activeStep];
    const isOptionalStep = !!currentStep?.optional;
    const isDisabledStep = context.activeStep === 0;
    return {
        ...rest,
        isLastStep,
        hasCompletedAllSteps,
        isOptionalStep,
        isDisabledStep,
        currentStep,
        previousActiveStep,
    };
}
export { StepperProvider };
//# sourceMappingURL=stepper-context.js.map