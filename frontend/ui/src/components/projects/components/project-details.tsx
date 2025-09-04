import { Box, Flex, Heading, Text } from "@incmix/ui"
import { CalendarDays, DollarSign } from "lucide-react"
import { useProjectDetails, useProjectMutations } from "@incmix/store"
import { useProjectDrawer } from "../hooks/use-project-drawer"
import { ProjectsImages } from "../images"
import { InlineEditableField } from "./inline-editable-field"
import { InlineEditableNumber } from "./inline-editable-number"
import { InlineEditableDate } from "./inline-editable-date"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

const formatDate = (timestamp: number | null | undefined) => {
  if (!timestamp) return "Not set"
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp))
}

export default function ProjectDetails({
  mockData,
  mockOperations,
}: {
  mockData?: {
    projectId: string
    project: any
    isLoading: boolean
  }
  mockOperations?: {
    updateProject: {
      mutateAsync: (data: any) => Promise<void>
      isLoading: boolean
    }
    refetch: () => Promise<void>
  }
} = {}) {
  // Use mock data and operations if provided, otherwise use real hooks
  const drawerData = mockData
    ? { projectId: mockData.projectId }
    : useProjectDrawer()

  const projectDetailsData = mockData
    ? {
        project: mockData.project,
        isLoading: mockData.isLoading,
        refetch: mockOperations?.refetch || (() => Promise.resolve()),
      }
    : useProjectDetails(drawerData.projectId)

  const mutationsData = mockOperations
    ? { updateProject: mockOperations.updateProject }
    : useProjectMutations()

  const { projectId: _ } = drawerData
  const { project, isLoading, refetch } = projectDetailsData
  const { updateProject } = mutationsData

  const handleUpdateField = async (
    field: "name" | "company" | "description",
    value: string
  ) => {
    console.log(`handleUpdateField called: field=${field}, value="${value}", projectId=${project?.id}`)
    if (!project?.id) {
      console.log("No project ID, returning early")
      return
    }

    try {
      console.log("Calling updateProject.mutateAsync...")
      await updateProject.mutateAsync({
        id: project.id,
        updates: { [field]: value },
      })
      console.log("updateProject.mutateAsync completed successfully")
      
      // Refetch the project data to get the updated values immediately
      console.log("Calling refetch...")
      await refetch()
      console.log("refetch completed successfully")
    } catch (error) {
      console.error(`Failed to update ${field}:`, error)
      throw error // Re-throw to let the inline field handle the error state
    }
  }

  const handleUpdateNumber = async (field: "budget", value: number) => {
    if (!project?.id) return

    try {
      await updateProject.mutateAsync({
        id: project.id,
        updates: { [field]: value },
      })
      await refetch()
    } catch (error) {
      console.error(`Failed to update ${field}:`, error)
      throw error
    }
  }

  const handleUpdateDate = async (
    field: "startDate" | "endDate",
    value: number | null
  ) => {
    console.log(
      `handleUpdateDate called with field: ${field}, value:`,
      value,
      "project:",
      project
    )
    if (!project?.id) {
      console.log("No project ID, returning early")
      return
    }

    // Compute the resulting start and end dates
    const resultingStartDate = field === "startDate" ? value : project.startDate
    const resultingEndDate = field === "endDate" ? value : project.endDate

    // Validate that end date is not before start date
    if (
      resultingStartDate !== null &&
      resultingEndDate !== null &&
      resultingEndDate < resultingStartDate
    ) {
      console.log("Date validation failed: end date before start date")
      throw new Error("End date cannot be before start date")
    }

    try {
      console.log("Calling updateProject.mutateAsync with:", {
        id: project.id,
        updates: { [field]: value },
      })
      await updateProject.mutateAsync({
        id: project.id,
        updates: { [field]: value },
      })
      console.log("updateProject.mutateAsync completed, calling refetch")
      await refetch()
      console.log("refetch completed")
    } catch (error) {
      console.error(`Failed to update ${field}:`, error)
      throw error
    }
  }

  if (isLoading) {
    return (
      <Box className="animate-pulse space-y-4">
        <Flex align={"center"} gap={"3"}>
          <Box className="h-14 w-14 rounded-xl bg-gray-6" />
          <Box className="space-y-2">
            <Box className="h-4 w-32 rounded bg-gray-6" />
            <Box className="h-3 w-24 rounded bg-gray-6" />
          </Box>
        </Flex>
      </Box>
    )
  }

  if (!project) {
    return (
      <Box className="py-8 text-center">
        <Text className="text-gray-11">Project not found</Text>
      </Box>
    )
  }

  // const projectDetails = [
  //   {
  //     label: "Budget",
  //     value: formatCurrency(project.budget || 0),
  //     icon: <DollarSign />,
  //     bgColor: "bg-green-3",
  //     textColor: "text-green-8",
  //   },
  //   {
  //     label: "Start Date",
  //     value: formatDate(project.startDate),
  //     icon: <CalendarDays />,
  //     bgColor: "bg-blue-3",
  //     textColor: "text-blue-8",
  //   },
  //   {
  //     label: "End Date",
  //     value: formatDate(project.endDate),
  //     icon: <CalendarDays />,
  //     bgColor: "bg-orange-3",
  //     textColor: "text-orange-8",
  //   },
  // ]

  return (
    <>
      {/* project header */}
      <Flex align={"center"} gap={"3"}>
        <Box className="relative grid h-14 w-14 place-content-center rounded-xl border-2 border-gray-4 p-2">
          <img
            src={project.logo || ProjectsImages.dropbox}
            alt={project.name}
            width={48}
            height={48}
            className="object-contain"
          />
        </Box>
        <Box>
          <InlineEditableField
            value={project.name}
            onSave={(value) => handleUpdateField("name", value)}
            placeholder="Enter project name..."
            as="heading"
            size="4"
            className="font-medium text-gray-12"
            disabled={updateProject.isLoading}
          />
          <InlineEditableField
            value={project.company || ""}
            onSave={(value) => handleUpdateField("company", value)}
            placeholder="Enter company name..."
            as="text"
            className="text-gray-11"
            disabled={updateProject.isLoading}
          />
        </Box>
      </Flex>

      <Box className="space-y-2 py-6 pt-4">
        <Heading size={"4"} className="font-medium text-gray-11">
          DETAILS
        </Heading>
        <Flex justify="between" className="pt-1">
          <Flex gap="3">
            <Box className="grid h-10 w-10 place-content-center rounded-lg bg-green-3 text-green-8">
              <DollarSign />
            </Box>
            <Box>
              <Text as="span" className="text-gray-11 text-sm">
                Budget
              </Text>
              <InlineEditableNumber
                value={project.budget || 0}
                onSave={(value) => handleUpdateNumber("budget", value)}
                className="text-sm"
                format={formatCurrency}
                disabled={updateProject.isLoading}
              />
            </Box>
          </Flex>

          <Flex gap="3">
            <Box className="grid h-10 w-10 place-content-center rounded-lg bg-blue-3 text-blue-8">
              <CalendarDays />
            </Box>
            <Box>
              <Text as="span" className="text-gray-11 text-sm">
                Start Date
              </Text>
              <InlineEditableDate
                value={project.startDate}
                onSave={(value) => handleUpdateDate("startDate", value)}
                className="text-sm"
                format={formatDate}
                disabled={updateProject.isLoading}
              />
            </Box>
          </Flex>

          <Flex gap="3">
            <Box className="grid h-10 w-10 place-content-center rounded-lg bg-orange-3 text-orange-8">
              <CalendarDays />
            </Box>
            <Box>
              <Text as="span" className="text-gray-11 text-sm">
                End Date
              </Text>
              <InlineEditableDate
                value={project.endDate}
                onSave={(value) => handleUpdateDate("endDate", value)}
                className="text-sm"
                format={formatDate}
                disabled={updateProject.isLoading}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box className="space-y-2 py-6 pt-4">
        <Heading size={"4"} className="font-medium text-gray-11">
          DESCRIPTION
        </Heading>
        <InlineEditableField
          value={project.description || ""}
          onSave={(value) => handleUpdateField("description", value)}
          placeholder="Click to add description..."
          as="text"
          className="text-gray-10 leading-[120%]"
          multiline={true}
          disabled={updateProject.isLoading}
        />
      </Box>
    </>
  )
}
