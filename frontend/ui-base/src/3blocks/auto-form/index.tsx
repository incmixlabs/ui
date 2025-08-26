import { zodResolver } from "@hookform/resolvers/zod"
import jsonSchemaToZod from "json-schema-to-zod"
import { type DefaultValues, useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { Box, Button, Form } from "@/base"
import { cn } from "@/utils/cn"

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
 * Type guard to check if a schema is a JSON schema
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
 * Converts a JSON schema to a Zod schema
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

export function AutoFormSubmit({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const form = useFormContext()
  const hasErrors = form ? Object.keys(form.formState.errors).length > 0 : false
  
  return (
    <Button 
      type="submit" 
      className={className}
      disabled={hasErrors}
    >
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
  formSchema: SchemaType | JSONSchema
  values?: Partial<z.infer<SchemaType>>
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void
  onSubmit?: (values: z.infer<SchemaType>) => void
  fieldConfig?: FieldConfig<Record<string, unknown>>
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
  const defaultValues: DefaultValues<Record<string, unknown>> | null =
    getDefaultValues(objectFormSchema)

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(zodFormSchema) as any,
    defaultValues: defaultValues ?? undefined,
    values: valuesProp as Record<string, unknown>,
    mode: "onSubmit", // changed from default "onChange" to "onSubmit"
  })

  function onSubmit(values: Record<string, unknown>) {
    const parsedValues = zodFormSchema.safeParse(values)
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data as z.infer<SchemaType>)
    }
  }

  return (
    <Box className="w-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e)
          }}
          onChange={() => {
            const values = form.getValues()
            onValuesChangeProp?.(values as Partial<z.infer<SchemaType>>)
            const parsedValues = zodFormSchema.safeParse(values)
            if (parsedValues.success) {
              onParsedValuesChange?.(
                parsedValues.data as Partial<z.infer<SchemaType>>
              )
            }
          }}
          className={cn("space-y-4", className)}
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
    </Box>
  )
}

export default AutoForm
