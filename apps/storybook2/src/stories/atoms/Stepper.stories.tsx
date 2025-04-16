import { Button, Card, Flex, Text  } from "@incmix/ui2/radixui"
import { Step, type StepItem, Stepper, useStepper } from "@incmix/ui2/stepper"
import * as Collapsible from "@radix-ui/react-collapsible"
import { PersonIcon, QuoteIcon, StarIcon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"
import { Form } from "@incmix/ui2/shadcn"
import { cn } from "@incmix/ui2/utils"

const meta: Meta<typeof Stepper> = {
  title: "Atoms/NewStepper",
  component: Stepper,
  decorators: [
    (Story) => (
      <Flex className="h-[80%] w-[80%]" direction="column" justify="center">
        <Story />
      </Flex>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Stepper>

const steps: StepItem[] = [
  {
    label: "Step 1",
    description: "First step description",
  },
  {
    label: "Step 2",
    description: "Second step description",
  },
  {
    label: "Step 3",
    description: "Third step description",
  },
]

function StepperFooter({
  onlyLastStep = false,
  orientation = "horizontal",
  formSubmit,
}: {
  onlyLastStep?: boolean
  orientation?: "horizontal" | "vertical"
  formSubmit?: () => Promise<boolean>
}) {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    isError,
    isLoading,
  } = useStepper()

  const FinalCard = () => (
    <Card.Root className="my-2 h-40">
      <Flex className="h-full" justify="center" align="center">
        <Text className="text-xl">Woohoo! All steps completed! 🎉</Text>
      </Flex>
    </Card.Root>
  )

  const Btn = formSubmit ? Button : Button

  return (
    <>
      {orientation === "horizontal" ? (
        hasCompletedAllSteps && <FinalCard />
      ) : (
        <Collapsible.Root open={hasCompletedAllSteps}>
          <Collapsible.Content
            className={cn(
              "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
            )}
          >
            <FinalCard />
          </Collapsible.Content>
        </Collapsible.Root>
      )}
      {(!onlyLastStep || hasCompletedAllSteps) && (
        <div className="flex w-full justify-end gap-2">
          {hasCompletedAllSteps ? (
            <Button size="1" onClick={resetSteps}>
              Reset
            </Button>
          ) : (
            <>
              <Button
                disabled={isDisabledStep}
                onClick={prevStep}
                size="1"
                variant="soft"
              >
                Prev
              </Button>
              <Btn
                size="1"
                variant="soft"
                onClick={async () => {
                  if (!formSubmit || (await formSubmit())) {
                    nextStep()
                  }
                }}
                disabled={isError || isLoading}
              >
                {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
              </Btn>
            </>
          )}
        </div>
      )}
    </>
  )
}

function StepCard({ index }: { index: number }) {
  return (
    <Card.Root className="my-2 h-40">
      <Flex className="h-full" justify="center" align="center">
        <Text className="text-gray-10 text-xl">Step {index + 1}</Text>
      </Flex>
    </Card.Root>
  )
}

export const Default: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const Horizontal: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} orientation="horizontal" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const Vertical: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} orientation="vertical" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter orientation="vertical" />
        </Stepper>
      </Flex>
    )
  },
}

export const Circle: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} variant="circle" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const CircleAlt: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} variant="circle-alt" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const Line: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} variant="line" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const ErrorState: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} state="error" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const LoadingState: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} state="loading" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

const customIconSteps: StepItem[] = [
  {
    label: "Step 1",
    description: "First step description",
    icon: PersonIcon,
  },
  {
    label: "Step 2",
    description: "Second step description",
    icon: StarIcon,
  },
  {
    label: "Step 3",
    description: "Third step description",
    icon: QuoteIcon,
  },
]

export const CustomIcons: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={customIconSteps} initialStep={0}>
          {customIconSteps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
              icon={step.icon}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

export const FooterInside: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps} orientation="vertical" initialStep={0}>
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
              <StepperFooter orientation="vertical" />
            </Step>
          ))}
          <StepperFooter onlyLastStep orientation="vertical" />
        </Stepper>
      </Flex>
    )
  },
}

export const ClickableSteps: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper
          steps={steps}
          onClickStep={(step, setStep) => {
            setStep(step)
          } } initialStep={0}        >
          {steps.map((step, index) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              <StepCard index={index} />
            </Step>
          ))}
          <StepperFooter />
        </Stepper>
      </Flex>
    )
  },
}

const formSteps: StepItem[] = [
  {
    label: "Step 1",
    description: "First step description",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        validation: z.string().min(3),
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        validation: z.string().email(),
      },
    ],
  },
  {
    label: "Step 2",
    description: "Second step description",
    fields: [
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        validation: z.string().min(10),
      },
    ],
  },
  {
    label: "Step 3",
    description: "Third step description",
    fields: [
      {
        name: "address",
        label: "Address",
        type: "text",
        validation: z.string().min(10),
      },
      {
        name: "notes",
        label: "Notes",
        type: "textarea",
        validation: z.string(),
      },
    ],
  },
]

export const WithForm: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={formSteps} initialStep={0}>
          {formSteps.map((step) => (
            <Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              {step.fields && step.fields.length > 0 && (
                <StepForm fields={step.fields} />
              )}
            </Step>
          ))}
          <StepperFooter onlyLastStep />
        </Stepper>
      </Flex>
    )
  },
}

// Custom form field wrapper component that works with the Form components
const FormFieldWrapper = ({
  name,
  label,
  type,
  field
}: {
  name: string;
  label: string;
  type?: "number" | "search" | "textarea" | "time" | "text" | "hidden" | "tel" | "url" | "email" | "date" | "password" | "datetime-local" | "month" | "week";
  field: any; // Using any for field API type to avoid complexity
}) => {
  return (
    <Form.Item>
      <Form.Label>{label}</Form.Label>
      <Form.Control>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type={type || "text"}
          value={field.state.value || ''}
          onChange={e => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </Form.Control>
      {field.state.meta.errors && (
        <Form.Message>
          {field.state.meta.errors.join(", ")}
        </Form.Message>
      )}
    </Form.Item>
  );
};

function StepForm({ fields }: { fields: (typeof formSteps)[0]["fields"] }) {
  const form = useForm({
    defaultValues: Object.fromEntries(
      fields?.map((field) => [field.name, ""]) ?? []
    ),
    onSubmit: () => {
      form.handleSubmit()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Flex direction="column" gap="4">
        {fields?.map((field) => (
          <form.Field
            key={field.name}
            name={field.name}
            validatorAdapter={zodValidator()}
            validators={{
              onChange: field.validation,
            }}
          >
            {(fieldApi) => (
              <FormFieldWrapper
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                field={fieldApi}
              />
            )}
          </form.Field>
        ))}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isPristine]}
        >
          {([canSubmit, isPristine]) => (
            <StepperFooter formSubmit={async () => !isPristine && canSubmit} />
          )}
        </form.Subscribe>
      </Flex>
    </form>
  )
}
