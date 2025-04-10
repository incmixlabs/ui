import React from "react";
import { useStepper } from "./stepper-context";
import type { StepIconProps, StepLabelProps, StepProps, StepSharedProps, StepperProps } from "./stepper-types";
declare function Step(props: StepProps): import("react/jsx-runtime").JSX.Element;
declare namespace Step {
    var displayName: string;
}
declare const StepLabel: {
    ({ isCurrentStep, opacity, label, description, }: StepLabelProps): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
type VerticalStepProps = StepSharedProps & {
    children?: React.ReactNode;
};
declare function VerticalStep(props: VerticalStepProps): import("react/jsx-runtime").JSX.Element;
declare namespace VerticalStep {
    var displayName: string;
}
declare function HorizontalStep(props: StepSharedProps): import("react/jsx-runtime").JSX.Element;
declare namespace HorizontalStep {
    var displayName: string;
}
declare function StepIcon(props: StepIconProps): import("react/jsx-runtime").JSX.Element;
declare namespace StepIcon {
    var displayName: string;
}
type StepButtonContainerProps = StepSharedProps & {
    children?: React.ReactNode;
};
declare const StepButtonContainer: ({ isCurrentStep, isCompletedStep, children, isError, isLoading: isLoadingProp, onClickStep, }: StepButtonContainerProps) => import("react/jsx-runtime").JSX.Element | null;
declare function Stepper(props: StepperProps): import("react/jsx-runtime").JSX.Element;
declare namespace Stepper {
    var displayName: string;
    var defaultProps: {
        size: string;
        orientation: string;
        responsive: boolean;
    };
}
export { HorizontalStep, Step, StepButtonContainer, StepIcon, StepLabel, Stepper, VerticalStep, useStepper, };
//# sourceMappingURL=stepper.d.ts.map