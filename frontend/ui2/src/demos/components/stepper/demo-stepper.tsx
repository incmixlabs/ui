"use client";
import { Card } from "@/components/radixui/card";
import { Text } from "@/components/radixui/typography";
import { DemoStepper_Footer } from "./demo-stepper-footer";
import { Step, Stepper } from "@/components/stepper/stepper";
import type { StepItem } from "@/components/stepper/stepper-types";

const STEPS = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

export default function DemoStepper() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Stepper initialStep={0} steps={STEPS}>
        {STEPS.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <Card.Root className="flex items-center justify-center h-40 my-2 bg-secondary">
                <Text className="text-xl">Step {index + 1}</Text>
              </Card.Root>
            </Step>
          );
        })}
        <DemoStepper_Footer />
      </Stepper>
    </div>
  );
}
