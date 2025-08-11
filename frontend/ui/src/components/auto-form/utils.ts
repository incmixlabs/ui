import type { DefaultValues } from "react-hook-form"
import { z } from "zod"

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodTransform<z.ZodObject<any, any>, any>

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
  ChildType extends z.ZodTypeAny = z.ZodTypeAny,
>(schema: ChildType | z.ZodTransform<ChildType, any>): ChildType | null {
  if (!schema) return null
  if ("innerType" in schema._def) {
    return getBaseSchema(schema._def.innerType as any) as ChildType
  }
  if ("schema" in schema._def) {
    return getBaseSchema(schema._def.schema as any) as ChildType
  }

  return schema as ChildType
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodTypeAny): string {
  const baseSchema = getBaseSchema(schema)
  if (!baseSchema || !baseSchema._def) return ""
  // Handle different Zod versions
  return (baseSchema._def as any).typeName || (baseSchema as any)._def.typeName || ""
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodTypeAny): any {
  const typedSchema = schema as any

  if (typedSchema._def.typeName === "ZodDefault") {
    return typeof typedSchema._def.defaultValue === "function"
      ? typedSchema._def.defaultValue()
      : typedSchema._def.defaultValue
  }

  if ("innerType" in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as z.ZodTypeAny
    )
  }
  if ("schema" in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.schema as z.ZodTypeAny
    )
  }

  return undefined
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema
): DefaultValues<Record<string, unknown>> | null {
  if (!schema) return null
  const { shape } = schema
  const defaultValues: Record<string, any> = {}
  if (!shape) return defaultValues

  for (const key of Object.keys(shape)) {
    const item = shape[key] as z.ZodTypeAny

    if (getBaseType(item) === "ZodObject") {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>
      )

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}`
          defaultValues[pathKey] = defaultItems[defaultItemKey]
        }
      }
    } else {
      const defaultValue = getDefaultValueInZodStack(item)
      if (defaultValue !== undefined) {
        defaultValues[key] = defaultValue
      }
    }
  }

  return defaultValues as DefaultValues<Record<string, unknown>>
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped
): z.ZodObject<any, any> {
  const schemaType = (schema as any)?._def?.typeName
  if (schemaType === "ZodEffects" || schemaType === "ZodTransform") {
    // Access the underlying schema from transform/effects
    const innerSchema = (schema as any)?._def?.schema || (schema as any)?._def?.innerType
    return getObjectFormSchema(innerSchema)
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
  try {
    const typeName = (zodItem as any)?._def?.typeName
    if (typeName !== "ZodArray") return false

    const innerType = (zodItem as any)?._def?.type
    if (!innerType) return false

    // Check if it's an array of objects that look like options
    const innerTypeName = (innerType as any)?._def?.typeName
    if (innerTypeName === "ZodObject") {
      const shape = (innerType as any)?._def?.shape || (innerType as any)?.shape
      if (!shape) return false
      
      const labelType = (shape.label as any)?._def?.typeName
      const valueType = (shape.value as any)?._def?.typeName
      return labelType === "ZodString" && valueType === "ZodString"
    }
  } catch (_e) {
    // If any error in type checking, it's not a MultipleSelector type
    return false
  }

  return false
}
