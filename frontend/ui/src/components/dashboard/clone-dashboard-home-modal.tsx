import {
  Button,
  Dialog,
  Flex,
  Input,
  Label,
  EditIcon,
  Tooltip,
  CloneIcon,
  toast
} from "@incmix/ui/base";
import {  useDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";


export function CloneDashboardHomeModal({dashboardId}: {dashboardId: string}) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { cloneHomeDashboard, getDashboards } = useDashboardStore()
  const navigate = useNavigate();




  const handleCloneHomeDash = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const newDashboardId = await cloneHomeDashboard(dashboardId, name.trim())

      setName("");
      setIsOpen(false);
      toast.success("Dashboard cloned successfully.");

      navigate({
        to: "/dashboard/$projectId",
        params: { projectId: newDashboardId },
      });
      await getDashboards()
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
        <Button onClick={() => setIsOpen(true)} color="orange">
        <CloneIcon size={20}/>
        <span className="sr-only">Clone</span>
        </Button>
      </Tooltip>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="w-[26rem]">
          <Dialog.Title>Clone Dashboard</Dialog.Title>
          <form onSubmit={handleCloneHomeDash}>
            <Flex direction="column" gap="4" className="mt-4">
              <Label htmlFor="dashboard-name">Dashboard Name</Label>
              <Input
                placeholder="e.g. Dashboard Site"
                className="h-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Flex gap="4" justify="end" align={"center"} className="mt-4">
                <Dialog.Close>
                  <Button variant="ghost" className="h-8">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit" className="h-8">
                  Clone
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}





