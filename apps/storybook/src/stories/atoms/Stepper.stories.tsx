import { Button, Card, Flex, Form, Text } from "@incmix/ui"
import { cn } from "@incmix/ui/utils"
import { Step, type StepItem, Stepper, useStepper } from "@incmix/ui/stepper"
import * as Collapsible from "@radix-ui/react-collapsible"
import { PersonIcon, QuoteIcon, StarIcon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { z } from "zod"

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
    <Card className="my-2 h-40">
      <Flex className="h-full" justify="center" align="center">
        <Text className="text-xl">Woohoo! All steps completed! 🎉</Text>
      </Flex>
    </Card>
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
    <Card className="my-2 h-40">
      <Flex className="h-full" justify="center" align="center">
        <Text className="text-gray-10 text-xl">Step {index + 1}</Text>
      </Flex>
    </Card>
  )
}

export const Default: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="4">
        <Stepper steps={steps}>
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
        <Stepper steps={steps} orientation="horizontal">
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
        <Stepper steps={steps} orientation="vertical">
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
        <Stepper steps={steps} variant="circle">
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
        <Stepper steps={steps} variant="circle-alt">
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
        <Stepper steps={steps} variant="line">
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
        <Stepper steps={steps} state="error">
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
        <Stepper steps={steps} state="loading">
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
        <Stepper steps={customIconSteps}>
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
        <Stepper steps={steps} orientation="vertical">
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
          }}
        >
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
        <Stepper steps={formSteps}>
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
              <Form.Field
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
