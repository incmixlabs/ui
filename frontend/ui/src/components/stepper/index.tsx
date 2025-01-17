import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import { defineStepper } from "@stepperize/react"
import * as React from "react"
import { z } from "zod"

import { camelize, capitalize } from "@jsprtmnn/utils/strings"
import { Button } from "../button/button"
import { Input } from "../form/input"
import { Separator } from "../separator"

/*

const shippingSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number is required'),
  expirationDate: z.string().min(5, 'Expiration date is required'),
  cvv: z.string().min(3, 'CVV is required'),
});

const { useStepper, steps } = defineStepper(
  { id: 'shipping', label: 'Shipping', schema: shippingSchema },
  { id: 'payment', label: 'Payment', schema: paymentSchema },
  { id: 'complete', label: 'Complete', schema: z.object({}) }
);

*/
export type FieldType = {
  len: number
  message: string
  key?: string
  label: string
  type?: string | number
}
export type FormStep = {
  id: string
  label: string // label for the step , Shipping, Address, Payment
  // if not provided, it will be capitalized to Id
  fields: FieldType[] // fields in each step
}

export type FormSchema = {
  id: string
  label: string
  schema: z.ZodObject<any>
}

export type FormLabels = {
  stepLabel?: string
  resetLabel?: string
  cancelLabel?: string
}
export const formDefaultLabels: FormLabels = {
  stepLabel: "Step",
  resetLabel: "Reset",
  cancelLabel: "Cancel",
}
export type StepperProps = {
  formId: string
  formSteps: FormStep[]
  labels?: FormLabels
}

export function makeSchema(fields: FieldType[]) {
  if (!fields.length) return z.object({})
  const acc: Record<string, z.ZodSchema> = {}
  fields.reduce((acc: Record<string, z.ZodSchema>, field) => {
    const zVal =
      field.type === "string"
        ? z.string()
        : field.type === "number"
          ? z.number()
          : z.string()
    const key = field.key ?? camelize(field.label)
    acc[key] = zVal.min(field.len, field.message)
    return acc
  }, {})
  return z.object(acc)
}

export function StepComponent({ fields, key }: { fields: any[]; key: string }) {
  const fieldInputs = fields.map((field: any) => {
    return (
      <div className="space-y-2" key={field.key}>
        <label
          htmlFor={field.id}
          className="block font-medium text-primary text-sm"
        >
          {field.name}
        </label>
        <Input
          {...getInputProps(field, { type: field.type })}
          className="block w-full rounded-md border p-2"
        />
        {field.errors && (
          <p className="text-destructive text-sm" id={field.errorId}>
            {field.errors}
          </p>
        )}
      </div>
    )
  })
  return (
    <div key={key} className="space-y-4 text-start">
      {fieldInputs}
    </div>
  )
}

export function Stepper({
  formId,
  formSteps,
  labels = formDefaultLabels,
}: StepperProps) {
  labels = { ...labels, ...formDefaultLabels }
  const formSchemaSteps = formSteps.map((step, i) => ({
    id: step.id,
    label: step.label || capitalize(step.id),
    schema: makeSchema(step.fields),
    index: i,
  }))
  const { useStepper, steps } = defineStepper(...formSchemaSteps)
  const stepper = useStepper()
  const [form, fields]: [any, { [key: string]: any }] = useForm({
    id: formId,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    constraint: getZodConstraint(stepper.current.schema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: stepper.current.schema })
    },
    onSubmit(event, { submission }) {
      event.preventDefault()
      console.log(`Form values for step ${stepper.current.id}:`, submission)
      if (stepper.isLast) {
        stepper.reset()
      } else {
        stepper.next()
      }
    },
  })
  const schemaSwitchSteps = formSchemaSteps.reduce<{
    [key: string]: (step: any) => JSX.Element
  }>((acc, step) => {
    acc[step.id] = () => (
      <StepComponent
        key={step.id}
        fields={Object.values(fields[step.id] ?? {})}
      />
    )
    return acc
  }, {})
  const stepSwitch = stepper.switch(schemaSwitchSteps)

  return (
    <form
      method="post"
      {...getFormProps(form)}
      className="w-[450px] space-y-6 rounded-lg border p-6"
    >
      <div id={form.errorId}>{form.errors}</div>
      <div className="flex justify-between">
        <h2 className="font-medium text-lg">{formId}</h2>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {labels.stepLabel} {stepper.current.index + 1} of {steps.length}
          </span>
        </div>
      </div>
      <nav aria-label="Checkout Steps" className="group my-4">
        <ol
          className="flex items-center justify-between gap-2"
          aria-orientation="horizontal"
        >
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex flex-shrink-0 items-center gap-4">
                <Button
                  type="button"
                  role="tab"
                  variant={index <= stepper.current.index ? "soft" : "solid"}
                  aria-current={
                    stepper.current.id === step.id ? "step" : undefined
                  }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className="flex size-10 items-center justify-center rounded-full"
                  onClick={() => stepper.goTo(step.id)}
                >
                  {index + 1}
                </Button>
                <span className="font-medium text-sm">{step.label}</span>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={`flex-1 ${
                    index < stepper.current.index ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>

      <div className="space-y-4">
        {stepSwitch}
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="solid"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              {labels.cancelLabel}
            </Button>
            <Button>{stepper.isLast ? "Complete" : "Next"}</Button>
          </div>
        ) : (
          <Button type="button" onClick={stepper.reset}>
            {labels.resetLabel}
          </Button>
        )}
      </div>
    </form>
  )
}
