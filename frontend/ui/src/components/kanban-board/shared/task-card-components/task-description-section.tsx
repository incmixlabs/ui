// task-card-components/task-description-section.tsx
import { Save, Edit3 } from "lucide-react"
import type { TaskDescriptionSectionProps } from "./utils/types"
import { Box, Button, Flex, Heading, IconButton, Text, TextArea } from "@incmix/ui"

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
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button 
              onClick={onStopEdit}
              color="red"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md"
            >
              Cancel
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box
          className="group cursor-pointer hover:bg-gray-5  px-1 rounded-lg relative transition-colors"
          onClick={onStartEdit}
        >
          {currentTask.description ? (
            <Text className="text-gray-11  whitespace-pre-wrap leading-relaxed">
              {currentTask.description}
            </Text>
          ) : (
            <Text className="text-gray-5 italic">Click to add a description...</Text>
          )}
          <IconButton 
            onClick={onStartEdit}
            color="blue"
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 h-8 w-8 p-0 rounded-md flex items-center justify-center"
          >
            <Edit3 className="h-3 w-3" />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}