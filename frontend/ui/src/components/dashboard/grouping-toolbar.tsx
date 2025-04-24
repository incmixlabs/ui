import { useSelectionStore } from "@hooks"
import { Box, Button, Flex } from "@incmix/ui/base"
import { Users, X } from "lucide-react"

interface GroupingToolbarProps {
  onGroup: () => void
}

export function GroupingToolbar({ onGroup }: GroupingToolbarProps) {
  const { selectedWidgets, clearSelection } = useSelectionStore()
  const selectedCount = selectedWidgets.length

  return (
    <Box className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-white p-2 shadow-lg">
      <Flex className="flex items-center gap-4">
        <Box as="span" className="text-sm font-medium">{selectedCount} widgets selected</Box>
        <Button onClick={onGroup} disabled={selectedCount < 2} className="flex items-center gap-2">
          <Users size={16} />
          Group Widgets
        </Button>
        <Button  variant="outline" onClick={clearSelection} className="flex items-center gap-2">
          <X size={16} />
          Cancel
        </Button>
      </Flex>
    </Box>
  )
}
