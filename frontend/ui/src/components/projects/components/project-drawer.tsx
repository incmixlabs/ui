import { Avatar } from "@components/avatar"
import { Badge, ExtendedColorType } from "@components/badge"
import { MotionSheet } from "@components/custom-sheet"
import { SmartDatetimeInput } from "@components/datetime-picker"
import { TaskIcon } from "@components/icons/task"
import { ComboBox } from "@components/kanban-board/combo-box"
import {
  assignData,
  attachments,
  commentsData,
  labelsData,
} from "@components/kanban-board/data"
import { KanbanImages } from "@components/kanban-board/images"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { useProjectDrawer } from "@hooks/use-project-drawer"
import {
  Box,
  Button,
  Checkbox,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  IconButton,
  Popover,
  Progress,
  ScrollArea,
  Select,
  Tabs,
  Text,
} from "@radix-ui/themes"
import { cn } from "@utils"
import {
  CalendarDays,
  Check,
  Delete,
  DollarSign,
  Download,
  Ellipsis,
  Eye,
  File,
  FileArchive,
  GripVertical,
  Image,
  Layout,
  Link,
  Paperclip,
  Plus,
  Search,
  Smile,
  Trash2,
  X,
} from "lucide-react"
import {
  AnimatePresence,
  type DragControls,
  MotionValue,
  Reorder,
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from "motion/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { members, projects } from "../data"
import { ProjectsImages } from "../images"

const projectDetails = [
  {
    label: "Budget",
    value: "2.500.00",
    icon: <DollarSign />,
    bgColor: "bg-green-3",
    textColor: "text-green-8",
  },
  {
    label: "Start Date",
    value: "17 Jun, 2020",
    icon: <CalendarDays />,
    bgColor: "bg-blue-3",
    textColor: "text-blue-8",
  },
  {
    label: "End Date",
    value: "04 Jul, 2020",
    icon: <CalendarDays />,
    bgColor: "bg-orange-3",
    textColor: "text-orange-8",
  },
]

export default function ProjectDrawer({
  listFilter,
}: {
  listFilter?: boolean
}) {
  const { projectId, handleDrawerClose } = useProjectDrawer()

  const [status, setStatus] = useState("started")

  const [checkListData, setChecklistData] = useState([
    {
      id: 1,
      title: "Inbox Template",
      date: "32.8.2024",
      checked: false,
    },
    {
      id: 2,
      title: "Chat Template",
      date: "32.8.2024",
      checked: false,
    },
    {
      id: 3,
      title: "Tasks Template",
      date: "32.8.2024",
      checked: false,
    },
    {
      id: 4,
      title: "Projects Template",
      date: "32.8.2024",
      checked: false,
    },
  ])
  const [comment, setComment] = useState("")

  const [selectedMemebers, setSelectedMemebers] = useState<string[]>([
    "regina-cooper",
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setComment("")
  }

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
                  {/* template progress */}
                  <Flex align={"center"} gap={"3"}>
                    <Box className="relative grid h-14 w-14 place-content-center rounded-xl border-2 border-gray-4 p-2">
                      <img
                        src={ProjectsImages.dropbox}
                        alt={"dropbox"}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </Box>
                    <Box>
                      <Heading
                        as="h3"
                        className="font-medium text-gray-12"
                        size={"4"}
                      >
                        App Development
                      </Heading>
                      <Text as="p" className="text-gray-11">
                        Dropbox, Inc.
                      </Text>
                    </Box>
                  </Flex>

                  <Box className="space-y-2 py-6 pt-4">
                    <Heading size={"4"} className="font-medium text-gray-11">
                      DETAILS
                    </Heading>
                    <Flex justify="between" className="pt-1">
                      {projectDetails.map((detail) => (
                        <Flex key={detail.label} gap="3">
                          <Box
                            className={`grid h-10 w-10 place-content-center rounded-lg ${detail.bgColor} ${detail.textColor}`}
                          >
                            {detail.icon}
                          </Box>
                          <Box>
                            <Text as="span" className="text-gray-11 text-sm">
                              {detail.label}
                            </Text>
                            <Text as="p" className="text-sm">
                              {detail.value}
                            </Text>
                          </Box>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>

                  <Box className="space-y-2 py-6 pt-4">
                    <Heading size={"4"} className="font-medium text-gray-11">
                      DESCRIPTION
                    </Heading>
                    <Text as="p" className="text-gray-10 leading-[120%]">
                      We need to develop several options (Inbox template, Chat
                      template, tasks template, Projects template) of cool user
                      interface design templates - to carefully work out the
                      smallest details.
                    </Text>
                  </Box>

                  <Box>
                    <Box className="gap-2 space-y-2 py-2">
                      <Heading
                        size={"3"}
                        className="flex w-full items-center gap-1 font-medium text-gray-11 uppercase"
                      >
                        <span>CheckList</span>
                        <span>(50%)</span>
                      </Heading>
                      <Progress value={50} />
                    </Box>
                    <Reorder.Group
                      axis="y"
                      values={checkListData}
                      onReorder={setChecklistData}
                      className="w-full space-y-1 "
                    >
                      {checkListData.map((item) => (
                        <Item key={item.id} item={item}>
                          <Flex className="gap-2">
                            <Checkbox
                              size={"3"}
                              className="h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white "
                            />
                            <h1 className="text-gray-12 text-sm ">
                              {item.title}
                            </h1>
                          </Flex>
                        </Item>
                      ))}
                    </Reorder.Group>
                    <IconButton className="mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary ">
                      <Plus />
                      <span>Add Checklist Item</span>
                    </IconButton>
                  </Box>

                  {/* comments & activity tabs */}
                  <Box>
                    <Tabs.Root defaultValue="comments">
                      <Tabs.List className="gap-4" color="cyan">
                        <Tabs.Trigger
                          value="comments"
                          className="inline-block cursor-pointer py-3 font-medium hover:bg-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary "
                        >
                          COMMENTS
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          value="activity"
                          className="inline-block cursor-pointer py-3 font-medium hover:bg-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary "
                        >
                          ACTIVITY
                        </Tabs.Trigger>
                      </Tabs.List>

                      <Box pt="3">
                        <Tabs.Content value="comments" className="py-4">
                          <form
                            onSubmit={handleSubmit}
                            className="rounded-lg border border-gray-5 bg-gray-2 shadow-sm dark:bg-gray-4"
                          >
                            <Box className="p-2">
                              <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add Comment..."
                                className="min-h-[70px] w-full resize-none border-0 bg-gray-2 text-gray-12 text-sm placeholder-gray-400 focus:ring-0 dark:bg-gray-4"
                              />
                            </Box>

                            <Flex
                              className=" px-4 py-2 "
                              justify={"between"}
                              align={"center"}
                            >
                              <Button
                                type="submit"
                                variant="solid"
                                className="rounded-md px-4 py-2 font-medium text-sm text-white transition-colors"
                                disabled={!comment.trim()}
                              >
                                Comment
                              </Button>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="soft"
                                  className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7"
                                  aria-label="Attach file"
                                >
                                  <Paperclip className="h-5 w-5 text-gray-12" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="soft"
                                  className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7"
                                  aria-label="Add emoji"
                                >
                                  <Smile className="h-5 w-5 text-gray-12" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="soft"
                                  className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7"
                                  aria-label="Upload image"
                                >
                                  <Image className="h-5 w-5 text-gray-12" />
                                </Button>
                              </div>
                            </Flex>
                          </form>
                          <Box className="space-y-4 py-4">
                            {commentsData.map((comment) => (
                              <div key={comment.id} className="flex gap-4">
                                <img
                                  src={comment.user.avatar}
                                  alt={comment.user.name}
                                  className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <Flex align={"center"} className="mb-1 gap-2">
                                    <Heading
                                      size={"3"}
                                      className="font-medium text-gray-12"
                                    >
                                      {comment.user.name}
                                    </Heading>
                                    <Text
                                      as="span"
                                      className="text-gray-500 text-sm"
                                    >
                                      {comment.timestamp}
                                    </Text>
                                  </Flex>
                                  <Text
                                    as="p"
                                    className="whitespace-pre-line text-gray-11"
                                  >
                                    {comment.text}
                                  </Text>

                                  {comment.images && (
                                    <Flex className="mt-3" gap={"2"}>
                                      {comment.images.map((image, index) => (
                                        <div
                                          key={`${image}-${
                                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                            index
                                          }`}
                                          className="group relative"
                                        >
                                          <img
                                            src={image}
                                            alt={`Attachment ${index + 1}`}
                                            className="h-16 w-16 rounded-lg object-cover"
                                          />
                                          {index === 3 &&
                                            (comment.images?.length ?? 0) >
                                              3 && (
                                              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                                                <span className="font-medium text-white">
                                                  +3
                                                </span>
                                              </div>
                                            )}
                                        </div>
                                      ))}
                                    </Flex>
                                  )}
                                </div>
                              </div>
                            ))}
                          </Box>
                        </Tabs.Content>
                        <Tabs.Content value="activity">
                          <p>Access and update your documents.</p>
                        </Tabs.Content>
                      </Box>
                    </Tabs.Root>
                  </Box>
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
                          onValueChange={setSelectedMemebers}
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
interface ChecklistItem {
  id: number
  title: string
  date: string
  checked: boolean
}
const Item = ({
  children,
  item,
}: {
  children: React.ReactNode
  item: ChecklistItem
}) => {
  const y = useMotionValue(0)
  //   const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      value={item}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="group flex w-full items-center justify-between rounded-md bg-gray-3 p-3 dark:bg-gray-4"
    >
      {children}
      <Flex className="gap-3" align={"center"}>
        <ReorderIcon dragControls={dragControls} />
        <IconButton className="bg-transparent opacity-0 group-hover:opacity-100">
          <Trash2 className="h-5 w-5 text-gray-12" />
        </IconButton>
      </Flex>
    </Reorder.Item>
  )
}

interface Props {
  dragControls: DragControls
}
export function ReorderIcon({ dragControls }: Props) {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      onPointerDown={(e) => {
        e.preventDefault()
        dragControls.start(e)
      }}
    >
      <GripVertical className=" h-7 w-7 cursor-grab text-gray-12 opacity-0 active:cursor-grabbing group-hover:opacity-100" />
    </motion.div>
  )
}
