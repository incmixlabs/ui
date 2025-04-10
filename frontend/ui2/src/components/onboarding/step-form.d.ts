interface StepFormProps {
    step: any;
    index: number;
    stepData: Record<number, any>;
    setStepData: React.Dispatch<React.SetStateAction<Record<number, any>>>;
    onFinalSubmit: (data: Record<number, any>) => void;
}
export declare const StepForm: ({ step, index, stepData, setStepData, onFinalSubmit, }: StepFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=step-form.d.ts.map