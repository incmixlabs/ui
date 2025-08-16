"use client"

import { Box, Button, Dialog, Flex, Heading } from "@/src/1base"
import AutoForm from "@/src/3blocks/auto-form"
import type { JSONSchema } from "@/src/3blocks/auto-form"
import type { ZodObjectOrWrapped } from "@/src/3blocks/auto-form/utils"
import { useEffect, useMemo, useState } from "react"

/**
 * EditTableForm component for editing row data in a dialog
 * Follows the same pattern as AddProjectAutoForm
 */
interface EditTableFormProps<TData> {
  isOpen: boolean
  onClose: () => void
  onEditRow: (oldData: TData, newData: TData) => void
  rowData: TData | null
  formSchema: ZodObjectOrWrapped | JSONSchema
  fieldConfig?: Record<string, any> // Using Record<string, any> for compatibility
  title?: string
}

function EditTableForm<TData>({
  isOpen,
  onClose,
  onEditRow,
  rowData,
  formSchema,
  fieldConfig = {},
  title = "Edit Row",
}: EditTableFormProps<TData>) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  // Reset form data when dialog opens with new row data
  useEffect(() => {
    if (rowData) {
      // Create a deep copy to avoid modifying the original data
      const processedData = JSON.parse(JSON.stringify(rowData)) as Record<
        string,
        any
      >

      // Ensure rating is a string for the form
      if (typeof processedData.rating === "number") {
        processedData.rating = String(processedData.rating)
      }

      // Initialize form data immediately
      setFormData(processedData)
    }
  }, [rowData])

  // Handle form values change
  const handleValuesChange = (values: any) => {
    setFormData(values)
  }

  // Handle form submission
  const handleSubmit = (data: any) => {
    if (rowData) {
      onEditRow(rowData, data)
    }
    setFormData({}) // Reset form
    onClose()
  }

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({})
    }
  }, [isOpen])

  // Create a memoized form element to reduce re-renders
  const formElement = useMemo(() => {
    // Create a unique key for the form based on rowData to ensure remounting when data changes
    const formKey = rowData ? `form-${JSON.stringify(rowData)}` : "form-new"

    return (
      <AutoForm
        key={formKey}
        formSchema={formSchema}
        onSubmit={handleSubmit}
        onValuesChange={handleValuesChange}
        values={formData}
        fieldConfig={fieldConfig}
      >
        <Flex mt="4" justify="end">
          <Button type="submit">Save Changes</Button>
        </Flex>
      </AutoForm>
    )
  }, [
    formSchema,
    fieldConfig,
    formData,
    handleSubmit,
    handleValuesChange,
    rowData,
  ])

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title>
          <Heading size="4" weight="medium">{title}</Heading>
        </Dialog.Title>
        <Box py="4">{formElement}</Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EditTableForm
