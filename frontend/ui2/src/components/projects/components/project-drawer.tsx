import { Avatar } from "@/components/base"
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Select,
  Text,
} from "@/components/base"
import { MotionSheet } from "@/components/custom-sheet"
import { ComboBox } from "@/components/kanban-board/combo-box"
import { attachments } from "@/components/kanban-board/data"
import { useProjectDrawer } from "@/hooks/use-project-drawer"
import { cn } from "@/lib/utils"
import { Download, FileArchive, X } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import type React from "react"
import { members, projects } from "../data"
import ProjectChecklist from "./project-checklist"
import ProjectComments from "./project-comments"
import ProjectDetails from "./project-details"

export default function ProjectDrawer({
  listFilter,
  listFilterClassName = "w-full relative z-50 h-[84vh] shrink-0 rounded-xl",
}: {
  listFilter?: boolean
  listFilterClassName?: string
}) {
  const { projectId, handleDrawerClose } = useProjectDrawer()

  const [status, setStatus] = useState("started")

  const [selectedMemebers, setSelectedMembers] = useState<string[]>([
    "regina-cooper",
  ])

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
                      <X aria-hidden="true" />
                      <Text className="sr-only">Close</Text>
                    </IconButton>
                  )}

                  <Box className="space-y-3 px-3 pb-3">
                    <Select.Root
                      aria-label="Project status"
                      defaultValue="started"
                      value={status}
                      onValueChange={setStatus}
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
                              <FileArchive className="h-5 w-5 text-gray-8" />
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
                              <Download className="h-5 w-5 text-gray-12" />
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
