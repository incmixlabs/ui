import {
  Button,
  toast,
  Tooltip,
  DeleteIcon
} from "@incmix/ui/base";
import { useDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";

export function DeleteDashboard({ dashboardId }: { dashboardId: string }) {
  const { deleteDashboard } = useDashboardStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDashboard(dashboardId);
      // Show success toast
      toast.success(`Dashboard "${dashboardId}" deleted successfully!`);
      navigate({
        to: "/dashboard/home",
      });
    } catch (error) {
      toast.error("Failed to delete dashboard", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while deleting the dashboard.",
      });
    }
  };

  return (
    <>
      <Tooltip content={"Delete Dashboard"}>
        <Button onClick={handleDelete} color="red">
          <DeleteIcon size={20} />
        </Button>
      </Tooltip>
    </>
  );
}
