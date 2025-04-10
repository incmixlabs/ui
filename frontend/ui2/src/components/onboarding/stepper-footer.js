import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/radixui/button";
import { useStepper } from "../stepper";
export function StepperFooter() {
    const { prevStep, resetSteps, hasCompletedAllSteps, activeStep, isLastStep } = useStepper();
    return (_jsx("div", { className: "flex w-full justify-end gap-2", children: hasCompletedAllSteps ? (_jsx(Button, { size: "1", onClick: resetSteps, children: "Reset" })) : (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: prevStep, size: "1", variant: "soft", disabled: activeStep === 0, children: "Prev" }), _jsx(Button, { type: "submit", size: "1", children: isLastStep ? "Finish" : "Next" })] })) }));
}
//# sourceMappingURL=stepper-footer.js.map