// task-card-components/task-title-section.tsx
import { Save, X, Edit3, Check } from "lucide-react"
import type { TaskTitleSectionProps } from "./utils/types"
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
} from "@incmix/ui";

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
    <Box className="space-y-2 py-5">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            className="text-2xl  font-semibold border-0 bg-gray-5 flex-1 "
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <IconButton 
            onClick={handleSave} 
            color="blue"
            className="h-8 w-8 p-0 rounded-md  flex items-center justify-center transition-colors"
          >
            <Check className="h-4 w-4" />
          </IconButton>
          <IconButton 
            onClick={onStopEdit} 
            color="red"
            className="h-8 w-8 p-0 rounded-md  flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>
      ) : (
        <Flex gap={"4"} align={"center"} className="group">
          <Heading size={"4"}
            className=" cursor-pointer hover:bg-gray-3 dark:hover:bg-gray-2 p-2 rounded-md -m-2 flex-1 transition-colors"
            onClick={onStartEdit}
          >
            {currentTask.name}
          </Heading>
          <IconButton
            onClick={onStartEdit}
            color="blue"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-md flex items-center justify-center"
          >
            <Edit3 className="h-4 w-4" />
          </IconButton>
        </Flex>
      )}
    </Box>
  )
}