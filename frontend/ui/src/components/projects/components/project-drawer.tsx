import { Avatar } from "@components/avatar"
import { Badge, ExtendedColorType } from "@components/badge"
import { MotionSheet } from "@components/custom-sheet"
import { SmartDatetimeInput } from "@components/datetime-picker"
import { TaskIcon } from "@components/icons/task"
import { ComboBox } from "@components/kanban-board/combo-box"
import { attachments } from "@components/kanban-board/data"
import { KanbanImages } from "@components/kanban-board/images"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { useProjectDrawer } from "@hooks/use-project-drawer"
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Select,
  Tabs,
  Text,
} from "@radix-ui/themes"
import { cn } from "@utils"
import { Download, FileArchive, Image, Paperclip, Smile, X } from "lucide-react"
import { motion } from "motion/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { members, projects } from "../data"
import { ProjectsImages } from "../images"
import ProjectChecklist from "./project-checklist"
import ProjectComments from "./project-comments"
import ProjectDetails from "./project-detials"

export default function ProjectDrawer({
  listFilter,
}: {
  listFilter?: boolean
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
        side="right"
        className="w-[53rem] p-0 py-0"
      >
        <div
          className={cn(
            listFilter
              ? "relative z-50 h-[90vh] w-[30rem] flex-shrink-0 rounded-xl 2xl:w-[40rem]"
              : "h-full w-full"
          )}
        >
          <motion.div
            className={cn(
              "cursor-default rounded-lg bg-gray-3 dark:bg-gray-4 ",
              listFilter ? " h-full w-full" : " h-full w-hull"
            )}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
          >
            <ScrollArea className="h-[98vh] rounded-lg">
              <Flex align={"center"} className="h-full">
                <Box className="bg-gray-1 p-4 dark:bg-gray-3">
                  <ProjectDetails />

                  <ProjectChecklist />

                  <ProjectComments />
                </Box>
                {!listFilter && (
                  <Box className="relative h-full w-72 flex-shrink-0 pt-20">
                    <IconButton
                      color="gray"
                      variant="soft"
                      onClick={handleDrawerClose}
                      className="absolute top-5 right-3 ml-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
                    >
                      <X aria-hidden="true" />
                      <span className="sr-only">Close</span>
                    </IconButton>
                    <Box className="space-y-3 px-3 pb-3">
                      <Select.Root
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
                        <Heading
                          size={"4"}
                          className=" font-medium text-gray-10"
                        >
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
                              <Box className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                  src={attachment.thumbnailUrl}
                                  alt={attachment.name}
                                  className="h-full w-full object-cover"
                                />
                              </Box>
                            ) : (
                              <Box className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-gray-8">
                                <FileArchive className="h-5 w-5 text-gray-8" />
                              </Box>
                            )}

                            <div className="ml-4 flex-grow">
                              <h3 className="font-medium text-gray-12 text-sm">
                                {attachment.name}
                              </h3>
                              <p className="pt-1 text-gray-11 text-sm">
                                {attachment.size}
                              </p>
                            </div>

                            <div className="flex space-x-2">
                              <Button
                                variant="soft"
                                className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7"
                              >
                                <Download className="h-5 w-5 text-gray-12" />
                              </Button>
                            </div>
                          </Flex>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Flex>
            </ScrollArea>
          </motion.div>
        </div>
      </MotionSheet>
    </>
  )
}
