import { useState } from "react"
import { nanoid } from "nanoid"
import { Button, Dialog, toast } from "@incmix/ui"
import { saveFormProject } from "@incmix/store"

import { projectFormSchema } from "./project-form-schema"
import type { Project } from "../types"

import AutoForm from "@components/auto-form"
import type { Option } from "@components/multiple-selector/multiple-selector"

/**
 * Props for the ReusableAddProject component
 */
export interface ReusableAddProjectProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean
  
  /**
   * Callback when dialog is closed
   */
  onClose: () => void
  
  /**
   * Optional callback after project is successfully added
   */
  onProjectAdded?: (project: Project) => void
}

/**
 * A reusable component for adding projects that can be used anywhere in the application
 */
export function ReusableAddProject({ 
  isOpen, 
  onClose,
  onProjectAdded 
}: ReusableAddProjectProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleValuesChange = (values: Record<string, any>) => {
    setFormData(values)
  }

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      // Process the form data
      const uniqueId = nanoid()
      
      // Make sure we use title property directly from the form data
      if (!data.title && data.name) {
        data.title = data.name; // Use name as title if title is missing but name exists
      }
      
      // Create a Project object with required fields
      const newProject = {
        id: uniqueId,
        name: data.name || "",
        company: data.company || "",
        logo: "", // Default empty logo
        description: data.description || "",
        progress: 0,
        timeLeft: data.timeLeft || "2 weeks",
        timeType: data.timeType || "week",
        status: data.status || "started",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        budget: data.budget || 0,
        // Transform members to match expected format
        members: data.members?.map((option: Option) => ({
          label: option.label || "", // Use 'label' property as required by schema
          value: option.value
        })) || [],
        fileData: data.files?.[0] || null
      } as unknown as Project
      
      // Save to RxDB
      await saveFormProject(newProject)
      
      toast.success("Project created successfully", {
        description: `"${newProject.name}" has been added to your projects.`,
      })
      
      // Call the callback if provided
      if (onProjectAdded) {
        onProjectAdded(newProject)
      }
      
      // Close the dialog
      onClose()
    } catch (error) {
      console.error("Failed to save project:", error)
      toast.error("Failed to save project", {
        description: "An error occurred while saving your project. Please try again.",
      })
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title className="font-medium">Add Project</Dialog.Title>

        <div className="py-4">
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

/**
 * Hook to manage the Add Project dialog state
 */
export function useAddProject() {
  const [isOpen, setIsOpen] = useState(false)
  
  const openAddProject = () => setIsOpen(true)
  const closeAddProject = () => setIsOpen(false)
  
  return {
    isOpen,
    openAddProject,
    closeAddProject
  }
}
