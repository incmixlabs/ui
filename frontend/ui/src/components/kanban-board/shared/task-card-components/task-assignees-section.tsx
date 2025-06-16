// task-card-components/task-assignees-section.tsx
import { User, Users, X } from "lucide-react"
import { Popover, Avatar } from "@incmix/ui"
import { members } from "./utils/task-utils"
import type { TaskAssigneesSectionProps, User as UserType } from "./utils/types"

export function TaskAssigneesSection({
  currentTask,
  isMemberPickerOpen,
  onMemberPickerOpenChange,
  onUpdateTask,
}: TaskAssigneesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          Assigned To
        </h3>
        <Popover.Root open={isMemberPickerOpen} onOpenChange={onMemberPickerOpenChange}>
          <Popover.Trigger>
            <button
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <User className="h-4 w-4" />
              Assign User
            </button>
          </Popover.Trigger>
          <Popover.Content className="w-64 p-0" align="end">
            <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
              {members.map((member) => {
                const isAssigned = currentTask.assignedTo?.find(u => u.id === member.id);
                return (
                  <div
                    key={member.id}
                    className={`
                      flex items-center gap-3 w-full p-3 rounded-md cursor-pointer transition-colors
                      hover:bg-accent/50
                      ${isAssigned ? 'bg-accent/50' : ''}
                    `}
                    onClick={() => {
                      // Handle member toggle
                      const isAssigned = currentTask.assignedTo?.find(u => u.id === member.id);
                      let newAssignedTo;
                      
                      if (isAssigned) {
                        newAssignedTo = currentTask.assignedTo.filter(u => u.id !== member.id);
                      } else {
                        newAssignedTo = [...(currentTask.assignedTo || []), {
                          id: member.id,
                          name: member.name,
                          image: member.avatar
                        }];
                      }
                      
                      onUpdateTask({ assignedTo: newAssignedTo });
                    }}
                  >
                    <Avatar 
                      src={member.avatar} 
                      name={member.name}
                      className="w-6 h-6"
                    />
                    <div className="flex-1 flex flex-col">
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.position}</p>
                    </div>
                    {isAssigned && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
        {currentTask.assignedTo && currentTask.assignedTo.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {currentTask.assignedTo.map((user: UserType) => (
              <div
                key={user.id}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700"
              >
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs overflow-hidden">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <X
                  className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => {
                    const updatedUsers = currentTask.assignedTo.filter(u => u.id !== user.id)
                    onUpdateTask({ assignedTo: updatedUsers })
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="h-4 w-4" />
            <span className="text-sm">No users assigned</span>
          </div>
        )}
      </div>
    </div>
  )
}