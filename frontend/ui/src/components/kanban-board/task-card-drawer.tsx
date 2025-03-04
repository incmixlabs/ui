import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import {
  Box,
  Button,
  Checkbox,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  Popover,
  ScrollArea,
  Tabs,
  Text,
} from "@radix-ui/themes"
import { cn } from "@utils"
import {
  Check,
  Delete,
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
import { Avatar } from "../avatar"
import { Badge } from "../badge"
import type { ExtendedColorType } from "../badge"
import { IconButton } from "../button"
import { SmartDatetimeInput } from "../datetime-picker"
import { TaskIcon } from "../icons/task"
import X from "../icons/x"
import { ComboBox } from "./combo-box"
import { assignData, attachments, commentsData, labelsData } from "./data"
import { KanbanImages } from "./images"

export default function TaskCardDrawer({
  kanbanFilter,
}: {
  kanbanFilter: boolean
}) {
  const { taskId, handleDrawerClose } = useKanbanDrawer()
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
  const [selectedLabels, setSelectedLabes] = useState<string[]>([
    "design",
    "frontend",
    "backend",
  ])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [allLabelsData, setAllLabelsData] = useState(labelsData)
  const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
  const [labelColor, setLabelColor] = useState("blue")
  const formRef = useRef<HTMLFormElement>(null as unknown as HTMLFormElement)

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setComment("")
  }

  const handleAddNewLabel = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const labelName = formData.get("labelName") as string

    if (!labelName.trim()) return

    const newLabel = {
      value: labelName.toLowerCase().replace(/\s+/g, "-"),
      label: labelName,
      color: labelColor || "blue",
    }

    // Add the new label to options
    // This depends on how you're managing state in the parent component
    // For example: onLabelsChange([...options, newLabel]);

    setAllLabelsData([...allLabelsData, newLabel])
    // Reset form and close it
    formRef.current.reset()
    setIsLabelFormOpen(false)
  }
  return (
    <>
      <AnimatePresence>
        {Boolean(taskId) && (
          <div
            className={cn(
              kanbanFilter
                ? "relative z-50 h-[90vh] w-[30rem] flex-shrink-0 rounded-xl 2xl:w-[40rem]"
                : "fixed top-0 left-0 z-50 h-screen w-screen"
            )}
            aria-modal="true"
          >
            {!kanbanFilter && (
              <motion.div
                className="overlay absolute h-full w-full cursor-pointer bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleDrawerClose}
                role="button"
                aria-label="Close drawer"
              />
            )}
            <motion.div
              className={cn(
                "cursor-default rounded-lg bg-gray-3 dark:bg-gray-4 ",
                kanbanFilter
                  ? " h-full w-full"
                  : " absolute top-[1%] right-[1.5%] bottom-[1%] h-[98%] w-[52rem] "
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
              <ScrollArea className="h-full rounded-lg">
                <Flex align={"center"} className="h-full">
                  <Box className="bg-gray-1 p-4 dark:bg-gray-3">
                    <Flex align={"center"} justify={"between"}>
                      <Flex className=" gap-2">
                        <Button className="flex h-10 items-center gap-1 rounded-md font-semibold text-white">
                          <Check size={16} />
                          Complete
                        </Button>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger className="">
                            <Button
                              color="gray"
                              variant="soft"
                              className="h-10 cursor-pointer gap-2 rounded-md border p-2 px-2"
                            >
                              <Eye size={16} />
                              <span>2</span>
                              <DropdownMenu.TriggerIcon />
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content
                            className=" z-[88] "
                            color="gray"
                            variant="soft"
                          >
                            <DropdownMenu.Item shortcut="⌘ E">
                              Edit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item shortcut="⌘ D">
                              Duplicate
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item shortcut="⌘ N">
                              Archive
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Flex>
                      <Flex className=" gap-2">
                        <IconButton
                          color="gray"
                          variant="soft"
                          className="flex items-center gap-1 rounded-md bg-transparent font-semibold"
                        >
                          <Link size={20} />
                        </IconButton>

                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger className="">
                            <IconButton
                              color="gray"
                              variant="soft"
                              className="flex items-center rounded-md bg-transparent font-semibold"
                            >
                              <Ellipsis size={24} />
                            </IconButton>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content
                            color="gray"
                            variant="soft"
                            highContrast
                            alignOffset={-40}
                            className=" z-[88] w-36 "
                          >
                            <DropdownMenu.Item className="justify-start px-1">
                              <TaskIcon /> Task
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="justify-start px-1">
                              <TaskIcon /> Board
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="justify-start px-1">
                              <TaskIcon />
                              Project
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="justify-start px-1">
                              <TaskIcon />
                              Invite
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                        {kanbanFilter && (
                          <IconButton
                            color="gray"
                            variant="soft"
                            onClick={handleDrawerClose}
                            className="ml-2 flex h-8 w-8 items-center justify-center rounded-md"
                          >
                            <X aria-hidden="true" />
                            <span className="sr-only">Close</span>
                          </IconButton>
                        )}
                      </Flex>
                    </Flex>

                    {/* template progress */}
                    <Heading className="px-0 py-4 font-medium">
                      Template Progress
                    </Heading>
                    {kanbanFilter && (
                      <Box className="space-y-3 py-2">
                        <Grid columns="2">
                          <Box className="space-y-3">
                            <Heading
                              size={"4"}
                              className="font-medium text-gray-11"
                            >
                              ASSIGNED TO
                            </Heading>
                            <Flex className="gap-1">
                              <Avatar
                                src={KanbanImages.user1}
                                className="h-8 w-8"
                              />
                              <Avatar
                                src={KanbanImages.user2}
                                className="h-8 w-8"
                              />
                              <Avatar
                                src={KanbanImages.user1}
                                className="h-8 w-8"
                              />
                              <ComboBox
                                options={assignData}
                                onValueChange={setSelectedMemebers}
                                defaultValue={selectedMemebers}
                                placeholder="Find Person..."
                                title="Assign To"
                              />
                            </Flex>
                          </Box>
                          <Box className="space-y-3">
                            <Heading
                              size={"4"}
                              className="font-medium text-gray-11"
                            >
                              CREATED BY
                            </Heading>
                            <Flex className="gap-2">
                              <Flex className="gap-1" align={"center"}>
                                <Avatar
                                  src={KanbanImages.user1}
                                  className="h-8 w-8"
                                />
                                <p>Regina Cooper</p>
                              </Flex>
                            </Flex>
                          </Box>
                        </Grid>
                        {/* lables */}
                        <h2 className="font-medium text-gray-500">LABELS</h2>
                        <Flex className="gap-2">
                          {allLabelsData?.map((label) => (
                            <Badge
                              color={label.color as ExtendedColorType}
                              variant="solid"
                              key={label.value}
                              className="rounded-md p-1.5 px-2.5"
                            >
                              {label.label}
                            </Badge>
                          ))}

                          <ComboBox
                            options={allLabelsData}
                            onValueChange={setSelectedLabes}
                            defaultValue={selectedLabels}
                            placeholder="Search Label"
                            title="Labels"
                            addNewLabel={true}
                            isLabelFormOpen={isLabelFormOpen}
                            formRef={formRef}
                            setIsLabelFormOpen={setIsLabelFormOpen}
                            handleAddNewLabel={handleAddNewLabel}
                          />
                        </Flex>

                        {/* DUE DATE */}
                        <h2 className=" font-medium text-gray-500">
                          DUE DATE{" "}
                        </h2>
                        <SmartDatetimeInput
                          value={selectedDate}
                          onValueChange={handleDateChange}
                          placeholder="Enter a date and time"
                        />
                      </Box>
                    )}
                    <Box className="space-y-2 py-6 pt-4">
                      <Heading size={"4"} className="font-medium text-gray-11">
                        DESCRIPTION
                      </Heading>
                      <Text as="p" className="text-gray-10 leading-[120%]">
                        We need to develop several options (Inbox template, Chat
                        template, tasks template, Projects template) of cool
                        user interface design templates - to carefully work out
                        the smallest details.
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
                        <Box
                          className="relative flex h-2 w-full items-center gap-1 rounded-full bg-gray-200 before:absolute before:top-0 before:left-0 before:h-2 before:w-[var(--progress)] before:rounded-full before:bg-secondary"
                          style={
                            {
                              "--progress": "50%",
                            } as React.CSSProperties
                          }
                        />
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
                    <Box className="py-5">
                      <Heading
                        size={"4"}
                        className=" py-3 font-medium text-gray-11"
                      >
                        Attachments
                      </Heading>

                      <Box className="space-y-4">
                        {attachments.map((attachment) => (
                          <Flex
                            align={"center"}
                            key={attachment.id}
                            className=" rounded-lg bg-gray-3 p-3 transition-colors dark:bg-gray-4"
                          >
                            {attachment.type === "image" ? (
                              <Box className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                  src={attachment.thumbnailUrl}
                                  alt={attachment.name}
                                  className="h-full w-full object-cover"
                                />
                              </Box>
                            ) : (
                              <Box className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-gray-8">
                                <FileArchive className="h-8 w-8 text-gray-8" />
                              </Box>
                            )}

                            <div className="ml-4 flex-grow">
                              <h3 className="font-medium text-gray-12 text-sm">
                                {attachment.name}
                              </h3>
                              <div className="mt-1 text-gray-11 text-xs">
                                <span>Uploaded on {attachment.uploadDate}</span>
                                <span className="mx-2">•</span>
                              </div>
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
                              <Button
                                variant="soft"
                                className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-4 dark:hover:bg-gray-7"
                              >
                                <Trash2 className="h-5 w-5 text-gray-12" />
                              </Button>
                            </div>
                          </Flex>
                        ))}
                      </Box>

                      <IconButton className="mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary ">
                        <Plus />
                        <span>Add Attachment</span>
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
                                    <Flex
                                      align={"center"}
                                      className="mb-1 gap-2"
                                    >
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
                  {!kanbanFilter && (
                    <Box className="relative h-full w-72 flex-shrink-0 pt-24">
                      <IconButton
                        color="gray"
                        variant="soft"
                        onClick={handleDrawerClose}
                        className="absolute top-5 right-3 ml-8 flex h-8 w-8 items-center justify-center rounded-md"
                      >
                        <X aria-hidden="true" />
                        <span className="sr-only">Close</span>
                      </IconButton>

                      <Box className="space-y-3 p-4 ">
                        <Heading
                          size={"4"}
                          className=" font-medium text-gray-10"
                        >
                          CREATED BY
                        </Heading>
                        <Flex className="gap-2" align={"center"}>
                          <Avatar
                            src={KanbanImages.user1}
                            className="h-8 w-8"
                          />
                          <p>Regina Cooper</p>
                        </Flex>
                      </Box>
                      <Box className="space-y-3 border-gray-6 border-t-2 p-4 py-3">
                        <Flex justify={"between"} align={"center"}>
                          <Heading
                            size={"4"}
                            className=" font-medium text-gray-10"
                          >
                            ASSIGNED TO
                          </Heading>
                          <ComboBox
                            options={assignData}
                            onValueChange={setSelectedMemebers}
                            defaultValue={selectedMemebers}
                            placeholder="Find Person..."
                            title="Assign To"
                          />
                        </Flex>
                        <Flex className="gap-1">
                          <Avatar
                            src={KanbanImages.user1}
                            className="h-8 w-8"
                          />
                          <Avatar
                            src={KanbanImages.user2}
                            className="h-8 w-8"
                          />
                          <Avatar
                            src={KanbanImages.user1}
                            className="h-8 w-8"
                          />
                        </Flex>
                      </Box>
                      <Box className="space-y-3 border-gray-6 border-t-2 p-4 py-3 ">
                        {/* DUE DATE */}
                        <Heading
                          size={"4"}
                          className=" font-medium text-gray-10"
                        >
                          DUE DATE
                        </Heading>
                        <SmartDatetimeInput
                          value={selectedDate}
                          onValueChange={handleDateChange}
                          placeholder="Enter a date and time"
                        />
                      </Box>
                      <Box className="space-y-3 border-gray-6 border-t-2 p-4 py-3 ">
                        {/* lables */}

                        <Flex justify={"between"} align={"center"}>
                          <Heading
                            size={"4"}
                            className=" font-medium text-gray-10"
                          >
                            LABELS
                          </Heading>
                          <ComboBox
                            options={allLabelsData}
                            onValueChange={setSelectedLabes}
                            defaultValue={selectedLabels}
                            placeholder="Search Label"
                            title="Labels"
                            addNewLabel={true}
                            isLabelFormOpen={isLabelFormOpen}
                            formRef={formRef}
                            setIsLabelFormOpen={setIsLabelFormOpen}
                            handleAddNewLabel={handleAddNewLabel}
                            labelColor={labelColor}
                            setLabelColor={setLabelColor}
                          />
                        </Flex>
                        <Flex gap="2" wrap={"wrap"}>
                          {allLabelsData?.map((label) => (
                            <Badge
                              color={label.color as ExtendedColorType}
                              variant="solid"
                              key={label.value}
                              className="rounded-md p-1.5 px-2.5"
                            >
                              {label.label}
                            </Badge>
                          ))}
                        </Flex>
                      </Box>
                      <Box className="space-y-3 border-gray-6 border-t-2 p-4 py-3 ">
                        <Box>
                          <Heading
                            size={"3"}
                            className=" font-medium text-gray-12"
                          >
                            Created
                          </Heading>
                          <Text as="span" className="text-gray-9">
                            January 2, 2020 4:30 PM
                          </Text>
                        </Box>
                        <Box>
                          <Heading
                            size={"3"}
                            className=" font-medium text-gray-12"
                          >
                            Updated
                          </Heading>
                          <Text as="span" className="text-gray-9">
                            January 2, 2020 4:55 PM
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Flex>
              </ScrollArea>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
