import {
  Button,
  Dialog,
  Flex,
  Input,
  Label,
  EditIcon,
  Tooltip,
  toast,
  Box
} from "@incmix/ui/base";
import {  useDashboardStore } from "@incmix/store";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";


export function EditDashboard({dashboardId}: {dashboardId: string}) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { editDashboard,getDashboardById, getDashboards } = useDashboardStore()
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isOpen){
      return
    }
    const getDashboard = async () => {
      const dashboard = await getDashboardById(dashboardId)
      if(dashboard){
        setName(dashboard.dashboardName);
      }
    }
    getDashboard()
  },[isOpen,dashboardId])


  const handleEdit  = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const newDashboardId = await editDashboard(dashboardId, name.trim())

      setName("");
      setIsOpen(false);
      toast.success("Dashboard edited successfully.");

      navigate({
        to: "/dashboard/$projectId",
        params: { projectId: newDashboardId },
      });
      await getDashboards()
    } catch (error) {
      toast.error("Failed to edit dashboard", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while editing the dashboard.",
      });
    }
  };

  return (
    <>
      <Tooltip content={"Edit Dashboard"}>
        <Button onClick={() => setIsOpen(true)}>
        <EditIcon size={20}/>
        <Box as="span" className="sr-only">edit</Box>
        </Button>
      </Tooltip>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="w-[26rem]">
          <Dialog.Title>Edit Dashboard</Dialog.Title>
          <form onSubmit={handleEdit }>
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
                Save
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}





