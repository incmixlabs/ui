import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { Card, Flex } from "@/components/radixui";
import { Step, Stepper, StepperProvider } from "@/components/stepper";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { formSchema } from "./form-schema";
import { StepForm } from "./step-form";
export const Onboarding = () => {
    const [stepData, setStepData] = useState({});
    const isDesktop = useMediaQuery("(min-width: 768px)");
    console.log(" Step Data: ", stepData);
    const handleFinalSubmit = (finalData) => {
        // Combine all step data using Object.assign instead of spread
        const combinedData = Object.values(finalData).reduce((acc, curr) => {
            return Object.assign(acc, curr);
        }, {});
        console.log("Final Combined Data:", combinedData);
    };
    return (_jsx("div", { className: "h-full w-[1000px] p-4 ", children: _jsx(Flex, { className: "h-full", direction: "column", justify: "center", align: "center", children: _jsx(Card.Root, { className: "w-full p-6", children: _jsx(Flex, { direction: "column", gap: "4", children: _jsx(StepperProvider, { value: {
                            steps: formSchema.steps.map((step) => ({
                                label: step.label,
                                description: typeof step.stepIcon === "string"
                                    ? step.stepIcon
                                    : undefined,
                            })),
                            initialStep: 0,
                        }, children: _jsx(Stepper, { steps: formSchema.steps, orientation: isDesktop ? "horizontal" : "vertical", children: formSchema.steps.map((step, index) => (_jsx(Step, { label: step.label, description: step.stepIcon, children: _jsx(StepForm, { step: step, index: index, stepData: stepData, setStepData: setStepData, onFinalSubmit: handleFinalSubmit }) }, step.label))) }) }) }) }) }) }));
};
//# sourceMappingURL=onboarding.js.map