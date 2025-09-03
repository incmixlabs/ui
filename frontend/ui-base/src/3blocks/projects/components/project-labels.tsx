import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tabs,
  Badge,
  Popover,
} from "@/base"
import { InlineEditableField } from "./inline-editable-field"
import ColorPicker from "../../../2elements/color-picker"

// Label type based on schema
type Label = {
  id: string
  projectId: string
  type: "status" | "priority"
  name: string
  color: string
  order: number
  description: string
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

interface ProjectLabelsProps {
  mockData?: {
    projectId: string
    labels: Label[]
  }
  mockOperations?: {
    updateLabel: {
      mutateAsync: (data: any) => Promise<void>
      isLoading: boolean
    }
  }
}

export default function ProjectLabels({ 
  mockData, 
  mockOperations 
}: ProjectLabelsProps = {}) {
  // For now, we'll use mock data - later this would use real hooks
  const labels = mockData?.labels || []
  const updateLabel = mockOperations?.updateLabel
  
  const [activeTab, setActiveTab] = useState<"status" | "priority">("status")
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null)
  
  // Separate labels by type
  const statusLabels = labels.filter(label => label.type === "status").sort((a, b) => a.order - b.order)
  const priorityLabels = labels.filter(label => label.type === "priority").sort((a, b) => a.order - b.order)
  
  const handleUpdateLabelName = async (labelId: string, newName: string) => {
    if (!updateLabel || !mockData) return
    
    try {
      await updateLabel.mutateAsync({
        id: labelId,
        updates: { name: newName },
      })
    } catch (error) {
      console.error("Failed to update label name:", error)
    }
  }

  const handleUpdateLabelColor = async (labelId: string, newColor: string) => {
    if (!updateLabel || !mockData) return
    
    try {
      await updateLabel.mutateAsync({
        id: labelId,
        updates: { color: newColor },
      })
    } catch (error) {
      console.error("Failed to update label color:", error)
    }
  }

  const renderLabels = (labelList: Label[]) => {
    if (labelList.length === 0) {
      return (
        <Text className="text-gray-10 text-sm italic">
          No {activeTab} labels found
        </Text>
      )
    }

    return (
      <Box className="space-y-3">
        {labelList.map((label) => (
          <Flex 
            key={label.id} 
            align="center" 
            justify="between"
            className="rounded-lg border border-gray-6 bg-gray-2 p-3 transition-colors hover:border-gray-7 dark:bg-gray-4"
          >
            <Flex align="center" gap="3" className="flex-1">
              {/* Color indicator with ColorPicker */}
              <Box className="relative">
                <Popover.Root 
                  open={openColorPicker === label.id} 
                  onOpenChange={(open) => setOpenColorPicker(open ? label.id : null)}
                >
                  <Popover.Trigger>
                    <button
                      type="button"
                      className="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-6 transition-colors hover:border-gray-8"
                      style={{ backgroundColor: label.color }}
                      title="Click to change color"
                    />
                  </Popover.Trigger>
                  <Popover.Content className="w-auto p-2" side="right">
                    <ColorPicker
                      colorType="base"
                      onColorSelect={(color) => {
                        handleUpdateLabelColor(label.id, color.hex)
                        setOpenColorPicker(null)
                      }}
                      activeColor={label.color}
                    />
                  </Popover.Content>
                </Popover.Root>
              </Box>
              
              {/* Inline editable name */}
              <Box className="flex-1">
                <InlineEditableField
                  value={label.name}
                  onSave={(newName) => handleUpdateLabelName(label.id, newName)}
                  placeholder="Label name..."
                  className="font-medium text-sm"
                  disabled={updateLabel?.isLoading}
                />
              </Box>
            </Flex>
            
            {/* Order badge */}
            <Badge variant="soft" className="text-xs">
              #{label.order + 1}
            </Badge>
          </Flex>
        ))}
      </Box>
    )
  }

  return (
    <Box className="space-y-4">
      <Heading size="4" className="font-medium text-gray-12">
        Labels
      </Heading>
      
      <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as "status" | "priority")}>
        <Tabs.List className="mb-4">
          <Tabs.Trigger value="status" className="flex-1">
            <Flex align="center" gap="2">
              <Text>Status</Text>
              <Badge variant="soft" size="1">
                {statusLabels.length}
              </Badge>
            </Flex>
          </Tabs.Trigger>
          <Tabs.Trigger value="priority" className="flex-1">
            <Flex align="center" gap="2">
              <Text>Priority</Text>
              <Badge variant="soft" size="1">
                {priorityLabels.length}
              </Badge>
            </Flex>
          </Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="status">
          {renderLabels(statusLabels)}
        </Tabs.Content>
        
        <Tabs.Content value="priority">
          {renderLabels(priorityLabels)}
        </Tabs.Content>
      </Tabs.Root>
      
      {/* Instructions for demo */}
      <Text className="text-gray-10 text-xs">
        💡 Click on label names to edit them, click color dots to open the color picker
      </Text>
    </Box>
  )
}
