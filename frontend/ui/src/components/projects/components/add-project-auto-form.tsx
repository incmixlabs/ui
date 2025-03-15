// frontend/ui/src/components/projects/components/add-project-auto-form.tsx
import { useState } from "react"
import { z } from "zod"
import { Button, Dialog } from "@radix-ui/themes"
import jsonSchemaToZod from "json-schema-to-zod"
import AutoForm from "@components/auto-form"
import { projectFormSchema } from "./project-form-schema"
import type { Project } from "../types"
import { ProjectsImages } from "../images"

interface AddProjectAutoFormProps {
  isOpen: boolean
  onClose: () => void
  onAddProject: (project: Omit<Project, "id">) => void
}

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
    // Transform form data to match the Project type
    const newProject: Omit<Project, "id"> = {
      title: data.title,
      company: data.company,
      logo: ProjectsImages.user, // Default logo
      description: data.description,
      progress: 0, // Default progress
      timeLeft: "1", // Default timeLeft
      timeType: "week", // Default timeType
      members: data.members || [],
      status: "started", // Default status
      startDate: data.startDate ? new Date(data.startDate).getTime() : undefined,
      endDate: data.endDate ? new Date(data.endDate).getTime() : undefined,
      budget: data.budget ? Number.parseFloat(data.budget) : undefined,
      files: data.files && data.files.length > 0 ? URL.createObjectURL(data.files[0]) : undefined,
    }
    console.log("newProject", newProject)
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
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
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