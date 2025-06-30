// task-card-components/task-assignees-section.tsx
import { User, Users } from "lucide-react"
import { Avatar, Box, Flex, Heading } from "@incmix/ui"
import { members } from "./utils/task-utils"
import type { TaskAssigneesSectionProps, User as UserType } from "./utils/types"
import { ComboBox } from "@components/combo-box";

export function TaskAssigneesSection({
  currentTask,
  onUpdateTask,
}: TaskAssigneesSectionProps) {
  // Transform member data for ComboBox
  const memberOptions = members.map(member => ({
    label: member.name,
    value: member.id,
    avatar: member.avatar,
  }));
  
  // Get currently selected member IDs
  const selectedMemberIds = currentTask.assignedTo?.map((user: UserType) => user.id) || [];
  
  // Handle member selection change
  const handleMemberChange = (selectedIds: string[]) => {
    // Create new assignedTo array based on selected IDs
    const newAssignedTo = selectedIds.map(id => {
      const member = members.find(m => m.id === id);
      if (!member) return null; // Handle potentially undefined member
      return {
        id: member.id,
        name: member.name,
        image: member.avatar
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null); // Filter out nulls
    
    onUpdateTask({ assignedTo: newAssignedTo });
  };

  return (
    <Box className="space-y-3 border-gray-1 dark:border-gray-3 border-t-2 p-4 py-3">
      <Flex justify={"between"} align={"center"}>
        <Heading size={"4"} className="font-medium text-gray-12">
          ASSIGNED TO
        </Heading>
        <ComboBox
          options={memberOptions}
          onValueChange={handleMemberChange}
          defaultValue={selectedMemberIds}
          placeholder="Find Person..."
          title="Assign To"
        />
      </Flex>
      
      <Flex className="gap-1">
        {currentTask.assignedTo && currentTask.assignedTo.length > 0 ? (
          currentTask.assignedTo.map((user: UserType) => (
            <div 
              key={user.id}
              className="cursor-pointer" 
              onClick={() => {
                // Remove user when clicking on their avatar
                const updatedUsers = currentTask.assignedTo.filter((u: UserType) => u.id !== user.id);
                onUpdateTask({ assignedTo: updatedUsers });
              }}
            >
              <Avatar 
                src={user.image} 
                name={user.name} 
                className="h-8 w-8" 
              />
            </div>
          ))
        ) : (
          <Flex align={"center"} gap={"2"} className="text-gray-500">
            <Users className="h-4 w-4" />
            <span className="text-sm">No users assigned</span>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}