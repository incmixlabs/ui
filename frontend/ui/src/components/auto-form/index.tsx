import { type DefaultValues, useForm } from "react-hook-form"
import type { z } from "zod"

import { Button, Form } from "@base"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@utils/cn"

import AutoFormObject from "./fields/object"
import type { FieldConfig } from "./types"
import {
  type ZodObjectOrWrapped,
  getDefaultValues,
  getObjectFormSchema,
} from "./utils"

export function AutoFormSubmit({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Button type="submit" className={className}>
      {children ?? "Submit"}
    </Button>
  )
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
  dependencies,
}: {
  formSchema: SchemaType
  values?: Partial<z.infer<SchemaType>>
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void
  onSubmit?: (values: z.infer<SchemaType>) => void
  fieldConfig?: FieldConfig<z.infer<SchemaType>>
  children?: React.ReactNode
  className?: string
  dependencies?: Record<
    string,
    {
      field: string
      type: "setOptions" | "disabled" | "required" | "hidden"
      condition: {
        value: any
      }
      options?: any
    }
  >
}) {
  const objectFormSchema = getObjectFormSchema(formSchema)
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema)

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
    mode: "onSubmit", // changed from default "onChange" to "onSubmit"
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values)
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data)
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          noValidate // Add noValidate to disable browser validation
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e)
          }}
          onChange={() => {
            const values = form.getValues()
            onValuesChangeProp?.(values)
            const parsedValues = formSchema.safeParse(values)
            if (parsedValues.success) {
              onParsedValuesChange?.(parsedValues.data)
            }
          }}
          className={cn("space-y-5", className)}
        >
          <AutoFormObject
            schema={objectFormSchema}
            form={form}
            dependencies={dependencies}
            fieldConfig={fieldConfig}
          />

          {children}
        </form>
      </Form>
    </div>
  )
}

export default AutoForm
