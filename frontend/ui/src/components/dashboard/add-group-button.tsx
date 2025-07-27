import { Button, Tooltip } from "@incmix/ui/base";
import { Plus } from "lucide-react";
import { toast } from "@incmix/ui";

interface AddGroupButtonProps {
  isDesktop: boolean;
  className?: string;
  onAddGroup: () => void;
  isEditing: boolean;
}

export function AddGroupButton({
  isDesktop,
  className,
  onAddGroup,
  isEditing,
}: AddGroupButtonProps) {
  const handleAddGroup = () => {
    if (!isEditing) {
      toast.error(
        "Editing mode is disabled. Please enable editing mode to add groups.",
      );
      return;
    }

    onAddGroup();
  };

  return (
    <>
      {isDesktop ? (
        <Button
          onClick={handleAddGroup}
          className={className}
          variant="solid"
          color="green"
          disabled={!isEditing}
        >
          <Plus className="h-4 w-4" />
          Add Group
        </Button>
      ) : (
        <Tooltip
          content={
            "Add Group"
          }
        >
          <Button
            onClick={handleAddGroup}
            className={className}
            variant="solid"
            color="green"
            disabled={!isEditing}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </Tooltip>
      )}
    </>
  );
}
