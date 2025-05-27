import {
  Button,
  toast,
  Tooltip,
  DeleteIcon
} from "@incmix/ui/base";
import { useRealDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

export function DeleteDashboard({ dashboardId }: { dashboardId: string }) {
  const { deleteDashboard } = useRealDashboardStore();
  const navigate = useNavigate();

  const handleCreate = async () => {
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
        <Button onClick={handleCreate} color="red">
          <DeleteIcon size={20} />
        </Button>
      </Tooltip>
    </>
  );
}
