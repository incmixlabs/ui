import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/accordion/shadcn-accordion"

import { SCNformField } from "@components/shadcn-form/form"
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

function DefaultParent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// Helper function to render a single field
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
