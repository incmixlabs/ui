import React, { useEffect, useState } from "react";
import { EyeIcon } from "../icons/eye";
import X from "../icons/x";
import { Avatar } from "../avatar";
import { KanbanImages } from "./images";
import { ComboBox } from "./combo-box";
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
} from "@radix-ui/themes";
import {
  useMotionValue,
  Reorder,
  useDragControls,
  motion,
  MotionValue,
  animate,
  DragControls,
  AnimatePresence,
} from "motion/react";
import { IconButton } from "../button";
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
} from "lucide-react";
import { TaskIcon } from "../icons/task";
import { SmartDatetimeInput } from "../datetime-picker";
import { assignData, attachments, commentsData, lablesData } from "./data";
import { useKanbanDrawer } from "@hooks/use-kanban-drawer";
import { cn } from "@utils";

export default function TaskCardDrawer({
  kanbanFilter,
}: {
  kanbanFilter: boolean;
}) {
  const { taskId, handleDrawerOpen, handleDrawerClose } = useKanbanDrawer();
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
  ]);
  const [comment, setComment] = useState("");

  const [selectedMemebers, setSelectedMemebers] = useState<string[]>([
    "regina-cooper",
  ]);
  const [selectedLabels, setSelectedLabes] = useState<string[]>([
    "design",
    "frontend",
    "backend",
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <>
      <AnimatePresence>
        {Boolean(taskId) && (
          <div
            className={cn(
              kanbanFilter
                ? "relative z-50  2xl:w-[40rem] w-[30rem]  h-[90vh] flex-shrink-0 rounded-xl"
                : "fixed top-0 left-0 h-screen w-screen z-50",
            )}
            role="dialog"
            aria-modal="true"
          >
            {!kanbanFilter && (
              <motion.div
                className="overlay absolute h-full w-full bg-black/40 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleDrawerClose}
                role="button"
                aria-label="Close drawer"
              />
            )}
            <>
              <motion.div
                className={cn(
                  "rounded-lg dark:bg-gray-4 bg-gray-3 cursor-default  ",
                  kanbanFilter
                    ? " h-full w-full"
                    : "  w-[52rem] absolute top-[1%] bottom-[1%]   right-[1.5%] h-[98%] ",
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
                                className="flex items-center   rounded-md font-semibold bg-transparent"
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
                              className="ml-2 h-8 w-8 rounded-md flex items-center justify-center"
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
                                className="text-gray-11 font-medium"
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
                            <Button className="bg-green-500 px-4 text-white py-1 rounded-md">
                              Design
                            </Button>
                            <Button className="bg-blue-500 px-4 text-white py-1 rounded-md">
                              Frontend
                            </Button>
                            <Button className="bg-orange-500 px-4 text-white py-1 rounded-md">
                              Backend
                            </Button>
                            <ComboBox
                              options={lablesData}
                              onValueChange={setSelectedLabes}
                              defaultValue={selectedLabels}
                              placeholder="Search Label"
                              title="Labels"
                              addNewLabel={true}
                            />
                          </Flex>

                          {/* DUE DATE */}
                          <h2 className=" text-gray-500 font-medium">
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
                        <Heading
                          size={"4"}
                          className="font-medium text-gray-11"
                        >
                          DESCRIPTION
                        </Heading>
                        <Text as="p" className="text-gray-10 leading-[120%]">
                          We need to develop several options (Inbox template,
                          Chat template, tasks template, Projects template) of
                          cool user interface design templates - to carefully
                          work out the smallest details.
                        </Text>
                      </Box>

                      <Box>
                        <Box className="gap-2 space-y-2 py-2">
                          <Heading
                            size={"3"}
                            className="flex w-full items-center font-medium gap-1 text-gray-11 uppercase"
                          >
                            <span>CheckList</span>
                            <span>(50%)</span>
                          </Heading>
                          <Box
                            className="relative flex h-2 w-full items-center gap-1 rounded-full bg-gray-200 before:absolute before:top-0 before:left-0 before:h-2 before:w-[var(--progress)] before:rounded-full before:bg-secondary"
                            style={
                              {
                                "--progress": `50%`,
                              } as React.CSSProperties
                            }
                          />
                        </Box>
                        <Reorder.Group
                          axis="y"
                          values={checkListData}
                          onReorder={setChecklistData}
                          className="space-y-1 w-full  "
                        >
                          {checkListData.map((item) => (
                            <Item key={item.id} item={item}>
                              <Flex className="gap-2">
                                <Checkbox
                                  size={"3"}
                                  className="w-5 h-5 text-secondary border-black border group-hover:bg-white bg-gray-12 rounded-md "
                                />
                                <h1 className="text-sm text-gray-12  ">
                                  {item.title}
                                </h1>
                              </Flex>
                            </Item>
                          ))}
                        </Reorder.Group>
                        <IconButton className="w-fit p-1 gap-2 bg-transparent mt-4  text-secondary font-semibold ">
                          <Plus />
                          <span>Add Checklist Item</span>
                        </IconButton>
                      </Box>
                      <Box className="py-5">
                        <Heading
                          size={"4"}
                          className=" text-gray-11 font-medium py-3"
                        >
                          Attachments
                        </Heading>

                        <Box className="space-y-4">
                          {attachments.map((attachment) => (
                            <Flex
                              align={"center"}
                              key={attachment.id}
                              className=" p-3 dark:bg-gray-4 bg-gray-3 rounded-lg  transition-colors"
                            >
                              {attachment.type === "image" ? (
                                <Box className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={attachment.thumbnailUrl}
                                    alt={attachment.name}
                                    className="w-full h-full object-cover"
                                  />
                                </Box>
                              ) : (
                                <Box className="w-16 h-16 border border-gray-8 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FileArchive className="h-8 w-8 text-gray-8" />
                                </Box>
                              )}

                              <div className="ml-4 flex-grow">
                                <h3 className="text-sm font-medium text-gray-12">
                                  {attachment.name}
                                </h3>
                                <div className="text-xs text-gray-11 mt-1">
                                  <span>
                                    Uploaded on {attachment.uploadDate}
                                  </span>
                                  <span className="mx-2">•</span>
                                </div>
                                <p className="text-sm  text-gray-11 pt-1">
                                  {attachment.size}
                                </p>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="soft"
                                  className="p-2 h-9 cursor-pointer dark:hover:bg-gray-7 hover:bg-gray-4 bg-transparent rounded-full transition-colors"
                                >
                                  <Download className="w-5 h-5 text-gray-12" />
                                </Button>
                                <Button
                                  variant="soft"
                                  className="p-2 h-9 cursor-pointer dark:hover:bg-gray-7 hover:bg-gray-4  bg-transparent   rounded-full transition-colors"
                                >
                                  <Trash2 className="w-5 h-5 text-gray-12" />
                                </Button>
                              </div>
                            </Flex>
                          ))}
                        </Box>

                        <IconButton className="w-fit p-1 gap-2 bg-transparent mt-4  text-secondary font-semibold ">
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
                              className="py-3 inline-block  font-medium  data-[state=active]:text-secondary data-[state=active]:border-secondary hover:bg-transparent cursor-pointer "
                            >
                              COMMENTS
                            </Tabs.Trigger>
                            <Tabs.Trigger
                              value="activity"
                              className="py-3 inline-block   font-medium  cursor-pointer  data-[state=active]:text-secondary data-[state=active]:border-secondary hover:bg-transparent "
                            >
                              ACTIVITY
                            </Tabs.Trigger>
                          </Tabs.List>

                          <Box pt="3">
                            <Tabs.Content value="comments" className="py-4">
                              <form
                                onSubmit={handleSubmit}
                                className="dark:bg-gray-4 bg-gray-2 rounded-lg shadow-sm border border-gray-5"
                              >
                                <Box className="p-2">
                                  <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add Comment..."
                                    className="w-full min-h-[70px] resize-none dark:bg-gray-4 bg-gray-2 border-0 focus:ring-0 text-gray-12 placeholder-gray-400 text-sm"
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
                                    className="px-4 py-2 text-white text-sm font-medium rounded-md  transition-colors"
                                    disabled={!comment.trim()}
                                  >
                                    Comment
                                  </Button>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      type="button"
                                      variant="soft"
                                      className="p-2 h-9 cursor-pointer dark:hover:bg-gray-7 hover:bg-gray-3 bg-transparent   rounded-full transition-colors"
                                      aria-label="Attach file"
                                    >
                                      <Paperclip className="w-5 h-5 text-gray-12" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="soft"
                                      className="p-2 h-9 cursor-pointer dark:hover:bg-gray-7 hover:bg-gray-3 bg-transparent   rounded-full transition-colors"
                                      aria-label="Add emoji"
                                    >
                                      <Smile className="w-5 h-5 text-gray-12" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="soft"
                                      className="p-2 h-9 cursor-pointer dark:hover:bg-gray-7 hover:bg-gray-3 bg-transparent   rounded-full transition-colors"
                                      aria-label="Upload image"
                                    >
                                      <Image className="w-5 h-5 text-gray-12" />
                                    </Button>
                                  </div>
                                </Flex>
                              </form>
                              <Box className="py-4 space-y-4">
                                {commentsData.map((comment) => (
                                  <div key={comment.id} className="flex gap-4">
                                    <img
                                      src={comment.user.avatar}
                                      alt={comment.user.name}
                                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                      <Flex
                                        align={"center"}
                                        className="gap-2 mb-1"
                                      >
                                        <Heading
                                          size={"3"}
                                          className="font-medium text-gray-12"
                                        >
                                          {comment.user.name}
                                        </Heading>
                                        <Text
                                          as="span"
                                          className="text-sm text-gray-500"
                                        >
                                          {comment.timestamp}
                                        </Text>
                                      </Flex>
                                      <Text
                                        as="p"
                                        className="text-gray-11 whitespace-pre-line"
                                      >
                                        {comment.text}
                                      </Text>

                                      {comment.images && (
                                        <Flex className="mt-3" gap={"2"}>
                                          {comment.images.map(
                                            (image, index) => (
                                              <div
                                                key={index}
                                                className="relative group"
                                              >
                                                <img
                                                  src={image}
                                                  alt={`Attachment ${index + 1}`}
                                                  className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                {index === 3 &&
                                                  (comment.images?.length ??
                                                    0) > 3 && (
                                                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                                                      <span className="text-white font-medium">
                                                        +3
                                                      </span>
                                                    </div>
                                                  )}
                                              </div>
                                            ),
                                          )}
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
                      <Box className="w-72 flex-shrink-0  h-full relative pt-24">
                        <IconButton
                          color="gray"
                          variant="soft"
                          onClick={handleDrawerClose}
                          className="absolute top-5 right-3  ml-8 h-8 w-8 rounded-md flex items-center justify-center"
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
                        <Box className="space-y-3 py-3 border-t-2 p-4 border-gray-6">
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
                        <Box className="space-y-3 border-t-2 p-4 border-gray-6 py-3  ">
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
                        <Box className="space-y-3 border-t-2 p-4 border-gray-6 py-3  ">
                          {/* lables */}

                          <Flex justify={"between"} align={"center"}>
                            <Heading
                              size={"4"}
                              className=" font-medium text-gray-10"
                            >
                              LABELS
                            </Heading>
                            <ComboBox
                              options={lablesData}
                              onValueChange={setSelectedLabes}
                              defaultValue={selectedLabels}
                              placeholder="Search Label"
                              title="Labels"
                              addNewLabel={true}
                            />
                          </Flex>
                          <Flex gap="2" wrap={"wrap"}>
                            <Button
                              color="orange"
                              variant="solid"
                              className="px-4  py-1 rounded-md"
                            >
                              Design
                            </Button>
                            <Button className=" px-4 py-1 rounded-md">
                              Frontend
                            </Button>
                            <Button
                              color="cyan"
                              variant="solid"
                              className=" px-4  py-1 rounded-md"
                            >
                              Backend
                            </Button>
                          </Flex>
                        </Box>
                        <Box className="space-y-3 border-t-2 p-4 border-gray-6 py-3  ">
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
            </>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
interface ChecklistItem {
  id: number;
  title: string;
  date: string;
  checked: boolean;
}
const Item = ({
  children,
  item,
}: {
  children: React.ReactNode;
  item: ChecklistItem;
}) => {
  const y = useMotionValue(0);
  //   const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="flex group justify-between items-center w-full p-3  dark:bg-gray-4 bg-gray-3  rounded-md"
    >
      {children}
      <Flex className="gap-3" align={"center"}>
        <ReorderIcon dragControls={dragControls} />
        <IconButton className="bg-transparent group-hover:opacity-100 opacity-0">
          <Trash2 className="w-5 h-5  text-gray-12" />
        </IconButton>
      </Flex>
    </Reorder.Item>
  );
};

interface Props {
  dragControls: DragControls;
}
export function ReorderIcon({ dragControls }: Props) {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      onPointerDown={(e) => {
        e.preventDefault();
        dragControls.start(e);
      }}
    >
      <GripVertical className=" group-hover:opacity-100 opacity-0 w-7 h-7  text-gray-12 cursor-grab active:cursor-grabbing" />
    </motion.div>
  );
}
