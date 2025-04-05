import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion/shadcn-accordion"

import { SCNformField } from "@/components/shadcn-form/form"
import { type useForm, useFormContext } from "react-hook-form"
import type * as z from "zod"
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from "../config"
import type { FieldConfig, FieldConfigItem, FieldGroupConfig } from "../types"
import {
  beautifyObjectName,
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from "../utils"
import AutoFormArray from "./array"
import FieldGroup from "./field-group"

/**
 * Renders child elements within a React fragment.
 *
 * This component serves as a default wrapper for form fields, passing through its children without applying any additional layout or styling.
 */
function DefaultParent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

/**
 * Renders a form field based on its Zod schema and configuration.
 *
 * Depending on the underlying Zod type, this helper returns a JSX element that appropriately renders
 * the field:
 * - For Zod objects, it wraps the field in an accordion item and delegates rendering to the AutoFormObject.
 * - For Zod arrays with a "multiCheckbox" or "multipleSelector" field type, it renders a custom input
 *   component through SCNformField.
 * - For other Zod arrays, it delegates rendering to the AutoFormArray component.
 * - For regular fields, it selects an input component based on the Zod type and renders the field using
 *   SCNformField.
 *
 * Field properties such as default values, required status, and disabled state are computed and passed
 * to the rendered component.
 *
 * @param fieldConfig - Optional configuration for customizing the field's rendering.
 * @param itemName - The label to display for the field.
 * @param isDisabled - Indicates whether the field should be rendered in a disabled state.
 *
 * @returns A React element representing the rendered form field.
 */
function renderField({
  name,
  item,
  form,
  fieldConfig,
  path,
  key,
  itemName,
  isDisabled,
}: {
  name: string
  item: z.ZodAny
  schema: any
  form: ReturnType<typeof useForm>
  fieldConfig?: any
  path: string[]
  dependencies: any
  key: string
  itemName: string
  isDisabled: boolean
}) {
  const zodBaseType = getBaseType(item)

  // Handle ZodObject
  if (zodBaseType === "ZodObject") {
    return (
      <AccordionItem value={name} key={key} className="border-none">
        <AccordionTrigger>{itemName}</AccordionTrigger>
        <AccordionContent className="p-2">
          <AutoFormObject
            schema={item as unknown as z.ZodObject<any, any>}
            form={form}
            fieldConfig={
              (fieldConfig?.[name] ?? {}) as FieldConfig<z.infer<typeof item>>
            }
            path={[...path, name]}
          />
        </AccordionContent>
      </AccordionItem>
    )
  }

  // Get field config item
  const fieldConfigItem: FieldConfigItem = fieldConfig?.[name] ?? {}

  // Check if this is an array field with special handling
  if (
    zodBaseType === "ZodArray" &&
    (fieldConfigItem.fieldType === "multiCheckbox" ||
      fieldConfigItem.fieldType === "multipleSelector")
  ) {
    // Handle it as a regular field instead of using AutoFormArray
    const zodInputProps = zodToHtmlInputProps(item)
    const isRequired =
      zodInputProps.required || fieldConfigItem.inputProps?.required || false

    return (
      <SCNformField
        control={form.control}
        name={key}
        key={key}
        render={({ field }) => {
          // Select the appropriate component based on fieldType
          const InputComponent =
            fieldConfigItem.fieldType === "multiCheckbox"
              ? INPUT_COMPONENTS.multiCheckbox
              : INPUT_COMPONENTS.multipleSelector

          const ParentElement = fieldConfigItem.renderParent ?? DefaultParent

          const defaultValue = fieldConfigItem.inputProps?.defaultValue
          const value = field.value ?? defaultValue ?? []

          const fieldProps = {
            ...zodToHtmlInputProps(item),
            ...field,
            ...fieldConfigItem.inputProps,
            disabled: isDisabled,
            ref: undefined,
            value: value,
          }

          return (
            <ParentElement key={`${key}.parent`}>
              <InputComponent
                zodInputProps={zodInputProps}
                field={field}
                fieldConfigItem={fieldConfigItem}
                label={itemName}
                isRequired={isRequired}
                zodItem={item}
                fieldProps={fieldProps}
                className={fieldProps.className}
              />
            </ParentElement>
          )
        }}
      />
    )
  }

  // Handle ZodArray (without else to fix lint warning)
  if (zodBaseType === "ZodArray") {
    return (
      <AutoFormArray
        key={key}
        name={name}
        item={item as unknown as z.ZodArray<any>}
        form={form}
        fieldConfig={fieldConfig?.[name] ?? {}}
        path={[...path, name]}
      />
    )
  }

  // For regular fields
  const zodInputProps = zodToHtmlInputProps(item)
  const isRequired =
    zodInputProps.required || fieldConfigItem.inputProps?.required || false

  return (
    <SCNformField
      control={form.control}
      name={key}
      key={key}
      render={({ field }) => {
        const inputType =
          fieldConfigItem.fieldType ??
          DEFAULT_ZOD_HANDLERS[zodBaseType] ??
          "fallback"

        // Use type assertion to ensure TypeScript knows this is a valid component
        const InputComponent =
          typeof inputType === "function"
            ? inputType
            : INPUT_COMPONENTS[inputType]

        const ParentElement = fieldConfigItem.renderParent ?? DefaultParent

        const defaultValue = fieldConfigItem.inputProps?.defaultValue
        const value = field.value ?? defaultValue ?? ""

        const fieldProps = {
          ...zodToHtmlInputProps(item),
          ...field,
          ...fieldConfigItem.inputProps,
          disabled: isDisabled,
          ref: undefined,
          value: value,
        }

        if (InputComponent === undefined) {
          return <></>
        }

        return (
          <ParentElement key={`${key}.parent`}>
            <InputComponent
              zodInputProps={zodInputProps}
              field={field}
              fieldConfigItem={fieldConfigItem}
              label={itemName}
              isRequired={isRequired}
              zodItem={item}
              fieldProps={fieldProps}
              className={fieldProps.className}
            />
          </ParentElement>
        )
      }}
    />
  )
}

/**
 * Renders a dynamic form based on the provided Zod schema.
 *
 * This component builds a form by iterating over the schema's fields, grouping them when specified by the field configuration,
 * and applying dependency rules to conditionally disable or hide fields. It leverages React Hook Form to monitor field values
 * via the watch function and automatically coerces number inputs when applicable. If the schema or its underlying shape is invalid,
 * the component returns null.
 *
 * @param schema - A Zod schema or ZodEffects wrapper that defines the form's structure and validation.
 * @param fieldConfig - (Optional) Customization settings for rendering fields, including grouping configurations.
 * @param path - (Optional) Array representing the nested key path for generating unique field identifiers (default: empty array).
 * @param dependencies - (Optional) Mapping of dependency rules that control field behavior, such as disabling or hiding fields based on other field values.
 * @returns An Accordion component containing the dynamically rendered form fields, or null if the schema is not valid.
 */
export default function AutoFormObject<
  SchemaType extends z.ZodObject<any, any>,
>({
  schema,
  form,
  fieldConfig,
  path = [],
  dependencies = {},
}: {
  schema: SchemaType | z.ZodEffects<SchemaType>
  form: ReturnType<typeof useForm>
  fieldConfig?: FieldConfig<z.infer<SchemaType>>
  path?: string[]
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
  const { watch } = useFormContext() // Use useFormContext to access the watch function

  if (!schema) {
    return null
  }
  const { shape } = getBaseSchema<SchemaType>(schema) || {}

  if (!shape) {
    return null
  }

  // Get field groups from fieldConfig
  const fieldGroups = fieldConfig?.fieldGroups || []

  // Create a mapping of fields to their groups and track rendered groups
  const fieldToGroupMap = new Map<string, FieldGroupConfig>()
  const renderedGroups = new Set<string>() // Track which groups we've already rendered

  fieldGroups.forEach((group) => {
    group.fields.forEach((field) => {
      fieldToGroupMap.set(field, group)
    })
  })

  const handleIfZodNumber = (item: z.ZodAny) => {
    const isZodNumber = (item as any)._def.typeName === "ZodNumber"
    const isInnerZodNumber =
      (item._def as any).innerType?._def?.typeName === "ZodNumber"

    if (isZodNumber) {
      ;(item as any)._def.coerce = true
    } else if (isInnerZodNumber) {
      ;(item._def as any).innerType._def.coerce = true
    }
    return item
  }

  // Render fields in schema order, respecting groups
  const renderedFields = Object.keys(shape)
    .map((name) => {
      // Check if this field belongs to a group
      const group = fieldToGroupMap.get(name)
      const groupId = group?.fields.join("-")

      // If field is in a group and we haven't rendered this group yet
      if (group && groupId && !renderedGroups.has(groupId)) {
        // Mark this group as rendered
        renderedGroups.add(groupId)

        // Render the entire group at this position
        const { fields, layout, columns, gap, className } = group

        // Render the fields in this group
        const groupFields = fields.map((fieldName) => {
          if (!shape[fieldName]) return null

          let item = shape[fieldName] as z.ZodAny
          item = handleIfZodNumber(item) as z.ZodAny
          const itemName =
            item._def.description ?? beautifyObjectName(fieldName)
          const key = [...path, fieldName].join(".")
          let isDisabled = false

          const dependency = dependencies[fieldName]
          if (dependency) {
            const watchedValue = watch(dependency.field)
            if (dependency.condition.value === watchedValue) {
              if (dependency.type === "disabled") {
                isDisabled = true
              }
            }
          }

          // Skip hidden fields
          const dependencyZodField = shape[dependency?.field ?? ""]
          const isHidden =
            dependency?.type === "hidden" &&
            watch(dependency.field) === dependency.condition.value

          if (
            isHidden ||
            (dependencyZodField &&
              dependencyZodField._def.defaultValue ===
                dependency?.condition.value)
          ) {
            return null
          }

          return renderField({
            name: fieldName,
            item,
            schema,
            form,
            fieldConfig,
            path,
            dependencies,
            key,
            itemName,
            isDisabled,
          })
        })

        return (
          <FieldGroup
            key={`group-${groupId}`}
            layout={layout}
            columns={columns}
            gap={gap}
            className={className}
          >
            {groupFields}
          </FieldGroup>
        )
      }

      // If field is not in a group or its group has already been rendered
      if (!group) {
        // Render this field normally
        let item = shape[name] as z.ZodAny
        item = handleIfZodNumber(item) as z.ZodAny
        const itemName = item._def.description ?? beautifyObjectName(name)
        const key = [...path, name].join(".")
        let isDisabled = false

        const dependency = dependencies[name]
        if (dependency) {
          const watchedValue = watch(dependency.field)
          if (dependency.condition.value === watchedValue) {
            if (dependency.type === "disabled") {
              isDisabled = true
            }
          }
        }

        // Skip hidden fields
        const dependencyZodField = shape[dependency?.field ?? ""]
        const isHidden =
          dependency?.type === "hidden" &&
          watch(dependency.field) === dependency.condition.value

        if (
          isHidden ||
          (dependencyZodField &&
            dependencyZodField._def.defaultValue ===
              dependency?.condition.value)
        ) {
          return null
        }

        return renderField({
          name,
          item,
          schema,
          form,
          fieldConfig,
          path,
          dependencies,
          key,
          itemName,
          isDisabled,
        })
      }

      // Skip fields that are part of already-rendered groups
      return null
    })
    .filter(Boolean) // Remove null values

  return (
    <Accordion type="multiple" className="space-y-5 border-none">
      {renderedFields}
    </Accordion>
  )
}
