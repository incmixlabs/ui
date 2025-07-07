import { useRef, useState } from "react"
import { Button, Dialog } from "@radix-ui/themes"
import AutoForm from "@components/auto-form"
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
 * Uses the enhanced AutoForm that supports JSON schema directly.
 */
export function AddProjectAutoForm({
  isOpen,
  onClose,
  onAddProject,
}: AddProjectAutoFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  // Use a ref to store the File object to prevent serialization
  const fileRef = useRef<File | null>(null)

  // Handle form values change
  const handleValuesChange = (values: any) => {
    // Check if values.files is a File object and store it in the ref
    if (values.files instanceof File) {
      fileRef.current = values.files
    }

    // Keep the rest of the form data in state
    setFormData(values)
  }

  // Handle form submission
  const handleSubmit = (data: any) => {
    // Use the File object from the ref instead of from serialized state
    const fileData = fileRef.current

    // Transform form data to match the Project type
    const newProject: Omit<Project, "id"> = {
      name: data.name,
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
      // Use the File object from the ref
      fileData: fileData,
    }

    onAddProject(newProject)
    // Reset both form data and file ref
    setFormData({})
    fileRef.current = null
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title className="font-medium">Add Project</Dialog.Title>

        <div className="py-4">
          {/* We're now passing the JSON schema directly to AutoForm */}
          <AutoForm
            formSchema={projectFormSchema.formSchema}
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
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
