import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  ScrollArea,
  Text,
} from "@/base"
// task-card-components/task-title-section.tsx
import { Check, Edit3, Save, X } from "lucide-react"
import type { TaskTitleSectionProps } from "./utils/types"

export function TaskTitleSection({
  currentTask,
  isEditing,
  editValue,
  onEditChange,
  onStartEdit,
  onStopEdit,
  onSave,
}: TaskTitleSectionProps) {
  const handleSave = () => {
    onSave()
    onStopEdit()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") onStopEdit()
  }

  return (
    <Box className="py-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            className="flex-1 border-0 bg-gray-5 font-semibold text-2xl "
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <IconButton
            onClick={handleSave}
            color="blue"
            className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors"
          >
            <Check className="h-4 w-4" />
          </IconButton>
          <IconButton
            onClick={onStopEdit}
            color="red"
            className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors"
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>
      ) : (
        <Flex gap={"4"} align={"center"} className="group">
          <Heading
            size={"4"}
            className="-m-2 flex-1 cursor-pointer rounded-md p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-2"
            onClick={onStartEdit}
          >
            {currentTask.name}
          </Heading>
          <IconButton
            onClick={onStartEdit}
            color="blue"
            className="flex h-8 w-8 items-center justify-center rounded-md p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Edit3 className="h-4 w-4" />
          </IconButton>
        </Flex>
      )}
    </Box>
  )
}
