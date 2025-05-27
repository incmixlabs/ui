import {
  Button,
  CloneIcon,

  toast,
  Tooltip,
} from "@incmix/ui/base";
import { useRealDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";


export function CloneDashboardModal({ dashboardId }: { dashboardId: string }) {
  const { cloneDashboard, getDashboards } = useRealDashboardStore();
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const newDashboardId = await cloneDashboard(dashboardId);
      toast.success(`Dashboard ${dashboardId} cloned successfully!`);
      navigate({
        to: "/dashboard/$projectId",
        params: { projectId: newDashboardId },
      });
      await getDashboards();
    } catch (error) {
      toast.error("Failed to clone dashboard", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while cloning the dashboard.",
      });
    }
  };

  return (
    <>
      <Tooltip content={"Clone Dashboard"}>
        <Button onClick={handleCreate} color="orange">
          <CloneIcon size={20} />
        </Button>
      </Tooltip>
    </>
  );
}
