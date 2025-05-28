import {
  Button,
  Dialog,
  Flex,
  Input,
  Label,
  toast,
} from "@incmix/ui/base";
import {  useDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function CreateProjectModal() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { addDashboard, getDashboards } = useDashboardStore()
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const newDashboardId = await addDashboard({
        dashboardName: name.trim(),
        createdBy: "current-user",  
        updatedBy: "current-user",
      })

      setName("");
      setIsOpen(false);

      navigate({
        to: "/dashboard/$projectId",
        params: { projectId: newDashboardId },
      });
      await getDashboards()
    } catch (error) {
      // console.error("Failed to create project:", error);
      toast.error("Failed to create project", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while creating the project.",
      });
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Dashboard</Button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="w-[26rem]">
          <Dialog.Title>Create a New Dashboard</Dialog.Title>
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
                  Create
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
