import { useState } from "react"
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Progress,
  Text,
} from "@/components/base"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import { Reorder, motion, useDragControls, useMotionValue } from "motion/react"
import type { DragControls } from "motion/react"
interface ChecklistItem {
  id: number
  title: string
  date: string
  checked: boolean
}
const Item = ({
  children,
  item,
  setChecklistData,
  checkListData,
}: {
  children: React.ReactNode
  item: ChecklistItem
  setChecklistData: React.Dispatch<React.SetStateAction<TChecklistItem[]>>
  checkListData: TChecklistItem[]
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
        <IconButton
          onClick={() => {
            setChecklistData(checkListData.filter((i) => i.id !== item.id))
          }}
          className="bg-transparent opacity-0 group-hover:opacity-100"
        >
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
type TChecklistItem = {
  id: number
  title: string
  date: string
  checked: boolean
}

export function ProjectChecklist() {
  const [checkListData, setChecklistData] = useState<TChecklistItem[]>([
    {
      id: 1,
      title: "Inbox Template",
      date: "28.8.2024",
      checked: false,
    },
    {
      id: 2,
      title: "Chat Template",
      date: "29.8.2024",
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
      date: "31.8.2024",
      checked: false,
    },
  ])

  const checkedCount = checkListData.filter((item) => item.checked).length
  const totalCount = checkListData.length
  const completionPercentage =
    totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0
  return (
    <>
      <Box>
        <Box className="gap-2 space-y-2 py-2">
          <Heading
            size={"3"}
            className="flex w-full items-center gap-1 font-medium text-gray-11 uppercase"
          >
            <Text>CheckList</Text>
            <Text>
              ({completionPercentage}
              %)
            </Text>
          </Heading>
          <Progress value={completionPercentage} />
        </Box>
        <Reorder.Group
          axis="y"
          values={checkListData}
          onReorder={setChecklistData}
          className="w-full space-y-1 "
        >
          {checkListData.map((item) => (
            <Item
              key={item.id}
              item={item}
              setChecklistData={setChecklistData}
              checkListData={checkListData}
            >
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
                <Heading size={"2"}>{item.title}</Heading>
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
          <Text>Add Checklist Item</Text>
        </IconButton>
      </Box>
    </>
  )
}

export default ProjectChecklist
