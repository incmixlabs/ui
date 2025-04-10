import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import jsonSchemaToZod from "json-schema-to-zod";
import { z } from "zod";
import AutoForm from "../auto-form";
import { useStepper } from "../stepper";
import { AuthWrapper } from "./auth-wrapper";
import { StepperFooter } from "./stepper-footer";
export const StepForm = ({ step, index, stepData, setStepData, onFinalSubmit, }) => {
    const { nextStep, activeStep, isLastStep } = useStepper();
    // Simplified conversion - using json-schema-to-zod directly
    const convertToZod = (schema) => {
        try {
            // Generate Zod code from JSON Schema
            const zodString = jsonSchemaToZod(schema);
            // Create a function that returns the Zod schema
            const zodSchemaFunction = new Function("z", `return ${zodString}`);
            // Return the Zod schema
            return zodSchemaFunction(z);
        }
        catch (error) {
            console.error("Error converting to Zod:", error, {
                schemaId: schema.id || "unknown",
            });
            return null;
        }
    };
    // Handle form values change
    const handleValuesChange = (values) => {
        setStepData((prev) => ({
            ...prev,
            [activeStep]: values,
        }));
    };
    // Handle form submission
    const handleSubmit = (data) => {
        // Update the step data with the current form data
        const updatedStepData = {
            ...stepData,
            [activeStep]: data,
        };
        // Save the updated step data
        setStepData(updatedStepData);
        if (isLastStep) {
            // Call final submit with all data
            onFinalSubmit(updatedStepData);
            // Move to completed state
            nextStep();
        }
        else {
            // Move to next step
            nextStep();
        }
    };
    // Convert the JSON schema to Zod schema
    const zodSchema = convertToZod(step.formSchema);
    return (_jsx(AuthWrapper, { title: "Welcome!", subTitle: step.label, image: `step${index + 1}`, children: _jsx(AutoForm, { onSubmit: handleSubmit, onValuesChange: handleValuesChange, formSchema: zodSchema, values: stepData[activeStep] || {}, fieldConfig: step?.fieldConfig ?? {}, dependencies: step?.dependencies ?? {}, children: _jsx(StepperFooter, {}) }, `form-${activeStep}`) }));
};
//# sourceMappingURL=step-form.js.map