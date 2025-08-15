import { Box, Button, Flex, Heading, IconButton, Text, TextArea } from "@/base"
// task-card-components/task-description-section.tsx
import { Edit3, Save } from "lucide-react"
import type { TaskDescriptionSectionProps } from "./utils/types"

export function TaskDescriptionSection({
  currentTask,
  isEditing,
  editValue,
  onEditChange,
  onStartEdit,
  onStopEdit,
  onSave,
}: TaskDescriptionSectionProps) {
  const handleSave = () => {
    onSave()
    onStopEdit()
  }

  return (
    <Box className="space-y-4 ">
      <Heading size={"2"} className="text-gray-11 uppercase tracking-wide">
        Description
      </Heading>

      {isEditing ? (
        <Box className="space-y-3">
          <TextArea
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            placeholder="Add a description..."
            rows={4}
            autoFocus
          />
          <Flex gap={"2"}>
            <Button
              onClick={handleSave}
              color="blue"
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-sm"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={onStopEdit}
              color="red"
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-sm"
            >
              Cancel
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box
          className="group relative cursor-pointer rounded-lg px-1 transition-colors hover:bg-gray-5"
          onClick={onStartEdit}
        >
          {currentTask.description ? (
            <Text className="whitespace-pre-wrap text-gray-11 leading-relaxed">
              {currentTask.description}
            </Text>
          ) : (
            <Text className="text-gray-5 italic">
              Click to add a description...
            </Text>
          )}
          <IconButton
            onClick={onStartEdit}
            color="blue"
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-md p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Edit3 className="h-3 w-3" />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
