/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultValues } from "react-hook-form"
import { z } from "zod"

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodEffects<z.ZodObject<any, any>>

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // if numbers only return the string
  let output = string.replace(/([A-Z])/g, " $1")
  output = output.charAt(0).toUpperCase() + output.slice(1)
  return output
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<
  ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny,
>(schema: ChildType | z.ZodEffects<ChildType>): ChildType | null {
  if (!schema) return null
  if ("innerType" in schema._def) {
    return getBaseSchema(schema._def.innerType as ChildType)
  }
  if ("schema" in schema._def) {
    return getBaseSchema(schema._def.schema as ChildType)
  }

  return schema as ChildType
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny): string {
  const baseSchema = getBaseSchema(schema)
  return baseSchema ? baseSchema._def.typeName : ""
}

/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString
  >

  if (typedSchema._def.typeName === "ZodDefault") {
    return typedSchema._def.defaultValue()
  }

  if ("innerType" in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny
    )
  }
  if ("schema" in typedSchema._def) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as z.ZodAny
    )
  }

  return undefined
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema
) {
  if (!schema) return null
  const { shape } = schema
  type DefaultValuesType = DefaultValues<Partial<z.infer<Schema>>>
  const defaultValues = {} as DefaultValuesType
  if (!shape) return defaultValues

  for (const key of Object.keys(shape)) {
    const item = shape[key] as z.ZodAny

    if (getBaseType(item) === "ZodObject") {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>
      )

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}` as keyof DefaultValuesType
          defaultValues[pathKey] = defaultItems[defaultItemKey]
        }
      }
    } else {
      const defaultValue = getDefaultValueInZodStack(item)
      if (defaultValue !== undefined) {
        defaultValues[key as keyof DefaultValuesType] = defaultValue
      }
    }
  }

  return defaultValues
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped
): z.ZodObject<any, any> {
  if (schema?._def.typeName === "ZodEffects") {
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>
    return getObjectFormSchema(typedSchema._def.schema)
  }
  return schema as z.ZodObject<any, any>
}

/**
 * Converts a Zod schema into HTML input properties for React components.
 *
 * This function processes a Zod schema representing a number or string field (or their optional variants)
 * and returns an object of input attributes. It determines whether the field is required for UI styling,
 * but it deliberately omits native HTML validation attributes (e.g., "required", "minLength"),
 * allowing Zod to perform the full validation upon form submission.
 *
 * @param schema - A Zod schema defining the field's type.
 * @returns An object containing HTML input properties.
 */
export function zodToHtmlInputProps(
  schema:
    | z.ZodNumber
    | z.ZodString
    | z.ZodOptional<z.ZodNumber | z.ZodString>
    | any
): React.InputHTMLAttributes<HTMLInputElement> {
  // Initialize props without HTML validation attributes to let Zod handle validation
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {}

  // We can still determine if the field is required for UI/styling purposes
  const _isRequired = !["ZodOptional", "ZodNullable"].includes(
    schema._def.typeName
  )

  // But we're not returning HTML validation attributes like 'required', 'minLength', etc.
  // This allows Zod validation to take precedence

  return inputProps
}

/**
 * Checks if a Zod schema represents an array of objects suitable for a multiple selector component.
 *
 * The function confirms that the provided schema is a ZodArray whose items are ZodObjects that include both
 * "label" and "value" properties of string type. The function returns false if the schema does not match these
 * conditions or if any error occurs during the validation process.
 *
 * @param zodItem - The Zod schema to evaluate.
 * @returns True if the schema represents an array of selectable option objects, false otherwise.
 */
export function isMultipleSelectorType(zodItem: z.ZodTypeAny): boolean {
  if (!(zodItem instanceof z.ZodArray)) return false

  const innerType = zodItem._def.type

  // Check if it's an array of objects that look like options
  try {
    if (innerType instanceof z.ZodObject) {
      const shape = innerType.shape
      return (
        shape.label instanceof z.ZodString && shape.value instanceof z.ZodString
      )
    }
  } catch (_e) {
    // If any error in type checking, it's not a MultipleSelector type
    return false
  }

  return false
}
