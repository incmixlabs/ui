import { Button } from "@incmix/ui"

interface GroupControlsProps {
  onGroup: () => void
  onUngroup: () => void
  selectedCount: number
  hasGroups: boolean
}

export function GroupControls({ onGroup, onUngroup, selectedCount, hasGroups }: GroupControlsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
      <Button
        variant="outline"
        onClick={onGroup}
        disabled={selectedCount < 2}
        className={selectedCount < 2 ? "opacity-50" : ""}
      >
        Group ({selectedCount})
      </Button>
      <Button
        variant="outline"
        onClick={onUngroup}
        disabled={!hasGroups}
        className={!hasGroups ? "opacity-50" : ""}
      >
        Ungroup
      </Button>
    </div>
  )
}
