import AutoForm from "@components/auto-form"
import { Button, Dialog } from "@radix-ui/themes"
import jsonSchemaToZod from "json-schema-to-zod"
import { useState } from "react"
import { z } from "zod"
import { ProjectsImages } from "../images"
import type { Project } from "../types"
import { projectFormSchema } from "./project-form-schema"

interface AddProjectAutoFormProps {
  isOpen: boolean
  onClose: () => void
  onAddProject: (project: Omit<Project, "id">) => void
}

/**
 * Renders a dialog with an auto-generated form for creating a new project.
 * Fixed to properly handle file uploads.
 */
export function AddProjectAutoForm({
  isOpen,
  onClose,
  onAddProject,
}: AddProjectAutoFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  // Convert JSON schema to Zod schema
  const convertToZod = (schema: any) => {
    try {
      // Generate Zod code from JSON Schema
      const zodString = jsonSchemaToZod(schema)

      // Create a function that returns the Zod schema
      const zodSchemaFunction = new Function("z", `return ${zodString}`)

      // Return the Zod schema
      return zodSchemaFunction(z)
    } catch (error) {
      console.error("Error converting to Zod:", error, {
        schemaId: schema.id || "unknown",
      })
      return null
    }
  }

  // Handle form values change
  const handleValuesChange = (values: any) => {
    setFormData(values)
  }

  // Handle form submission
  const handleSubmit = (data: any) => {
    // Pass the raw File object directly, not as a serialized object
    const fileData = data.files // This should be a File object from AutoFormFile

    // Transform form data to match the Project type
    const newProject: Omit<Project, "id"> = {
      title: data.title,
      company: data.company,
      logo: ProjectsImages.user, // Default logo
      description: data.description,
      progress: 0, // Default progress
      timeLeft: data.timeLeft || "1", // Default timeLeft
      timeType: data.timeType || "week", // Default timeType
      members: data.members || [],
      status: data.status || "started", // Default status
      startDate: data.startDate
        ? new Date(data.startDate).getTime()
        : Date.now(),
      endDate: data.endDate
        ? new Date(data.endDate).getTime()
        : Date.now() + 7 * 24 * 60 * 60 * 1000,
      budget: data.budget ? Number.parseFloat(data.budget) : 0,
      // Just pass the file data as is - our improved saveFormProject will handle it
      fileData: fileData,
    }

    onAddProject(newProject)
    setFormData({}) // Reset form
    onClose()
  }

  // Convert the JSON schema to Zod schema
  const zodSchema = convertToZod(projectFormSchema.formSchema)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title className="font-medium">Add Project</Dialog.Title>

        <div className="py-4">
          {zodSchema && (
            <AutoForm
              formSchema={zodSchema}
              onSubmit={handleSubmit}
              onValuesChange={handleValuesChange}
              values={formData}
              fieldConfig={projectFormSchema.fieldConfig}
            >
              <div className="mt-4 flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create
                </Button>
              </div>
            </AutoForm>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
