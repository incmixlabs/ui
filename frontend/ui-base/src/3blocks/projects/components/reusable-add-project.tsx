import { Box, Button, Dialog, Icon, Text, toast } from "@/src/1base"
import { saveFormProject, useOrganizationStore } from "@incmix/store"
import type { GetMembersResponse } from "@incmix/utils/types"
import { nanoid } from "nanoid"
import { useCallback, useState } from "react"
import { useStreamingDisplay, useStreamingResponse } from "../../../hooks"

import type { CreateProject, Project } from "../types"
import { projectFormSchema } from "./project-form-schema"

import AutoForm from "../../auto-form"

import type { Option } from "@/src/2elements/multi-select"
import { useQuery } from "@tanstack/react-query"
import { ORG_API_URL } from "../../../utils/constants"
import { useProjectMutation } from "../hooks/use-project-mutation"

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
  onProjectAdded,
}: ReusableAddProjectProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [lastProcessedName, setLastProcessedName] = useState("")

  // Generate unique ID helper
  const generateUniqueId = useCallback(
    (prefix?: string, length = 10): string => {
      const randomId = nanoid(length)
      return prefix ? `${prefix}-${randomId}` : randomId
    },
    []
  )

  // Fetch data from AI endpoint as event stream for project description generation
  const [streamingState, streamingActions] = useStreamingResponse<{
    userStory: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }
  }>({
    endpoint: "/generate-project",
    method: "POST",
    body: {
      prompt: formData.name,
      userTier: "free",
      templateId: 1,
    },
  })

  // Function to take stream data and set it to form data
  const setFormDataFromStream = useCallback(
    (data?: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }) => {
      try {
        if (data) {
          // Format acceptance criteria items
          const formattedAcceptanceCriteria = (
            data.acceptanceCriteria || []
          ).map((item: string) => ({
            id: generateUniqueId("ac"),
            text: item,
            checked: false,
          }))

          // Format checklist items
          const formattedChecklist = (data.checklist || []).map(
            (item: string) => ({
              id: generateUniqueId("cl"),
              text: item,
              checked: false,
            })
          )

          setFormData((prev) => ({
            ...prev,
            description: data.description,
            acceptanceCriteria: formattedAcceptanceCriteria,
            checklist: formattedChecklist,
          }))
          setLastProcessedName(formData.name || "")
        }
      } catch (error) {
        console.error("Error generating AI project description:", error)
      }
    },
    [formData.name, generateUniqueId]
  )

  // Use callback to pass data to form
  useStreamingDisplay({
    streamingData: streamingState.data,
    isStreaming: streamingState.isStreaming,
    connectionStatus: streamingState.connectionStatus,
    onDataUpdate: (data) => {
      setFormDataFromStream(data.userStory)
    },
  })

  const handleValuesChange = (values: Record<string, any>) => {
    setFormData(values)
  }

  const { selectedOrganisation } = useOrganizationStore()

  const { data } = useQuery({
    queryKey: ["organizationMembers", selectedOrganisation?.handle],
    queryFn: async () => {
      const res = await fetch(
        `${ORG_API_URL}/${selectedOrganisation?.handle}/members`,
        {
          credentials: "include",
        }
      )
      if (!res.ok) return []
      const data = (await res.json()) as GetMembersResponse
      return data.map((member) => ({
        label: member.fullName,
        value: member.userId,
      })) as Option[]
    },
    initialData: [],
    enabled: !!selectedOrganisation?.handle,
    retry: 1,
  })
  const { mutateAsync: saveProjectToBackend } = useProjectMutation({
    onSuccess: async (project) => {
      try {
        await saveFormProject({
          id: project.id,
          name: project.name,
          description: project.description,
          createdAt: new Date(project.createdAt).getTime(),
          updatedAt: new Date(project.updatedAt).getTime(),
          createdBy: project.createdBy.id,
          updatedBy: project.updatedBy.id,
          orgId: project.orgId,
          logo: project.logo,
          company: project.company,
          status: project.status,
          startDate: new Date(project.startDate).getTime(),
          endDate: new Date(project.endDate).getTime(),
          budget: project.budget,
        })

        // Call the callback if provided
        if (onProjectAdded) {
          onProjectAdded(project)
        }

        // Close the dialog
        onClose()

        toast.success("Project created successfully", {
          description: `"${project.name}" has been added to your projects.`,
        })
      } catch (error) {
        console.error("Failed to save project to RxDB:", error)
        toast.error("Failed to save project", {
          description: "Your project couldn't be saved Please try again.",
        })
      }
    },
    onError: (error) => {
      console.error("Failed to save project to backend:", error)
      toast.error("Failed to save project", {
        description: "Your project couldn't be saved Please try again.",
      })
    },
  })

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (!selectedOrganisation) {
        toast.error("Please select an organisation")
        return
      }

      // Transform and validate form data
      const transformedData = {
        // Handle budget: ensure it's a number
        budget:
          typeof data.budget === "number"
            ? data.budget
            : Number.parseFloat(data.budget) || 0,

        // Handle files: extract File object from form data
        fileData: (() => {
          if (data.files) {
            // If files is an array (from our schema), get first item
            if (Array.isArray(data.files)) {
              return data.files[0] || null
            }
            // If files is a FileList or single File
            if (data.files instanceof FileList) {
              return data.files[0] || null
            }
            if (data.files instanceof File) {
              return data.files
            }
          }
          return null
        })(),

        // Handle members array
        members:
          data.members?.map((option: Option) => ({
            label: option.label || option.value || "",
            value: option.value || "",
          })) || [],
      }

      // Create a Project object with required fields
      const newProject = {
        name: data.name,
        company: data.company,
        logo: "", // Default empty logo
        description: data.description,
        status: data.status || "started",
        startDate: new Date(data.startDate).getTime(),
        endDate: new Date(data.endDate).getTime(),
        budget: transformedData.budget,
        members: transformedData.members,
        fileData: transformedData.fileData,
        orgId: selectedOrganisation.id,
      } satisfies CreateProject

      await saveProjectToBackend(newProject)

      toast.success("Project created successfully", {
        description: `"${newProject.name}" has been added to your projects.`,
      })
    } catch (error) {
      console.error("Failed to save project:", error)
      toast.error("Failed to save project", {
        description:
          "An error occurred while saving your project. Please try again.",
      })
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title className="font-medium">
          Add Project{" "}
          {<span className="ml-1 text-blue-500 text-sm">(AI Assisted)</span>}
        </Dialog.Title>
        <Dialog.Description>
          Add a comprehensive project with all necessary details
        </Dialog.Description>

        <div className="py-4">
          {/* Project summary for user context */}
          {formData.name && (
            <Box className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
              <Text
                size="2"
                weight="medium"
                className="text-blue-700 dark:text-blue-300"
              >
                📝 Project Preview: {formData.name}
              </Text>
              {formData.company && (
                <Text
                  size="1"
                  className="mt-1 text-blue-600 dark:text-blue-400"
                >
                  Client: {formData.company}
                </Text>
              )}
            </Box>
          )}

          {/* AI Status Message */}
          {
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  onClick={() => streamingActions.startStreaming()}
                  disabled={
                    streamingState.isStreaming || !formData.name?.trim().length
                  }
                  size="2"
                >
                  {streamingState.isStreaming ? (
                    <>
                      <Icon name="Loader" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-2" />
                      Generate Project Description
                    </>
                  )}
                </Button>
                {streamingState.isStreaming && (
                  <Button
                    onClick={() => streamingActions.stopStreaming()}
                    size="2"
                  >
                    Stop
                  </Button>
                )}
                <span className="font-medium text-sm capitalize">
                  {streamingState.connectionStatus}
                </span>
              </div>

              {streamingState.isStreaming &&
                streamingState.connectionStatus === "connected" && (
                  <div className="flex items-center rounded bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                    <Icon name="Sparkles" className="mr-2 animate-pulse" />
                    <span>AI is generating a project description...</span>
                  </div>
                )}

              {streamingState.error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                  <strong>Error:</strong> {streamingState.error}
                </div>
              )}
              {lastProcessedName &&
                !streamingState.isStreaming &&
                !streamingState.error &&
                formData.description && (
                  <div className="flex items-center rounded bg-green-50 p-2 text-green-600 dark:bg-green-900/20 dark:text-green-300">
                    <Icon name="Sparkles" className="mr-2" />
                    <span>
                      AI-generated description based on your project name
                    </span>
                  </div>
                )}
            </div>
          }

          <AutoForm
            formSchema={projectFormSchema.formSchema}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            values={formData}
            // @ts-expect-error - TODO: fix this
            fieldConfig={{
              ...projectFormSchema.fieldConfig,
              members: {
                description: "Members",
                fieldType: "multipleSelector",
                inputProps: {
                  defaultOptions: data,
                  placeholder: "Select members",
                  defaultColor: "gray",
                  className: "border-1 dark:bg-gray-1",
                },
              },
            }}
          >
            {/* AI Generated Acceptance Criteria Display */}
            {formData.acceptanceCriteria &&
              formData.acceptanceCriteria.length > 0 && (
                <div className="mt-4 mb-5 rounded-md border bg-white p-4 dark:bg-gray-800">
                  <h4 className="mb-3 flex items-center font-medium text-sm">
                    <Icon name="Sparkles" className="mr-2 text-blue-500" />
                    AI Generated Acceptance Criteria
                  </h4>
                  <div className="space-y-2">
                    {formData.acceptanceCriteria.map(
                      (item: {
                        id: string
                        text: string
                        checked: boolean
                      }) => (
                        <div key={item.id} className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={item.checked || false}
                            onChange={() => {
                              const updatedAcceptanceCriteria = (
                                formData.acceptanceCriteria || []
                              ).map((checkItem: any) =>
                                checkItem.id === item.id
                                  ? {
                                      ...checkItem,
                                      checked: !checkItem.checked,
                                    }
                                  : checkItem
                              )
                              setFormData((prev) => ({
                                ...prev,
                                acceptanceCriteria: updatedAcceptanceCriteria,
                              }))
                            }}
                            className="mt-1"
                          />
                          <span
                            className={
                              item.checked ? "text-gray-500 line-through" : ""
                            }
                          >
                            {item.text}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* AI Generated Checklist Display */}
            {formData.checklist && formData.checklist.length > 0 && (
              <div className="mt-4 mb-5 rounded-md border bg-white p-4 dark:bg-gray-800">
                <h4 className="mb-3 flex items-center font-medium text-sm">
                  <Icon name="Sparkles" className="mr-2 text-blue-500" />
                  AI Generated Checklist
                </h4>
                <div className="space-y-2">
                  {formData.checklist.map(
                    (item: { id: string; text: string; checked: boolean }) => (
                      <div key={item.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={item.checked || false}
                          onChange={() => {
                            const updatedChecklist = (
                              formData.checklist || []
                            ).map((checkItem: any) =>
                              checkItem.id === item.id
                                ? { ...checkItem, checked: !checkItem.checked }
                                : checkItem
                            )
                            setFormData((prev) => ({
                              ...prev,
                              checklist: updatedChecklist,
                            }))
                          }}
                          className="mt-1"
                        />
                        <span
                          className={
                            item.checked ? "text-gray-500 line-through" : ""
                          }
                        >
                          {item.text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create
              </Button>
            </div>
          </AutoForm>
        </div>

        <Dialog.Footer>
          <div className="flex w-full items-center justify-between">
            <Text size="1" className="text-gray-500">
              {formData.name
                ? `Creating: ${formData.name}`
                : "Fill in the project details"}
              {
                <span className="ml-1 text-blue-500">
                  (AI will enhance your input)
                </span>
              }
            </Text>
          </div>
        </Dialog.Footer>
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
    closeAddProject,
  }
}
