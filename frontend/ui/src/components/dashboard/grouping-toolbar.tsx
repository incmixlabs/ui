import { Button } from "@incmix/ui/base"
import { Users, X } from "lucide-react"

interface GroupingToolbarProps {
  selectedCount: number
  onGroup: () => void
  onCancelSelection: () => void
}

export function GroupingToolbar({ selectedCount, onGroup, onCancelSelection }: GroupingToolbarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-white p-2 shadow-lg">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{selectedCount} widgets selected</span>
        <Button onClick={onGroup} disabled={selectedCount < 2} className="flex items-center gap-2">
          <Users size={16} />
          Group Widgets
        </Button>
        <Button variant="outline" onClick={onCancelSelection} className="flex items-center gap-2">
          <X size={16} />
          Cancel
        </Button>
      </div>
    </div>
  )
}
