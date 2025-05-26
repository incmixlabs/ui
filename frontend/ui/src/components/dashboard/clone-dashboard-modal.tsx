import {
  Button,
  Dialog,
  Flex,
  Input,
  Label,
  toast,
} from "@incmix/ui/base";
import {  useRealDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

export function CloneDashboardModal({dashboardId}:{dashboardId:string}) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { cloneDashboard,getDashboards,error } = useRealDashboardStore()
  const navigate = useNavigate();


  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const newDashboardId = await cloneDashboard(
        dashboardId,
        name.trim()
      )
      setName("");
      setIsOpen(false);
      // Show success toast
      toast.success(`Dashboard "${name.trim()}" cloned successfully!`)
      navigate({
        to: "/dashboard/project/$projectId",
        params: { projectId: newDashboardId },
      });
      await getDashboards()
    } catch (error) {
      toast.error("Failed to clone dashboard", {
        description: error instanceof Error ? error.message : "An unexpected error occurred while cloning the dashboard.",
      })
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} color="orange" >
        Clone <Copy className="w-4 h-4"/>
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="w-[26rem]">
          <Dialog.Title>Clone Dashboard</Dialog.Title>
          <form onSubmit={handleCreate}>
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
