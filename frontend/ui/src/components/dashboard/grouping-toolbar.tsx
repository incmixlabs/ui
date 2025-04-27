import { useSelectionStore } from "@hooks"
import { Box, Button, Flex } from "@incmix/ui/base"
import { X, LayoutGridIcon as LayoutHorizontal, LayoutGridIcon as LayoutVertical } from "lucide-react"

interface GroupingToolbarProps {
  onGroupVertical: () => void
  onGroupHorizontal: () => void
}
export function GroupingToolbar({ onGroupVertical, onGroupHorizontal }: GroupingToolbarProps) {
  const { selectedWidgets, clearSelection } = useSelectionStore()
  const selectedCount = selectedWidgets.length

  return (
    <Box className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-white p-2 shadow-lg">
      <Flex align={"center"} gap={"4"}>
        <Box as="span" className="text-sm font-medium">{selectedCount} widgets selected</Box>
        <Button  onClick={onGroupVertical} disabled={selectedCount < 2} className="flex items-center gap-2">
          <LayoutVertical size={16} />
          Group Vertically
        </Button>
        <Button  onClick={onGroupHorizontal} disabled={selectedCount < 2} className="flex items-center gap-2">
          <LayoutHorizontal size={16} />
          Group Horizontally
        </Button>
        <Button variant="outline" onClick={clearSelection} className="flex items-center gap-2">
          <X size={16} />
          Cancel
        </Button>
      </Flex>
    </Box>
  )
}
