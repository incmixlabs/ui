import { useEffect, useRef, useState } from "react"
import { cn } from "@utils"
import { X } from "lucide-react"
import { motion } from "motion/react"

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Select,
  Icon,
  Text,
  toast,
} from "@incmix/ui"

import { MotionSheet } from "@components/custom-sheet"
import { attachments } from "@components/kanban-board/data"
import { useProjectDrawer } from "../hooks/use-project-drawer"
import { useProjectDetails, useProjectMutations } from "@incmix/store"

import { members } from "../data" // Keep members for now until member management is implemented
import ProjectChecklist from "./project-checklist"
import ProjectComments from "./project-comments"
import ProjectDetails from "./project-details"
import { ComboBox } from "@components/combo-box"
import ProjectLabels from "./project-labels"

export default function ProjectDrawer({
  listFilter,
  listFilterClassName = "w-full relative z-50 h-[84vh] shrink-0 rounded-xl",
  mockData,
  mockOperations,
}: {
  listFilter?: boolean
  listFilterClassName?: string
  mockData?: {
    projectId: string
    project: any
    isLoading: boolean
    labels?: any[]
  }
  mockOperations?: {
    handleDrawerClose: () => void
    updateProject: {
      mutateAsync: (data: any) => Promise<void>
      isLoading: boolean
    }
    updateLabel?: {
      mutateAsync: (data: any) => Promise<void>
      isLoading: boolean
    }
  }
}) {
  // Use mock data and operations if provided, otherwise use real hooks
  const drawerData = mockData
    ? {
        projectId: mockData.projectId,
        handleDrawerClose: mockOperations?.handleDrawerClose || (() => {}),
      }
    : useProjectDrawer()

  const projectDetailsData = mockData
    ? { project: mockData.project, isLoading: mockData.isLoading }
    : useProjectDetails(drawerData.projectId)

  const mutationsData = mockOperations
    ? { updateProject: mockOperations.updateProject }
    : useProjectMutations()

  const { projectId, handleDrawerClose } = drawerData
  const { project, isLoading: projectLoading } = projectDetailsData
  const { updateProject } = mutationsData

  const [status, setStatus] = useState<"started" | "on-hold" | "completed">(
    (project?.status === "all" ? "started" : project?.status) || "started"
  )
  const [selectedMemebers, setSelectedMembers] = useState<string[]>([
    "regina-cooper",
  ])

  // Update status when project changes
  useEffect(() => {
    if (project?.status && project.status !== "all") {
      const validStatuses = ["started", "on-hold", "completed"] as const
      if (validStatuses.includes(project.status as any)) {
        setStatus(project.status as "started" | "on-hold" | "completed")
      }
    }
  }, [project?.status])

  const handleStatusChange = async (newStatus: string) => {
    const validStatus = newStatus as "started" | "on-hold" | "completed"
    setStatus(validStatus)
    if (project?.id && newStatus !== project.status) {
      try {
        await updateProject.mutateAsync({
          id: project.id,
          updates: { status: validStatus },
        })
      } catch (error) {
        console.error("Failed to update project status:", error)
        // Show user-facing error notification
        toast.error("Failed to update project status", {
          description: `Could not update status for "${project?.name || "project"}". Please try again.`,
        })
        // Revert status on failure
        if (project.status !== "all") {
          setStatus(project.status as "started" | "on-hold" | "completed")
        }
      }
    }
  }

  // Show loading state while project data is being fetched
  if (projectLoading) {
    return (
      <MotionSheet
        open={Boolean(projectId)}
        onOpenChange={handleDrawerClose}
        showCloseButton={false}
        isFilterClassName={listFilterClassName}
        isFilter={listFilter}
        side="right"
        className={`${listFilter ? "w-full flex-1" : "w-[53rem]"} p-0 py-0`}
      >
        <Box className="flex h-full items-center justify-center">
          <Box className="animate-pulse space-y-4 p-8">
            <Box className="mx-auto h-8 w-32 rounded bg-gray-6" />
            <Box className="h-4 w-full rounded bg-gray-6" />
            <Box className="h-4 w-3/4 rounded bg-gray-6" />
          </Box>
        </Box>
      </MotionSheet>
    )
  }

  return (
    <>
      <MotionSheet
        open={Boolean(projectId)}
        onOpenChange={handleDrawerClose}
        showCloseButton={false}
        isFilterClassName={listFilterClassName}
        isFilter={listFilter}
        side="right"
        className={`${listFilter ? "w-full flex-1" : "w-[53rem]"} p-0 py-0`}
      >
        <Box
          className={cn(
            listFilter
              ? "relative z-50 h-full w-full shrink-0 rounded-xl"
              : "h-full w-full"
          )}
        >
          <motion.div
            className={cn(
              "cursor-default rounded-lg bg-gray-3 dark:bg-gray-4",
              listFilter ? " h-full w-full" : " h-full w-full"
            )}
          >
            <ScrollArea
              className={
                listFilter ? "h-[84vh] rounded-lg" : "h-[98vh] rounded-lg"
              }
            >
              <Flex align={"center"} className="h-full">
                <Box className="bg-gray-1 p-4 dark:bg-gray-3">
                  <ProjectDetails />

                  <ProjectLabels />

                  <ProjectChecklist />

                  <ProjectComments />
                </Box>
                <Box
                  className={cn(
                    "relative h-full w-72 shrink-0",
                    listFilter ? "pt-5" : "pt-20"
                  )}
                >
                  {!listFilter && (
                    <IconButton
                      color="gray"
                      variant="soft"
                      onClick={handleDrawerClose}
                      className="absolute top-5 right-3 ml-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
                    >
                      <Icon name="X" aria-hidden="true" />
                      <Text className="sr-only">Close</Text>
                    </IconButton>
                  )}

                  <Box className="space-y-3 px-3 pb-3">
                    <Select.Root
                      aria-label="Project status"
                      value={status}
                      onValueChange={handleStatusChange}
                      disabled={updateProject.isLoading}
                    >
                      <Select.Trigger className="h-11 w-full" />
                      <Select.Content className="mx-auto w-[95%]">
                        <Select.Item value="started">Started</Select.Item>
                        <Select.Item value="on-hold">On Hold</Select.Item>
                        <Select.Item value="completed">Completed</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Box>
                  <Box className="space-y-3 border-gray-6 border-t p-4 py-3">
                    <Flex justify={"between"} align={"center"}>
                      <Heading size={"4"} className=" font-medium text-gray-10">
                        Members
                      </Heading>
                      <ComboBox
                        options={members}
                        onValueChange={setSelectedMembers}
                        defaultValue={selectedMemebers}
                        placeholder="Find Person..."
                        title="Assign To"
                      />
                    </Flex>
                    <Box className="gap-1 space-y-4">
                      {members?.map((member) => (
                        <Flex gap={"3"} className="" key={member?.id}>
                          <Avatar src={member.avatar} className="h-10 w-10" />
                          <Box>
                            <Heading size={"3"} className="font-medium">
                              {member?.name}
                            </Heading>
                            <Text as="p" className="text-gray-11 text-sm">
                              {member?.position}
                            </Text>
                          </Box>
                        </Flex>
                      ))}
                    </Box>
                  </Box>
                  <Box className="space-y-3 border-gray-6 border-t p-4 py-3">
                    <Heading size={"4"} className=" font-medium text-gray-10">
                      FILES
                    </Heading>

                    <Box className="space-y-5">
                      {attachments.map((attachment) => (
                        <Flex
                          align={"center"}
                          key={attachment.id}
                          className=" rounded-lg bg-gray-3 transition-colors dark:bg-gray-4"
                        >
                          {attachment.type === "image" ? (
                            <Box className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                              <img
                                src={attachment.thumbnailUrl}
                                alt={attachment.name}
                                className="h-full w-full object-cover"
                              />
                            </Box>
                          ) : (
                            <Box className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-8">
                              <Icon
                                name="FileArchive"
                                className="h-5 w-5 text-gray-8"
                              />
                            </Box>
                          )}
                          <Box className="ml-4 grow">
                            <Heading className="font-medium text-gray-12 text-sm">
                              {attachment.name}
                            </Heading>
                            <Text className="pt-1 text-gray-11 text-sm">
                              {attachment.size}
                            </Text>
                          </Box>

                          <Flex className="flex space-x-2">
                            <Button
                              variant="soft"
                              className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7"
                            >
                              <Icon
                                name="Download"
                                className="h-5 w-5 text-gray-12"
                              />
                            </Button>
                          </Flex>
                        </Flex>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </ScrollArea>
          </motion.div>
        </Box>
      </MotionSheet>
    </>
  )
}
