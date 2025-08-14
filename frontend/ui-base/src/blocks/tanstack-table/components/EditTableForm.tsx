"use client"

import AutoForm from "@/auto-form"
import type { JSONSchema } from "@/auto-form"
import type { ZodObjectOrWrapped } from "@/auto-form/utils"
import { Button, Dialog } from "@radix-ui/themes"
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
      console.log("Original rowData for pre-filling:", rowData)

      // Create a deep copy to avoid modifying the original data
      const processedData = JSON.parse(JSON.stringify(rowData)) as Record<
        string,
        any
      >

      // Ensure rating is a string for the form
      if (typeof processedData.rating === "number") {
        processedData.rating = String(processedData.rating)
        console.log("Converted rating to string:", processedData.rating)
      }

      // Initialize form data immediately
      console.log("Pre-filling form with processed data:", processedData)
      setFormData(processedData)
    }
  }, [rowData])

  // Handle form values change
  const handleValuesChange = (values: any) => {
    console.log("Form values changed:", values)
    setFormData(values)
  }

  // Handle form submission
  const handleSubmit = (data: any) => {
    console.log("Form submitted with data:", data)
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
        <div className="mt-4 flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
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
        <Dialog.Title className="font-medium">{title}</Dialog.Title>
        <div className="py-4">{formElement}</div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default EditTableForm
