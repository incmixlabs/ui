import { Box, Button, Dialog, Text, toast } from "@base"
import { saveFormProject, useOrganizationStore } from "@incmix/store"
import { nanoid } from "nanoid"
import { useCallback, useState } from "react"
import { useStreamingDisplay, useStreamingResponse } from "../../../hooks"

import type { Project } from "../types"
import { projectFormSchema } from "./project-form-schema"

import AutoForm from "@components/auto-form"
import type { Option } from "@components/multiple-selector/multiple-selector"
import { useProjectMutation } from "../hooks/use-project-mutation"
import { Icon } from "@incmix/ui"
import { ORG_API_URL } from "../../../utils/constants"
import { useQuery } from "@tanstack/react-query"
import { GetMembersResponse } from "@incmix/utils/types"

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
  const [lastProcessedName, setLastProcessedName] = useState('')


  // Generate unique ID helper
  const generateUniqueId = useCallback((prefix?: string, length = 10): string => {
    const randomId = nanoid(length)
    return prefix ? `${prefix}-${randomId}` : randomId
  }, [])

    // Fetch data from AI endpoint as event stream for project description generation
  const [streamingState, streamingActions] = useStreamingResponse<{
    userStory: {
      description: string;
      acceptanceCriteria: string[];
      checklist: string[];
    }
  }>({
    endpoint: "/generate-project",
    method: "POST",
    body: {
      prompt: formData.name,
      userTier: "free",
      templateId: 1
    },
  });

  // Function to take stream data and set it to form data
  const setFormDataFromStream = useCallback((data?: { description: string, acceptanceCriteria: string[], checklist: string[] }) => {
    try {
      if (data) {
        // Format acceptance criteria items
        const formattedAcceptanceCriteria = (data.acceptanceCriteria || []).map((item: string) => ({
          id: generateUniqueId('ac'),
          text: item,
          checked: false
        }))

        // Format checklist items
        const formattedChecklist = (data.checklist || []).map((item: string) => ({
          id: generateUniqueId('cl'),
          text: item,
          checked: false
        }))


        setFormData((prev) => ({
          ...prev,
          description: data.description,
          acceptanceCriteria: formattedAcceptanceCriteria,
          checklist: formattedChecklist,
        }))
        setLastProcessedName(formData.name || '')
      }
    } catch (error) {
      console.error("Error generating AI project description:", error)
    }
  }, [formData.name, generateUniqueId])

  // Use callback to pass data to form
  useStreamingDisplay({
    streamingData: streamingState.data,
    isStreaming: streamingState.isStreaming,
    connectionStatus: streamingState.connectionStatus,
    onDataUpdate: (data) => {
      setFormDataFromStream(data.userStory)
    }
  })

  const handleValuesChange = (values: Record<string, any>) => {
    setFormData(values)
  }

  const { selectedOrganisation } = useOrganizationStore()

  const { data } = useQuery({
    queryKey: ["organizationMembers", selectedOrganisation?.handle],
    queryFn: async () => {
      const res = await fetch(`${ORG_API_URL}/${selectedOrganisation?.handle}/members`, {
        credentials: "include",
      })
      const data = await res.json() as GetMembersResponse
      return data.map((member) => ({
        id: member.userId,
        label: member.fullName,
        value: member.userId,
        name: member.fullName,
        avatar: member.avatar,
        position: "member",
      })) as Option[]
    },
    initialData: [],
    enabled: !!selectedOrganisation?.handle,
    retry: false,
  })
  const { mutateAsync: saveProjectToBackend } = useProjectMutation();

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      if (!selectedOrganisation) {
        toast.error("Please select an organisation")
        return
      }

      // Process the form data
      const uniqueId = nanoid()
      console.log(data.members)

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
        createdAt: new Date(), // Convert to proper Date object
        updatedAt: new Date(), // Convert to proper Date object
        budget: data.budget || 0,
        // Transform members to match expected format
        members: data.members?.map((option: Option) => ({
          label: option.label || option.value || "", // Fallback to value if label is missing
          value: option.value || "",
          id: option.id,
          name: option.name,
          avatar: option.avatar,
          position: option.position,
        })) || [],
        fileData: data.files?.[0] || null,
        orgId: selectedOrganisation.id
      } satisfies Project & { orgId: string }

      // Save to RxDB
      await saveFormProject(newProject )

      //await saveProjectToBackend(newProject);

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
        <Dialog.Title className="font-medium">
          Add Project {<span className="text-sm text-blue-500 ml-1">(AI Assisted)</span>}
        </Dialog.Title>
        <Dialog.Description>
           Add a comprehensive project with all necessary details
        </Dialog.Description>

        <div className="py-4">
          {/* Project summary for user context */}
          {formData.name && (
            <Box className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Text size="2" weight="medium" className="text-blue-700 dark:text-blue-300">
                📝 Project Preview: {formData.name}
              </Text>
              {formData.company && (
                <Text size="1" className="text-blue-600 dark:text-blue-400 mt-1">
                  Client: {formData.company}
                </Text>
              )}
            </Box>
          )}

          {/* AI Status Message */}
          {(
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  onClick={() => streamingActions.startStreaming()}
                  disabled={streamingState.isStreaming || !formData.name?.trim().length}
                  size="2"
                >
                  {streamingState.isStreaming ? (
                    <>
                      <Icon name="Loader"/>
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
                  <Button onClick={() => streamingActions.stopStreaming()} size="2">
                    Stop
                  </Button>
                )}
                <span className="text-sm font-medium capitalize">
                  {streamingState.connectionStatus}
                </span>
              </div>

              {streamingState.isStreaming && streamingState.connectionStatus === "connected" && (
                <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-300">
                  <Icon name="Sparkles" className="mr-2 animate-pulse" />
                  <span>AI is generating a project description...</span>
                </div>
              )}

              {streamingState.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  <strong>Error:</strong> {streamingState.error}
                </div>
              )}
              {lastProcessedName && !streamingState.isStreaming && !streamingState.error && formData.description && (
                <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded text-green-600 dark:text-green-300">
                  <Icon name="Sparkles" className="mr-2" />
                  <span>AI-generated description based on your project name</span>
                </div>
              )}
            </div>
          )}

          <AutoForm
            formSchema={projectFormSchema.formSchema}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            values={formData}
            // @ts-expect-error - TODO: fix this
            fieldConfig={{...projectFormSchema.fieldConfig,
              members: {
              description: "Members",
              fieldType: "multipleSelector",
              inputProps: {
                defaultOptions: data,
                placeholder: "Select members",
                defaultColor: "gray",
                className: "border-1 dark:bg-gray-1",
              },
            },}}
          >
            {/* AI Generated Acceptance Criteria Display */}
            {formData.acceptanceCriteria && formData.acceptanceCriteria.length > 0 && (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-800 mt-4 mb-5">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Icon name="Sparkles" className="mr-2 text-blue-500" />
                  AI Generated Acceptance Criteria
                </h4>
                <div className="space-y-2">
                  {formData.acceptanceCriteria.map((item: { id: string; text: string; checked: boolean }) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={item.checked || false}
                        onChange={() => {
                          const updatedAcceptanceCriteria = (formData.acceptanceCriteria || []).map(
                            (checkItem: any) => checkItem.id === item.id
                              ? { ...checkItem, checked: !checkItem.checked }
                              : checkItem
                          )
                          setFormData(prev => ({ ...prev, acceptanceCriteria: updatedAcceptanceCriteria }))
                        }}
                        className="mt-1"
                      />
                      <span className={item.checked ? "line-through text-gray-500" : ""}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Generated Checklist Display */}
            {formData.checklist && formData.checklist.length > 0 && (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-800 mt-4 mb-5">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Icon name="Sparkles" className="mr-2 text-blue-500" />
                  AI Generated Checklist
                </h4>
                <div className="space-y-2">
                  {formData.checklist.map((item: { id: string; text: string; checked: boolean }) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={item.checked || false}
                        onChange={() => {
                          const updatedChecklist = (formData.checklist || []).map(
                            (checkItem: any) => checkItem.id === item.id
                              ? { ...checkItem, checked: !checkItem.checked }
                              : checkItem
                          )
                          setFormData(prev => ({ ...prev, checklist: updatedChecklist }))
                        }}
                        className="mt-1"
                      />
                      <span className={item.checked ? "line-through text-gray-500" : ""}>
                        {item.text}
                      </span>
                    </div>
                  ))}
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
          <div className="flex justify-between items-center w-full">
            <Text size="1" className="text-gray-500">
              {formData.name ? `Creating: ${formData.name}` : "Fill in the project details"}
              {<span className="ml-1 text-blue-500">(AI will enhance your input)</span>}
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
    closeAddProject
  }
}
