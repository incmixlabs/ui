import { type DefaultValues, useForm } from "react-hook-form"
import  { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import jsonSchemaToZod from "json-schema-to-zod"

import { Button, Form } from "@base"
import { cn } from "@utils/cn"

import AutoFormObject from "./fields/object"
import type { FieldConfig } from "./types"
import {
  type ZodObjectOrWrapped,
  getDefaultValues,
  getObjectFormSchema,
} from "./utils"

export type * from "./types"
export * from "./utils"

/**
 * Represents a JSON Schema structure that can be converted to a Zod schema
 */
export type JSONSchema = {
  type: string
  properties: Record<string, any>
  required?: string[]
  [key: string]: any
}

/**
 * Determines whether the provided object is a JSON Schema.
 *
 * @param schema - The object to check.
 * @returns True if {@link schema} has the structure of a JSON Schema; otherwise, false.
 */
function isJsonSchema(schema: any): schema is JSONSchema {
  return (
    typeof schema === "object" &&
    schema !== null &&
    "type" in schema &&
    "properties" in schema
  )
}

/**
 * Converts a JSON Schema object to a Zod schema.
 *
 * @param schema - The JSON Schema to convert.
 * @returns A Zod schema equivalent to the provided JSON Schema.
 *
 * @throws {Error} If the conversion fails due to invalid or unsupported schema structure.
 */
function convertJsonSchemaToZod(schema: JSONSchema): z.ZodType {
  try {
    const zodString = jsonSchemaToZod(schema)
    const zodSchemaFunction = new Function("z", `return ${zodString}`)
    return zodSchemaFunction(z)
  } catch (error) {
    console.error("Error converting JSON schema to Zod:", error)
    throw new Error("Failed to convert JSON schema to Zod schema")
  }
}

/**
 * Renders a submit button for use within an auto-generated form.
 *
 * @param children - Optional button label. Defaults to "Submit" if not provided.
 * @param className - Optional CSS class names for the button.
 */
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

/**
 * Renders an auto-generated form based on a Zod schema or JSON Schema, handling validation, value changes, and submission.
 *
 * Accepts either a Zod schema or a JSON Schema as the form definition. Automatically converts JSON Schema to Zod for validation and parsing. Invokes provided callbacks on value changes, successful parsing, and form submission.
 *
 * @param formSchema - The schema defining the form structure, either as a Zod schema or JSON Schema.
 * @param values - Optional initial or controlled form values.
 * @param onValuesChange - Optional callback invoked with current form values on any change.
 * @param onParsedValuesChange - Optional callback invoked with parsed and validated values on change.
 * @param onSubmit - Optional callback invoked with parsed and validated values on form submission.
 * @param fieldConfig - Optional configuration for customizing individual form fields.
 * @param children - Optional React nodes rendered inside the form.
 * @param className - Optional CSS class names for the form.
 * @param dependencies - Optional field dependency configuration for conditional field behavior.
 *
 * @remark
 * If a JSON Schema is provided, it is converted to a Zod schema internally. Errors during conversion will throw at runtime.
 */
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
  formSchema: SchemaType | JSONSchema
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
  // Convert JSON schema to Zod schema if needed
  const zodFormSchema = isJsonSchema(formSchema)
    ? (convertJsonSchemaToZod(formSchema) as SchemaType)
    : formSchema

  const objectFormSchema = getObjectFormSchema(zodFormSchema)
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema)

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(zodFormSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
    mode: "onSubmit", // changed from default "onChange" to "onSubmit"
  })

  function onSubmit(values: z.infer<typeof zodFormSchema>) {
    const parsedValues = zodFormSchema.safeParse(values)
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
            const parsedValues = zodFormSchema.safeParse(values)
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
