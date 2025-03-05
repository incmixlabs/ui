import {
  Box,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Progress,
  Text,
} from "@radix-ui/themes"
import {
  CalendarDays,
  DollarSign,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react"
import { Reorder, motion, useDragControls, useMotionValue } from "motion/react"
import type { DragControls } from "motion/react"
import type React from "react"
import { useState } from "react"
import { ProjectsImages } from "../images"

function ProjectChecklist() {
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
  return (
    <>
      <Box>
        <Box className="gap-2 space-y-2 py-2">
          <Heading
            size={"3"}
            className="flex w-full items-center gap-1 font-medium text-gray-11 uppercase"
          >
            <span>CheckList</span>
            <span>
              (
              {Math.round(
                (checkListData.filter((item) => item.checked).length /
                  checkListData.length) *
                  100
              )}
              %)
            </span>
          </Heading>
          <Progress
            value={
              (checkListData.filter((item) => item.checked).length /
                checkListData.length) *
              100
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
                  checked={item.checked}
                  onCheckedChange={(checked) => {
                    setChecklistData(
                      checkListData.map((i) =>
                        i.id === item.id ? { ...i, checked: !!checked } : i
                      )
                    )
                  }}
                  className="h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white "
                />
                <h1 className="text-gray-12 text-sm ">{item.title}</h1>
              </Flex>
            </Item>
          ))}
        </Reorder.Group>
        <IconButton
          onClick={() => {
            const newItem = {
              id: Date.now(),
              title: "New Item",
              date: new Date().toLocaleDateString(),
              checked: false,
            }
            setChecklistData([...checkListData, newItem])
          }}
          className="mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary "
        >
          <Plus />
          <span>Add Checklist Item</span>
        </IconButton>
      </Box>
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

export default ProjectChecklist
