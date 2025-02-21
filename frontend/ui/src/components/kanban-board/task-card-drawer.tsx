import React, { useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent } from "../sheet";
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
  Popover,
  ScrollArea,
  Tabs,
} from "@radix-ui/themes";
import {
  useMotionValue,
  Reorder,
  useDragControls,
  motion,
  MotionValue,
  animate,
  DragControls,
} from "motion/react";
import { IconButton } from "../button";
import {
  Check,
  Delete,
  Download,
  Ellipsis,
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
import { Calendar } from "../calendar";
import { SmartDatetimeInput } from "../datetime-picker";
import { ZipIcon } from "../icons/zip-icon";
import { assignData, attachments, commentsData, lablesData } from "./data";

export default function TaskCardDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
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
    console.log("Selected date:", date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    console.log("Comment submitted:", comment);
    setComment("");
  };

  const handleToggleCheck = (itemId: number) => {
    console.log(itemId);

    setChecklistData(
      checkListData.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item,
      ),
    );
  };
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          hideCloseIcon={true}
          className="top-[1%] bottom-[1%] h-[98%] rounded-lg right-2  "
        >
          <ScrollArea>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <IconButton className="flex items-center gap-1 bg-blue-500 p-2 rounded-md font-semibold text-white">
                  <Check size={16} />
                  Complete
                </IconButton>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="">
                    <Button
                      variant="solid"
                      className="p-2 gap-1 bg-gray-100 border border-black  rounded-md "
                    >
                      <EyeIcon className="text-black" />
                      <span>2</span>
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    className=" z-[88] "
                    color="gray"
                    variant="soft"
                  >
                    <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘ D">
                      Duplicate
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌘ N">
                      Archive
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
              <div className="flex gap-2">
                <IconButton className="flex items-center gap-1  p-2 rounded-md font-semibold text-gray-600">
                  <Link size={20} />
                </IconButton>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="">
                    <IconButton className="flex items-center gap-1  p-2 rounded-md font-semibold text-gray-600">
                      <Ellipsis size={20} />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    color="gray"
                    variant="soft"
                    highContrast
                    alignOffset={-40}
                    className=" z-[88] w-36 "
                  >
                    <DropdownMenu.Item className=" justify-start px-1  ">
                      <TaskIcon /> Task
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className=" justify-start  px-1">
                      <TaskIcon /> Board
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className=" justify-start  px-1">
                      <TaskIcon />
                      Project
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className=" justify-start  px-1">
                      <TaskIcon />
                      Invite
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                <SheetClose className="bg-gray-100 ml-8 w-8 h-8 rounded-md flex items-center justify-center">
                  <X aria-hidden="true" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>
            </div>

            {/* template progress */}
            <h1 className="text-xl  pt-4 pb-2 font-semibold">
              Template Progress
            </h1>
            <Box className="py-2 space-y-3 ">
              <Grid columns="2">
                <div className="space-y-3">
                  <h2 className=" text-gray-500 font-medium">ASSIGNED TO</h2>
                  <Flex className="gap-1">
                    <Avatar src={KanbanImages.user1} className="w-8 h-8" />
                    <Avatar src={KanbanImages.user2} className="w-8 h-8" />
                    <Avatar src={KanbanImages.user1} className="w-8 h-8" />
                    <ComboBox
                      options={assignData}
                      onValueChange={setSelectedMemebers}
                      defaultValue={selectedMemebers}
                      placeholder="Find Person..."
                      title="Assign To"
                    />
                    {/* <Popover.Root>
                    <Popover.Trigger>
                      <IconButton className="bg-gray-100  w-8 h-8 rounded-full flex items-center justify-center">
                        <Plus aria-hidden="true" />
                        <span className="sr-only">Close</span>
                      </IconButton>
                    </Popover.Trigger>
                    <Popover.Content
                      width="280px"
                      className=" z-[88] space-y-2 "
                    >
                      <h1 className="font-medium">Assign To</h1>
                      <Flex gap="3">
                        <Box flexGrow="1" className="space-y-3">
                          <div className="relative ">
                            <IconButton className="bg-transparent  text-gray-400 absolute top-1">
                              <Search size={20} />
                            </IconButton>
                            <Input
                              placeholder="Find Person..."
                              className="bg-gray-100 pl-8"
                            />
                          </div>
                          <Flex gap="2">
                            <Flex gap={"2"} align={"center"}>
                              <Avatar
                                src={KanbanImages.user1}
                                className="w-8 h-8"
                              />
                              <span>Regina Cooper</span>
                            </Flex>
                          </Flex>
                        </Box>
                      </Flex>
                    </Popover.Content>
                  </Popover.Root> */}
                  </Flex>
                </div>
                <div className="space-y-3">
                  <h2 className=" text-gray-500 font-medium">CREATED BY</h2>
                  <Flex className="gap-2">
                    <Flex className="gap-1" align={"center"}>
                      <Avatar src={KanbanImages.user1} className="w-8 h-8" />
                      <p>Regina Cooper</p>
                    </Flex>
                  </Flex>
                </div>
              </Grid>
              {/* lables */}
              <h2 className=" text-gray-500 font-medium  ">LABELS</h2>
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
                  addNewLebel={true}
                />
              </Flex>

              {/* DUE DATE */}
              <h2 className=" text-gray-500 font-medium">DUE DATE </h2>
              <SmartDatetimeInput
                value={selectedDate}
                onValueChange={handleDateChange}
                placeholder="Enter a date and time"
              />
            </Box>
            <Box className="space-y-1 py-8">
              <h2 className=" text-gray-500 font-medium  ">DESCRIPTION</h2>
              <p className="text-gray-500 leading-[120%]">
                We need to develop several options (Inbox template, Chat
                template, tasks template, Projects template) of cool user
                interface design templates - to carefully work out the smallest
                details.
              </p>
            </Box>

            <Box>
              <div className="gap-2 space-y-2 py-2">
                <div className="flex w-full items-center font-medium gap-1 text-zinc-500 uppercase">
                  <span>CheckList</span>
                  <span>(50%)</span>
                </div>
                <div
                  className="relative flex h-2 w-full items-center gap-1 rounded-full bg-gray-200 before:absolute before:top-0 before:left-0 before:h-2 before:w-[var(--progress)] before:rounded-full before:bg-secondary"
                  style={
                    {
                      "--progress": `50%`,
                    } as React.CSSProperties
                  }
                />
              </div>
              <Reorder.Group
                axis="y"
                values={checkListData}
                onReorder={setChecklistData}
                className="space-y-1 w-full max-w-md mx-auto"
              >
                {checkListData.map((item) => (
                  <Item key={item.id} item={item}>
                    <Flex className="gap-2">
                      <Checkbox
                        size={"3"}
                        className="w-5 h-5 text-secondary border-black border group-hover:bg-white bg-secondary-3 rounded-md "
                      />
                      <h1 className="text-sm text-black">{item.title}</h1>
                    </Flex>
                  </Item>
                ))}
              </Reorder.Group>
              <div className="p-4">
                <IconButton className="gap-2 text-secondary font-semibold flex">
                  <Plus />
                  <span>Add Checklist Item</span>
                </IconButton>
              </div>
            </Box>
            <Box className="py-5">
              {/* <h1 className="text-xl  pt-4 pb-1 font-semibold">Attachments</h1> */}
              <h2 className=" text-gray-500 font-medium py-3">Attachments</h2>

              <div className="space-y-4">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {attachment.type === "image" ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={attachment.thumbnailUrl}
                          alt={attachment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 border border-gray-4 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileArchive className="w-8 h-8 text-gray-6" />
                        {/* <ZipIcon /> */}
                      </div>
                    )}

                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">
                        {attachment.name}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">
                        <span>Uploaded on {attachment.uploadDate}</span>
                        <span className="mx-2">•</span>
                      </div>
                      <p className="text-sm  text-gray-500 pt-1">
                        {attachment.size}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <Download className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <Trash2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <IconButton className="gap-2 mt-4 text-secondary font-semibold flex">
                <Plus />
                <span>Add Attachment</span>
              </IconButton>
            </Box>

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
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="p-2">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add Comment..."
                          className="w-full min-h-[70px] resize-none border-0 focus:ring-0 text-gray-700 placeholder-gray-400 text-sm"
                        />
                      </div>

                      <Flex
                        className=" px-4 py-2 "
                        justify={"between"}
                        align={"center"}
                      >
                        <Button
                          type="submit"
                          className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                          disabled={!comment.trim()}
                        >
                          Comment
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Attach file"
                          >
                            <Paperclip className="w-5 h-5 text-gray-500" />
                          </Button>
                          <Button
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Add emoji"
                          >
                            <Smile className="w-5 h-5 text-gray-500" />
                          </Button>
                          <Button
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Upload image"
                          >
                            <Image className="w-5 h-5 text-gray-500" />
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
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900">
                                {comment.user.name}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">
                              {comment.text}
                            </p>

                            {comment.images && (
                              <div className="mt-3 flex gap-2">
                                {comment.images.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={image}
                                      alt={`Attachment ${index + 1}`}
                                      className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    {index === 3 &&
                                      comment.images!.length > 3 && (
                                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                                          <span className="text-white font-medium">
                                            +3
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </div>
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
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

const Item = ({ children, item }: { children: React.ReactNode; item: any }) => {
  const y = useMotionValue(0);
  //   const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="flex group justify-between items-center w-full p-3 text-primary-foreground  bg-white  hover:bg-gray-200 border rounded-md"
    >
      {children}
      <Flex className="gap-3" align={"center"}>
        <ReorderIcon dragControls={dragControls} />
        <IconButton>
          <Trash2 className="w-5 h-5 group-hover:text-gray-800 text-white" />
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
      <GripVertical className=" w-7 h-7 group-hover:text-gray-800 text-white cursor-grab active:cursor-grabbing" />
    </motion.div>
  );
}
