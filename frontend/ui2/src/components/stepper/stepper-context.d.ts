import type { StepperProps } from "./stepper-types";
interface StepperContextValue extends StepperProps {
    clickable?: boolean;
    isError?: boolean;
    isLoading?: boolean;
    isVertical?: boolean;
    stepCount?: number;
    expandVerticalSteps?: boolean;
    activeStep: number;
    initialStep: number;
}
type StepperContextProviderProps = {
    value: Omit<StepperContextValue, "activeStep">;
    children: React.ReactNode;
};
declare const StepperProvider: ({ value, children }: StepperContextProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare function useStepper(): {
    isLastStep: boolean;
    hasCompletedAllSteps: boolean;
    isOptionalStep: boolean;
    isDisabledStep: boolean;
    currentStep: import("./stepper-types").StepItem;
    previousActiveStep: number | undefined;
    clickable?: boolean;
    isError?: boolean;
    isLoading?: boolean;
    isVertical?: boolean;
    stepCount?: number;
    expandVerticalSteps?: boolean;
    activeStep: number;
    initialStep: number;
    orientation?: "vertical" | "horizontal";
    state?: "loading" | "error";
    responsive?: boolean;
    checkIcon?: import("react").ComponentType<any> | import("..").LucideIconType | undefined;
    errorIcon?: import("react").ComponentType<any> | import("..").LucideIconType | undefined;
    onClickStep?: (step: number, setStep: (step: number) => void) => void;
    mobileBreakpoint?: string;
    variant?: "circle" | "circle-alt" | "line";
    size?: "sm" | "md" | "lg";
    styles?: {
        "main-container"?: string;
        "horizontal-step"?: string;
        "horizontal-step-container"?: string;
        "vertical-step"?: string;
        "vertical-step-container"?: string;
        "vertical-step-content"?: string;
        "step-button-container"?: string;
        "step-label-container"?: string;
        "step-label"?: string;
        "step-description"?: string;
    };
    variables?: {
        "--step-icon-size"?: string;
        "--step-gap"?: string;
    };
    scrollTracking?: boolean;
    children?: React.ReactNode;
    className?: string;
    steps: import("./stepper-types").StepItem[];
    nextStep: () => void;
    prevStep: () => void;
    resetSteps: () => void;
    setStep: (step: number) => void;
};
export { StepperProvider };
//# sourceMappingURL=stepper-context.d.ts.map