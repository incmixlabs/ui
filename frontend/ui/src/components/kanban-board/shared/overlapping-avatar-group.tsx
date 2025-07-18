import React, { useState } from "react";
import { Flex, Avatar, Checkbox, Box, Text, ScrollArea } from "@incmix/ui";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export interface AssignedUser {
  id: string;
  name: string;
  image?: string;
}

export interface SelectableUser extends AssignedUser {
  avatar?: string; // For compatibility with task-actions-menu format
  position?: string; // Additional info that might be available
  color?: string; // For generating avatar colors
  value?: string; // For compatibility with selection components
  label?: string; // For compatibility with selection components
}

interface OverlappingAvatarGroupProps {
  users: AssignedUser[];
  maxDisplayed?: number;
  size?: "sm" | "md" | "lg"; // Support different sizes
  className?: string;
  interactive?: boolean; // Whether to enable member selection popup
  allUsers?: SelectableUser[]; // All available users for selection
  onUsersChange?: (users: AssignedUser[]) => void; // Callback when users are changed
  disabled?: boolean; // Whether the component is disabled
}

export const OverlappingAvatarGroup: React.FC<OverlappingAvatarGroupProps> = ({
  users,
  maxDisplayed = 3,
  size = "md",
  className = "",
  interactive = false,
  allUsers = [],
  onUsersChange,
  disabled = false,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  // Define user selection popover first so it can be used in the component
  const renderUserSelectionPopover = () => {
    // Use allUsers if provided, otherwise use current users
    const selectableUsers = allUsers.length > 0 ? allUsers : users;
    
    return (
      <PopoverPrimitive.Content className="bg-white dark:bg-gray-1 rounded-md shadow-md border border-gray-4 dark:border-gray-6 w-64 p-2 z-50">
        <Text size="2" weight="medium" className="mb-2 px-2">Assign Members</Text>
        <ScrollArea className="h-[220px]">
          {selectableUsers.map(user => {
            const isSelected = users.some(u => u.id === user.id);
            return (
              <Box 
                key={user.id} 
                className="flex items-center gap-2 p-2 hover:bg-gray-3 rounded-md cursor-pointer"
                onClick={() => toggleUserSelection(user)}
              >
                <Checkbox 
                  checked={isSelected} 
                  onCheckedChange={() => toggleUserSelection(user)}
                />
                <div className="flex gap-2 items-center flex-1">
                  {/* User Avatar */}
                  {(user.image || (user as SelectableUser).avatar) ? (
                    <Avatar
                      src={(user.image || (user as SelectableUser).avatar)}
                      name={user.name}
                      size="1"
                      className="flex-shrink-0"
                    />
                  ) : (
                    <div className={`w-6 h-6 rounded-full ${getColorForUser(user.id)} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[10px] font-medium text-white">
                        {getInitials(user.name)}
                      </span>
                    </div>
                  )}
                  
                  {/* User Info */}
                  <div className="flex flex-col overflow-hidden">
                    <Text size="2" className="truncate">{user.name}</Text>
                    {(user as SelectableUser).position && (
                      <Text size="1" className="text-gray-10 truncate">{(user as SelectableUser).position}</Text>
                    )}
                  </div>
                </div>
              </Box>
            );
          })}
        </ScrollArea>
      </PopoverPrimitive.Content>
    );
  };
  
  // Function to handle toggling a user's selection
  const toggleUserSelection = (selectedUser: SelectableUser) => {
    if (!onUsersChange) return;
    
    const isUserAssigned = users.some(u => u.id === selectedUser.id);
    
    if (isUserAssigned) {
      // Remove the user
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      onUsersChange(updatedUsers);
    } else {
      // Add the user
      const newUser: AssignedUser = {
        id: selectedUser.id,
        name: selectedUser.name,
        image: selectedUser.image || selectedUser.avatar
      };
      onUsersChange([...users, newUser]);
    }
  };
  
  // No users case - if not interactive, return null, otherwise show placeholder
  if (!users || users.length === 0) {
    if (!interactive) return null;
    
    // For interactive mode with no users, show an empty avatar that triggers selection
    if (interactive) {
      return (
        <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverPrimitive.Trigger>
            <div 
              className={`w-7 h-7 rounded-full border-2 border-background bg-gray-5 flex items-center justify-center cursor-pointer`}
              onClick={() => !disabled && setIsPopoverOpen(true)}
            >
              <span className="text-[10px] font-medium text-gray-11">+</span>
            </div>
          </PopoverPrimitive.Trigger>
          {renderUserSelectionPopover()}
        </PopoverPrimitive.Root>
      );
    }
    
    return null;
  }

  // Determine size dimensions
  const sizeMap = {
    sm: {
      width: "w-5",
      height: "h-5",
      borderWidth: "border-1",
      spacing: "-space-x-1",
      fontSize: "text-[8px]",
      zIndexBase: 30,
    },
    md: {
      width: "w-7",
      height: "h-7",
      borderWidth: "border-2",
      spacing: "-space-x-2",
      fontSize: "text-[10px]",
      zIndexBase: 30,
    },
    lg: {
      width: "w-8",
      height: "h-8",
      borderWidth: "border-2",
      spacing: "-space-x-3",
      fontSize: "text-[12px]",
      zIndexBase: 30,
    },
  };

  const { width, height, borderWidth, spacing, fontSize, zIndexBase } = sizeMap[size];
  
  // Users to display - limit to maxDisplayed
  const displayUsers = users.slice(0, maxDisplayed);
  // Count of additional users not shown
  const remainingCount = Math.max(0, users.length - maxDisplayed);

  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate consistent color based on user ID
  const getColorForUser = (userId: string) => {
    const colors = [
      "bg-blue-9", "bg-amber-9", "bg-green-9", 
      "bg-purple-9", "bg-pink-9", "bg-orange-9"
    ];
    
    // Simple hash function to get consistent color for same user ID
    const hash = userId.split("").reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  // This section was moved above to resolve the issue of using functions before declaration
  
  return (
    <Flex className={`${spacing} flex-shrink-0 ${className}`}>
      {interactive ? (
        <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={disabled ? undefined : setIsPopoverOpen}>
          <PopoverPrimitive.Trigger>
            <div 
              className={`flex ${spacing} cursor-pointer ${disabled ? 'opacity-70' : ''}`} 
              onClick={() => !disabled && setIsPopoverOpen(true)}
            >
              {/* Display users as before, but clickable */}
              {displayUsers.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`${width} ${height} rounded-full ${borderWidth} border-background overflow-hidden`} 
                  style={{ zIndex: zIndexBase - index }}
                >
                  {user.image && user.image !== "/placeholder-avatar.png" && user.image !== "/placeholder.svg" ? (
                    <Avatar
                      src={user.image}
                      name={user.name}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className={`w-full h-full rounded-full ${getColorForUser(user.id)} flex items-center justify-center`}>
                      <span className={`${fontSize} font-medium text-white`}>
                        {getInitials(user.name)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Show additional count if there are more users than maxDisplayed */}
              {remainingCount > 0 && (
                <div 
                  className={`${width} ${height} rounded-full ${borderWidth} border-background overflow-hidden bg-gray-9 flex items-center justify-center`} 
                  style={{ zIndex: zIndexBase - maxDisplayed }}
                >
                  <span className={`${fontSize} font-medium text-white`}>+{remainingCount}</span>
                </div>
              )}
              
              {/* Add new user button */}
              {users.length > 0 && (
                <div 
                  className={`${width} ${height} rounded-full ${borderWidth} border-background bg-gray-3 dark:bg-gray-5 flex items-center justify-center ml-1 hover:bg-gray-4 dark:hover:bg-gray-6`} 
                  style={{ zIndex: zIndexBase - displayUsers.length - (remainingCount > 0 ? 1 : 0) }}
                >
                  <span className={`${fontSize} font-medium text-gray-11`}>+</span>
                </div>
              )}
            </div>
          </PopoverPrimitive.Trigger>
          {renderUserSelectionPopover()}
        </PopoverPrimitive.Root>
      ) : (
        // Non-interactive version
        <>
          {displayUsers.map((user, index) => (
            <div 
              key={user.id} 
              className={`${width} ${height} rounded-full ${borderWidth} border-background overflow-hidden`} 
              style={{ zIndex: zIndexBase - index }}
            >
              {user.image && user.image !== "/placeholder-avatar.png" && user.image !== "/placeholder.svg" ? (
                <Avatar
                  src={user.image}
                  name={user.name}
                  className="w-full h-full"
                />
              ) : (
                <div className={`w-full h-full rounded-full ${getColorForUser(user.id)} flex items-center justify-center`}>
                  <span className={`${fontSize} font-medium text-white`}>
                    {getInitials(user.name)}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          {/* Show additional count if there are more users than maxDisplayed */}
          {remainingCount > 0 && (
            <div 
              className={`${width} ${height} rounded-full ${borderWidth} border-background overflow-hidden bg-gray-9 flex items-center justify-center`} 
              style={{ zIndex: zIndexBase - maxDisplayed }}
            >
              <span className={`${fontSize} font-medium text-white`}>+{remainingCount}</span>
            </div>
          )}
        </>
      )}
    </Flex>
  );
};
